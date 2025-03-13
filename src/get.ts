import { isNil } from './is'

/**
 * 安全地获取对象或数组中的嵌套值
 * @param value - 要获取值的对象或数组
 * @param path - 属性路径字符串，支持点号和方括号表示法
 * @param defaultValue - 当路径不存在时返回的默认值
 * @returns 返回路径对应的值，如果路径不存在则返回默认值
 * @example
 * ```ts
 * // 基础对象访问
 * get({ a: { b: 1 } }, 'a.b') // 1
 *
 * // 数组访问
 * get({ a: [{ b: 1 }] }, 'a[0].b') // 1
 *
 * // 默认值
 * get({ a: 1 }, 'b', 'default') // 'default'
 *
 * // 复杂路径
 * get({ a: [{ b: { c: 3 } }] }, 'a[0].b.c') // 3
 *
 * // 无效路径
 * get({ a: 1 }, 'a.b.c') // undefined
 * ```
 */
export function get<TDefault>(value: any, path: string, defaultValue?: TDefault): TDefault | undefined {
  const segments = String(path).split(/[.[\]]/g)

  let current: any = value

  for (const key of segments) {
    if (isNil(current))
      return defaultValue as TDefault

    const dequoted = key.replace(/['"]/g, '')
    if (dequoted.trim() === '')
      continue

    current = current?.[dequoted]
  }

  if (current === undefined)
    return defaultValue as TDefault

  return current
}
