import { mkdir, readFile, writeFile } from 'node:fs/promises'
import terser from '@rollup/plugin-terser'
import inquirer from 'inquirer'
import { rimraf } from 'rimraf'
import { rollup } from 'rollup'
import { dts } from 'rollup-plugin-dts'
import typescript from 'rollup-plugin-typescript2'
import { glob } from 'tinyglobby'
import * as ts from 'typescript'

// 获取 src 下全部 ts 文件
const files = await glob('src/**/*.ts')
if (!files.length) {
  console.warn('src 下没有任何 ts 文件')
  process.exit(0)
}

// 获取构建目标平台，未传递平台参数时为交互式构建
let platform = process.argv[2]
if (!['web', 'miniprogram', 'node'].includes(platform)) {
  const { platform: p } = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: '请选择构建目标平台：',
      choices: ['web', 'miniprogram', 'node'],
    },
  ])
  platform = p
}

// 获取全部可用被导出声明
const exported = {}
await Promise.all(files.map(traverseDeclarations))

// 未传递平台参数时交互式选择构建范围
let entries = Object.keys(exported)
if (platform !== process.argv[2]) {
  const { entries: e } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'entries',
      message: '请选择构建范围：',
      choices: entries,
      required: true,
    },
  ])
  entries = e
}

// 分组
const grouped = entries.reduce((p, c) => {
  const path = exported[c]
  p[path] ? p[path].push(c) : (p[path] = [c])
  return p
}, {})

// 构建入口文件内容
const entryCode = Object.entries(grouped).reduce((p, c) => {
  const [path, names] = c
  return p += `export { ${names.join(', ')} } from '../${path.replace(/\.ts$/, '')}'\n\n`
}, `export type * from '../types/common'\n\n`)

// 删除旧的输出并创建入口文件
await rimraf('dist')
await mkdir('dist')
await writeFile('dist/index.ts', entryCode)

// 加载 node 内建模块 JSON（node import json 为实验性功能，所以这里手动加载）
const builtinModules = JSON.parse(await readFile('node_modules/builtin-modules/builtin-modules.json', 'utf-8'))

// 构建输出
await Promise.all([
  // js
  rollup({
    input: 'dist/index.ts',
    plugins: [
      inject(),
      typescript({ check: false }),
      terser(),
    ],
    // 排除 node 内建模块
    external: [...builtinModules],
    treeshake: {
      // 所有依赖均视为无副作用（避免模块被 treeShake 后 import 仍被保留）
      moduleSideEffects: false,
    },
    onwarn(warning, warn) {
      // 忽略循环依赖的警告
      if (warning.code === 'CIRCULAR_DEPENDENCY') {
        return
      }
      // 其他警告正常输出
      warn(warning)
    },
  }).then(async (bundle) => {
    await bundle.write({
      dir: 'dist',
      format: 'es',
    })
    return bundle.close()
  }),
  // dts
  rollup({
    input: 'dist/index.ts',
    plugins: [
      dts(), // dts 是读取的源文件代码，其他插件无效
      miniprogramTypes(),
    ],
  }).then(async (bundle) => {
    await bundle.write({
      dir: 'dist',
      format: 'es',
    })
    return bundle.close()
  }),
]).then(() => {
  // 成功则删除临时入口文件
  return rimraf('dist/index.ts')
}).catch(() => {
  // 失败则删除全部输出
  return rimraf('dist')
})

/**
 * 获取文件中的具名导出，并收集到全局对象 exported 中
 * @param {string} id 文件路径
 */
async function traverseDeclarations(id) {
  const code = await readFile(id, 'utf-8')

  // 记录平台支持的声明，用于在多个声明同时导出时进行过滤
  const declartations = []

  const source = ts.createSourceFile(id, code, ts.ScriptTarget.Latest, true)
  ts.forEachChild(source, (node) => {
    // 变量、函数、类声明
    if (ts.isVariableStatement(node) || ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) {
      // 获取 JSDoc 注解
      const tags = ts.getJSDocTags(node).map(tag => tag.tagName.escapedText)

      const modifiers = ts.getModifiers(node)?.map(modifier => modifier.kind) || []
      // 跳过默认导出
      if (modifiers.includes(ts.SyntaxKind.DefaultKeyword))
        return

      // 是否支持当前平台（没有任何平台注解，或者明确包含指定平台注解）
      const isSupportPlatform = tags.includes(platform) || tags.every(tag => !['web', 'miniprogram', 'node'].includes(tag))
      if (!isSupportPlatform)
        return

      let names
      // 变量可能同一语句声明多个，遍历获取变量名
      if (ts.isVariableStatement(node)) {
        names = node.declarationList.declarations.map(declaration => declaration.name.escapedText)
      }
      // 获取函数名或类名
      else {
        names = [node.name.escapedText]
      }

      // 有导出修饰符，直接收集
      if (modifiers.includes(ts.SyntaxKind.ExportKeyword)) {
        names.forEach(name => collectExport(id, name))
      }
      // 没有导出修饰符，记录下来用于在后续的具名导出中判断
      else {
        declartations.push(...names)
      }
    }
    // type、interface 声明只判断有没有被导出
    else if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
      const modifiers = ts.getModifiers(node)?.map(modifier => modifier.kind) || []
      // 有导出修饰符，直接收集
      if (modifiers.includes(ts.SyntaxKind.ExportKeyword)) {
        collectExport(id, node.name.escapedText)
      }
      // 没有导出修饰符，记录下来用于在后续的具名导出中判断
      else {
        declartations.push(node.name.escapedText)
      }
    }
    // 具名导出多个
    else if (ts.isExportDeclaration(node)) {
      // 从其他模块中导出，不做处理
      if (node.moduleSpecifier)
        return

      const elements = node.exportClause.elements
      for (const element of elements) {
        // element.propertyName?.escapedText：原变量名，只有存在重命名时才存在
        // element.name.escapedText：导出变量名，未重命名时同原变量名
        const name = element.propertyName?.escapedText || element.name.escapedText
        if (declartations.includes(name)) {
          collectExport(id, name)
        }
      }
    }
  })

  return exported
}

/**
 * 收集导出到全局对象 exported，如遇重复退出构建
 * @param {string} id 文件路径
 * @param {string} name 声明名称
 */
function collectExport(id, name) {
  if (exported[name]) {
    console.warn(`重复的导出：${id} - ${name}、${exported[name]} - ${name}`)
    process.exit(0)
  }
  else {
    exported[name] = id
  }
}

/**
 * 注入 PLATFORM 常量
 * @returns {import("rollup").Plugin} rollup 插件
 */
function inject() {
  return {
    name: 'inject',
    transform(code, id) {
      if (!id.endsWith('.ts'))
        return

      return { code: `const PLATFORM = '${platform}';\n${code}` }
    },
  }
}

/**
 * 构建小程序平台包时，替换 Canvas 类型为小程序中的类型
 * @returns {import("rollup").Plugin} rollup 插件
 */
function miniprogramTypes() {
  return {
    name: 'miniprogram-types',
    generateBundle(options, bundle) {
      // 遍历生成的文件
      for (const fileName in bundle) {
        if (fileName.endsWith('.d.ts')) {
          const chunk = bundle[fileName]
          if (chunk.type === 'chunk') {
            // 修改 .d.ts 文件内容
            chunk.code = chunk.code
              .replace('Canvas = HTMLCanvasElement', 'Canvas = WechatMiniprogram.Canvas')
              .replace('CanvasContext = CanvasRenderingContext2D', 'CanvasContext = WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D')
          }
        }
      }
    },
  }
}
