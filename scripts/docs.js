import { exec } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { rimraf } from 'rimraf'
import { rollup } from 'rollup'
import { dts } from 'rollup-plugin-dts'
import { glob } from 'tinyglobby'

// 获取 src 下全部 ts 文件
const files = await glob('src/**/*.ts')
if (!files.length) {
  console.warn('src 下没有任何 ts 文件')
  process.exit(0)
}

try {
  // 构建入口
  const entry = files.map(f => `export type * from '../${f.replace(/\.ts$/, '')}'`).join('\n')
  await writeFile('docs/index.ts', entry, { encoding: 'utf-8' })

  // 生成 d.ts
  const bundle = await rollup({
    input: 'docs/index.ts',
    plugins: [
      dts(),
    ],
  })
  await bundle.write({
    dir: 'docs',
    format: 'es',
  })
  bundle.close()

  // 生成 api.json
  await promisify(exec)('npx api-extractor run')

  // 生成文档
  await promisify(exec)('npx api-documenter markdown -i docs -o docs')
}
finally {
  rimraf('docs/index.ts')
  rimraf('docs/index.d.ts')
  rimraf('docs/index.api.json')
}
