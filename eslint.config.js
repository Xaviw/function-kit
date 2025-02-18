import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
  },
  {
    // 自定义规则
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
  {
    // 针对部分文件的规则
    files: ['src/*.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration',
          message: '请使用具名导出',
        },
      ],
    },
  },
)
