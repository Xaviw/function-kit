import { readdirSync } from 'node:fs'
import { defineConfig } from 'rollup'
import tsPlugin from 'rollup-plugin-typescript2'
import * as ts from 'typescript'

const entries = readdirSync('src').map(item => `src/${item}`)

export default defineConfig({
  input: entries,
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: 'src/[name].js',
  },
  plugins: [
    filterByPlatform(process.env.PLATFORM),
    tsPlugin({ tsconfigOverride: { include: ['src/*.ts', 'types/*.ts'] } }),
    filterEmptyFileAndBuildEntry(),
  ],
  onwarn(warning, warn) {
    // 即使已经通过插件过滤掉了空文件，rollup 仍会发出 EMPTY_BUNDLE 警告，这里主动忽略
    if (warning.code === 'EMPTY_BUNDLE')
      return
    warn(warning)
  },
})

/**
 * 过滤掉 ts 文件中未带有指定平台 JSDoc 注解的导出；并在文件开头注入 PLATFORM 常量，用于在函数中创建针对不同平台的分支逻辑
 */
export function filterByPlatform(PLATFORM) {
  return {
    name: 'filter-by-platform',
    transform(code, id) {
      if (!id.endsWith('.ts')) {
        return
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
            code = code.replace(node.getFullText(), `export { ${names.join(', ')} }`)
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
 * 过滤空文件、生成入口文件
 */
export function filterEmptyFileAndBuildEntry() {
  return {
    name: 'filter-empty-file-and-build-entry',
    generateBundle(_, bundle) {
      let entry = ''

      for (const key in bundle) {
        const { type, exports } = bundle[key]
        if (type === 'chunk') {
          // 保留的文件记录到入口文件中
          if (exports.length) {
            entry += `export * from './${key}'\n`
          }
          // 删除过滤掉的文件及其声明文件
          else {
            delete bundle[key]
            delete bundle[key.replace('.js', '.d.ts')]
          }
        }
        // 自定义构建时，删除未参与构建文件的声明文件
        else if (type === 'asset' && !bundle[key.replace('.d.ts', '.js')]) {
          delete bundle[key]
        }
      }

      // 输出入口文件及其声明文件
      if (entry) {
        this.emitFile({ type: 'asset', fileName: 'index.js', source: entry })
        this.emitFile({ type: 'asset', fileName: 'index.d.ts', source: entry })
      }
    },
  }
}
