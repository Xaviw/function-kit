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

const bundle = await rollup({
  ...config,
  input: entries,
  plugins: [
    filterByPlatform(platform),
    ...config.plugins.slice(1),
  ],
})

await bundle.generate({})

await bundle.write(config.output)

bundle.close()
