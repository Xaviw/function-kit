import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['docs/typedoc/**/*'],
    pnpm: true,
    vue: true,
    formatters: {
      css: true,
      markdown: true,
      svg: true,
    },
  },
)
