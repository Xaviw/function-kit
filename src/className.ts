import { isArray, isObject, isString } from './is'

/**
 * 同 vue 动态绑定 class
 * @example
 * className('a', ['b', { c: true, d: false }]); // 'a b c';
 */
export function className(...names: any[]): string {
  const result: string[] = []

  names.forEach((name) => {
    if (!name)
      return

    if (isString(name))
      return result.push(name)

    if (isArray(name))
      return result.push(className(...name))

    if (!isObject(name))
      return

    Object.entries(name).forEach(([key, value]) => {
      if (value)
        result.push(key)
    })
  })

  return result.join(' ')
}
