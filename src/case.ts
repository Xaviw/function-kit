import { isString } from './is'

/**
 * 将字符串的第一个字符转换为大写
 * @param str - 要转换的字符串
 * @returns 首字母大写的字符串
 * @example
 * ```ts
 * upperFirst('hello') // => 'Hello'
 * ```
 */
export function upperFirst(str: string): string {
  if (!isString(str) || str.length < 1)
    return str

  return str[0].toUpperCase() + str.slice(1)
}

/**
 * 将字符串按照常见的命名规则分割为单词数组
 * @param str - 要分割的字符串
 * @returns 分割后的单词数组
 * @example
 * ```ts
 * splitCase('helloWorld') // => ['hello', 'world']
 * splitCase('hello-world') // => ['hello', 'world']
 * splitCase('hello_world') // => ['hello', 'world']
 * splitCase('hello.world') // => ['hello', 'world']
 * splitCase('hello world') // => ['hello', 'world']
 * ```
 */
export function splitCase(str: string): string[] {
  if (!isString(str) || str.length < 1)
    return []

  str = str.replace(/[_.\- ]+/g, '-')

  if (!str.includes('-'))
    str = str.replace(/([A-Z])/g, '-$1')

  return str.replace(/(^-)|(-$)/g, '').toLowerCase().split('-')
}

/**
 * 将字符串转换为小驼峰命名格式
 * @param str - 要转换的字符串
 * @returns 驼峰命名格式的字符串
 * @example
 * ```ts
 * camelCase('hello-world') // => 'helloWorld'
 * camelCase('HelloWorld') // => 'helloWorld'
 * ```
 */
export function camelCase(str: string): string {
  if (!isString(str) || str.length < 1)
    return str

  return splitCase(str).map((item, index) => index === 0 ? item : upperFirst(item)).join('')
}

/**
 * 将字符串转换为大驼峰命名格式
 * @param str - 要转换的字符串
 * @returns 大驼峰命名格式的字符串
 * @example
 * ```ts
 * pascalCase('hello-world') // => 'HelloWorld'
 * pascalCase('helloWorld') // => 'HelloWorld'
 * ```
 */
export function pascalCase(str: string): string {
  if (!isString(str) || str.length < 1)
    return str

  return splitCase(str).map(upperFirst).join('')
}

/**
 * 将字符串转换为短横线命名格式
 * @param str - 要转换的字符串
 * @returns 短横线命名格式的字符串
 * @example
 * ```ts
 * kebabCase('helloWorld') // => 'hello-world'
 * kebabCase('HelloWorld') // => 'hello-world'
 * ```
 */
export function kebabCase(str: string): string {
  if (!isString(str) || str.length < 1)
    return str

  return splitCase(str).join('-')
}

/**
 * 将字符串转换为下划线命名格式
 * @param str - 要转换的字符串
 * @returns 下划线命名格式的字符串
 * @example
 * ```ts
 * snakeCase('helloWorld') // => 'hello_world'
 * snakeCase('HelloWorld') // => 'hello_world'
 * ```
 */
export function snakeCase(str: string): string {
  if (!isString(str) || str.length < 1)
    return str

  return splitCase(str).join('_')
}

/**
 * 将字符串转换为大写下划线命名格式
 * @param str - 要转换的字符串
 * @returns 大写下划线命名格式的字符串
 * @example
 * ```ts
 * upperSnakeCase('helloWorld') // => 'HELLO_WORLD'
 * upperSnakeCase('HelloWorld') // => 'HELLO_WORLD'
 * ```
 */
export function upperSnakeCase(str: string): string {
  if (!isString(str) || str.length < 1)
    return str

  return splitCase(str).map(item => item.toUpperCase()).join('_')
}
