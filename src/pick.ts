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
export function pick<T extends object, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[],
): Pick<T, TKeys> {
  if (!isObject(obj))
    return obj

  if (!isArray(keys) || !keys.length)
    return {} as Pick<T, TKeys>

  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      acc[key] = obj[key]
    return acc
  }, {} as Pick<T, TKeys>)
}
