import { writeFile } from 'node:fs/promises'
import inquirer from 'inquirer'
import { rimraf } from 'rimraf'
import { rollup } from 'rollup'
import { dts } from 'rollup-plugin-dts'
import tsPlugin from 'rollup-plugin-typescript2'
import { glob } from 'tinyglobby'
import * as ts from 'typescript'

// 获取 src 下全部 ts 文件
let entries = await glob('src/**/*.ts')
if (!entries.length) {
  console.warn('src 下没有任何 ts 文件')
  process.exit(0)
}

// 获取编译目标平台，未传递平台参数时为交互式编译
let platform = process.argv[2]
if (!['web', 'miniprogram', 'node'].includes(platform)) {
  const { entries: e, platform: p } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'entries',
      message: '请选择要编译的文件：',
      choices: entries,
      loop: true,
    },
    {
      type: 'list',
      name: 'platform',
      message: '请选择要编译的平台：',
      choices: ['web', 'miniprogram', 'node'],
    },
  ])
  entries = e
  platform = p
}

// 删除旧 dist 文件夹
await rimraf('dist')

// 输出 js 文件，并构建入口文件
const typeEntryCode = await rollup({
  input: entries,
  plugins: [
    // 过滤不支持目标平台的代码
    filterByPlatform(platform),
    tsPlugin({ check: false }),
    // 删除构建后的空文件
    filterEmptyEntry(),
  ],
  onwarn(warning, warn) {
    // 即使已经通过插件过滤掉了空文件，rollup 仍会发出 EMPTY_BUNDLE 警告，这里主动忽略
    if (warning.code === 'EMPTY_BUNDLE')
      return
    warn(warning)
  },
}).then(async (bundle) => {
  const { output } = await bundle.write({
    dir: 'dist',
    format: 'es',
    entryFileNames: 'src/[name].js',
  })
  bundle.close()

  // 构建类型文件编译入口
  return output.reduce((p, c) => {
    return `${p}export * from '../${c.fileName.replace(/\.js$/i, '')}'\n\n`
  }, '')
})

// 输出入口文件
writeFile('dist/index.js', typeEntryCode)

// 创建类型声明编译入口临时文件
// 因为 rollup-plugin-dts 插件无法处理虚拟模块，只能通过实际的文件编译
await writeFile('dist/index.ts', `${typeEntryCode}export type * from '../types/common'`)

// 输出入口文件和类型声明
await rollup({
  input: 'dist/index.ts',
  plugins: [
    filterByPlatform(platform),
    dts(),
  ],
}).then(async (bundle) => {
  await bundle.write({
    dir: 'dist',
    format: 'es',
  })
  return bundle.close()
})

// 删除临时入口文件
await rimraf('dist/index.ts')

/**
 * 过滤掉 ts 文件中未带有指定平台 JSDoc 注解的导出；并在文件开头注入 PLATFORM 常量，用于在函数中创建针对不同平台的分支逻辑
 * @returns {import("rollup").Plugin} rollup 插件
 */
function filterByPlatform(PLATFORM) {
  return {
    name: 'filter-by-platform',
    transform(code, id) {
      if (!id.endsWith('.ts')) {
        return null
      }

      // 记录平台支持的声明，用于在多个声明同时导出时进行过滤
      const declartationMap = {}
      // 记录最后一条导入语句结束位置，用于注入 PLATFORM 常量
      let lastImportEnd = 0

      const source = ts.createSourceFile(id, code, ts.ScriptTarget.Latest, true)
      ts.forEachChild(source, (node) => {
        // 导入
        if (ts.isImportDeclaration(node)) {
          lastImportEnd = node.getEnd()
        }
        // 变量、函数、类声明
        else if (ts.isVariableStatement(node) || ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) {
          // 获取 JSDoc 注解
          const tags = ts.getJSDocTags(node).map(tag => tag.tagName.escapedText)
          // 是否有导出修饰符
          const hasExportModifier = ts.getModifiers(node)?.some?.(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)
          // 是否支持当前平台（没有任何平台注解，或者明确包含指定平台注解）
          const isSupportPlatform = tags.includes(PLATFORM) || tags.every(item => !['web', 'miniprogram', 'node'].includes(item))
          // 有导出修饰符
          if (hasExportModifier && !isSupportPlatform) {
            code = code.replace(node.getFullText(), '')
          }
          // 没有导出修饰符时，记录声明，用于在导出声明中判断是否需要保留
          else if (!hasExportModifier && isSupportPlatform) {
            let names
            // 变量可能同一语句声明多个，遍历获取变量名
            if (ts.isVariableStatement(node)) {
              names = node.declarationList.declarations.map(declaration => declaration.name.escapedText)
            }
            // 获取函数名或类名
            else {
              names = [node.name.escapedText]
            }
            names.forEach(name => declartationMap[name] = node)
          }
        }
        // 默认导出
        else if (ts.isExportAssignment(node)) {
          // 如果导出值未包含平台注解，则删除
          const name = node.expression.escapedText
          if (!declartationMap[name]) {
            code = code.replace(node.getFullText(), '')
          }
        }
        // 具名导出多个
        else if (ts.isExportDeclaration(node)) {
          // 从其他模块中导出，不做处理
          if (node.moduleSpecifier)
            return

          const elements = node.exportClause.elements
          const names = []
          for (const element of elements) {
            // 原变量名，只有存在重命名时才存在
            const name = element.propertyName?.escapedText
            // 导出变量名，未重命名时同原变量名
            const exportedName = element.name.escapedText
            if (declartationMap[name || exportedName]) {
              names.push(name ? `${name} as ${exportedName}` : exportedName)
            }
          }
          // 有导出被过滤掉则重新构建导出语句
          if (names.length && names.length < elements.length) {
            code = code.replace(node.getFullText(), `{ ${names.join(', ')} }`)
          }
        }
      })

      // 添加 PLATFORM 声明
      // 指定为 string 类型，避免推断类型为具体的值，导致 TS2367 报错：“无意的比较...”
      code = `${code.slice(0, lastImportEnd)}\nconst PLATFORM:string = "${PLATFORM}"\n${code.slice(lastImportEnd)}`

      return { code }
    },
  }
}

/**
 * 过滤空文件
 * @returns {import("rollup").Plugin} rollup 插件
 */
function filterEmptyEntry() {
  return {
    name: 'filter-empty-file-and-build-entry',
    generateBundle(_, bundle) {
      for (const key in bundle) {
        const { type, exports } = bundle[key]
        if (type === 'chunk' && !exports.length) {
          delete bundle[key]
        }
      }
    },
  }
}
