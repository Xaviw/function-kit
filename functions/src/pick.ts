import { isArray, isObject } from './is'

/**
 * 从对象中提取指定的属性，创建一个新的对象
 * @param obj - 源对象
 * @param keys - 要提取的属性键数组
 * @returns 包含指定属性的新对象
 * @example
 * ```ts
 * const user = { name: 'John', age: 30, email: 'john@example.com' };
 * const picked = pick(user, ['name', 'age']);
 * // 结果: { name: 'John', age: 30 }
 * ```
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Pick<T, K> {
  if (!isObject(obj))
    return obj as any

  if (!isArray(keys) || !keys.length)
    return {} as Pick<T, K>

  return keys.reduce((acc: Pick<T, K>, key: K) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      acc[key] = obj[key]
    }
    return acc
  }, {} as Pick<T, K>)
}
