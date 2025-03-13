import { OptionDefaults } from 'typedoc'

/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config = {
  // typedoc
  plugin: ['typedoc-plugin-markdown', 'typedoc-vitepress-theme'],
  entryPoints: ['src/**/*.ts'],
  modifierTags: [...OptionDefaults.modifierTags, '@web', '@miniprogram', '@node'],
  groupReferencesByType: true,
  logLevel: 'Error',
  cleanOutputDir: true,

  // typedoc-plugin-markdown
  outputFileStrategy: 'modules',
  mergeReadme: true,
  excludeScopesInPaths: true,
  useCodeBlocks: true,
  expandObjects: true,
  expandParameters: true,

  // typedoc-vitepress-theme
  out: './docs/src',
  docsRoot: './docs/src',
}

export default config
