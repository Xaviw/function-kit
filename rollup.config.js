import { readdirSync } from 'node:fs'
import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import { createSourceFile, forEachChild, getJSDocTags, getModifiers, ScriptTarget, SyntaxKind } from 'typescript'

const entries = readdirSync('src').map(item => `src/${item}`)

export default defineConfig({
  input: entries,
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    filterByPlatform(process.env.MODE),
    typescript(),
  ],
})

/**
 * 过滤掉不支持指定平台的函数，并生成 index.js 入口文件
 *
 * 如果 ts 文件中被导出函数的 JSDoc 未包括对应平台注解，则会删除对应函数的代码
 *
 * 如果支持指定平台，还会在文件开头添加 MODE 声明，用于在函数中创建针对不同平台的分支逻辑
 * @param {string} mode
 * @returns {import('rollup').Plugin} rollup 插件
 */
function filterByPlatform(mode) {
  return {
    name: 'filter-by-platform',
    transform(code, id) {
      if (!id.endsWith('.ts')) {
        return
      }

      let isPlatformSpecific
      const source = createSourceFile(id, code, ScriptTarget.Latest, true)
      forEachChild(source, (node) => {
        // 过滤掉非导出声明
        const hasExportModifier = getModifiers(node)?.some?.(modifier => modifier.kind === SyntaxKind.ExportKeyword)
        if (!hasExportModifier) {
          return
        }

        // 判断是否支持指定平台
        const tags = getJSDocTags(node).map(tag => tag.tagName.escapedText)
        isPlatformSpecific = tags.includes(mode)

        // 移除不支持的声明
        if (!isPlatformSpecific) {
          code = code.replace(node.getFullText(), '')
        }
      })

      // 添加 MODE 声明
      if (isPlatformSpecific) {
        code = `const MODE = "${mode}"\n${code}`
      }

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
