import { isArray, isString } from './is'
import { isArrayLike } from './isArrayLike'
import { objectToString } from './objectToString'

/**
 * 判断参数是否为空值
 * @remarks 以下情况被认为是空值：
 * - null 或 undefined
 * - 空数组或空 Arguments 类数组
 * - 空字符串
 * - 空对象（没有自身可枚举属性）
 * @param val - 要检查的值
 * @returns 如果值为空则返回 true，否则返回 false
 * @example
 * ```ts
 * isEmpty(null) // true
 * isEmpty([]) // true
 * isEmpty('') // true
 * isEmpty({}) // true
 * isEmpty([1, 2]) // false
 * isEmpty({ a: 1 }) // false
 * ```
 */
export function isEmpty(val: unknown): boolean {
  if (val == null)
    return true

  if (isArrayLike(val) && (isArray(val) || isString(val) || objectToString(val) === '[object Arguments]')) {
    return val.length === 0
  }

  return Object.keys(val).length === 0
}
