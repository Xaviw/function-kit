import { isNil } from './is'

/**
 * 从对象或数组中安全获取嵌套路径的值
 * @param value 源对象
 * @param path 值路径，例如 `a[0].b`
 * @param defaultValue 默认值返回值
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
