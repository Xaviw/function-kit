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
  },
  plugins: [
    filterByPlatform(process.env.PLATFORM),
    tsPlugin({ tsconfigOverride: { exclude: ['test/*.ts'] } }),
  ],
})

/**
 * 过滤掉 ts 文件中未带有指定平台 JSDoc 注解的导出，并生成 index.js 入口文件
 *
 * 插件还会在文件开头注入 PLATFORM 常量，用于在函数中创建针对不同平台的分支逻辑
 *
 * @param {string} PLATFORM
 * @returns {import('rollup').Plugin} rollup 插件
 */
function filterByPlatform(PLATFORM) {
  return {
    name: 'filter-by-platform',
    transform(code, id) {
      if (!id.endsWith('.ts')) {
        return
      }

      // 记录平台支持的声明，用于在多个声明同时导出时进行过滤
      const declartationMap = {}

      const source = ts.createSourceFile(id, code, ts.ScriptTarget.Latest, true)
      ts.forEachChild(source, (node) => {
        // 变量、函数、类声明
        if (ts.isVariableStatement(node) || ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) {
          // 获取 JSDoc 注解
          const tags = ts.getJSDocTags(node).map(tag => tag.tagName.escapedText)
          // 是否有导出修饰符
          const hasExportModifier = ts.getModifiers(node)?.some?.(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)
          // 有导出修饰符时，需要明确包含指定平台注解才保留
          if (hasExportModifier && !tags.includes(PLATFORM)) {
            code = code.replace(node.getFullText(), '')
          }
          // 没有导出修饰符时，记录包含指定平台注解的声明，用于在导出声明中判断是否需要保留
          else if (!hasExportModifier && tags.includes(PLATFORM)) {
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
      // 必须指定 string 类型，否则会推断类型为具体的值，导致报错 TS2367：“无意的比较...”
      code = `const PLATFORM: string = "${PLATFORM}"\n${code}`

      return { code }
    },
    generateBundle(_, bundle) {
      let entry = ''

      for (const key in bundle) {
        // 避免输出空文件
        if (!bundle[key].exports.length) {
          delete bundle[key]
        }
        // 构建入口文件
        else {
          entry += `export * from './${key}'\n`
        }
      }

      if (entry) {
        this.emitFile({ type: 'asset', fileName: 'index.js', source: entry })
        this.emitFile({ type: 'asset', fileName: 'index.d.ts', source: entry })
      }
    },
  }
}
