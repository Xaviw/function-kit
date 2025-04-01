import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['docs/typedoc/**/*'],
    vue: true,
    formatters: {
      css: true,
      html: true,
      markdown: true,
    },
  },
  {
    // 自定义规则
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
)
