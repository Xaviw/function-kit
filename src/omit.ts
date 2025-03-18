import type { Recordable } from '../types/common'
import { isArray, isObject } from './is'

/**
 * 从对象中排除指定的属性，返回新对象
 * @param obj - 源对象
 * @param keys - 要排除的属性键数组
 * @returns 排除指定属性后的新对象
 * @example
 * ```ts
 * const user = { name: 'Tom', age: 18, gender: 'male' };
 * const result = omit(user, ['age', 'gender']);
 * // result: { name: 'Tom' }
 * ```
 */
export function omit<T extends Recordable, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[],
): Omit<T, TKeys> {
  if (!isObject(obj) || !isArray(keys) || !keys.length)
    return obj

  return keys.reduce(
    (acc, key) => {
      delete acc[key]
      return acc
    },
    { ...obj },
  )
}
