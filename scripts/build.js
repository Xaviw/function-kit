import { readdirSync } from 'node:fs'
import inquirer from 'inquirer'
import { rollup } from 'rollup'
import config, { filterByPlatform } from '../rollup.config.js'

const choices = readdirSync('src').map(item => ({ name: item, value: `src/${item}` }))

const { entries, platform } = await inquirer.prompt([
  {
    type: 'checkbox',
    name: 'entries',
    message: '请选择要编译的文件：',
    choices,
    loop: true,
  },
  {
    type: 'list',
    name: 'platform',
    message: '请选择要编译的平台：',
    choices: ['web', 'miniprogram', 'node'],
  },
])

const [bundleConfig, declareConfig] = config

await rollup({
  ...bundleConfig,
  input: entries,
  plugins: [
    filterByPlatform(platform),
    ...bundleConfig.plugins.slice(1),
  ],
}).then(async (bundle) => {
  await bundle.write(bundleConfig.output)
  return bundle.close()
})

await rollup({
  ...declareConfig,
  input: entries,
  plugins: declareConfig.plugins,
}).then(async (declare) => {
  await declare.write({
    ...declareConfig.output,
    entryFileNames: `${entries.length > 1 ? '' : 'src/'}[name].d.ts`,
  })
  return declare.close()
})
