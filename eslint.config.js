import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    ignores: ['docs/**/*'],
  },
  {
    // 自定义规则
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
)
