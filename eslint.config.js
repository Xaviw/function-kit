import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['docs/src/**/*'],
  },
  {
    // 自定义规则
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
)
