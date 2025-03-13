import { isFunction, isNumber } from './is'

/**
 * 判断值是否为类数组对象
 * @remarks 类数组对象需满足以下条件：
 * - 具有 length 属性
 * - length 为非负整数
 * - length 不大于 Number.MAX_SAFE_INTEGER
 * - 不是函数
 * @param val - 要检查的值
 * @returns 如果值是类数组对象则返回 true，否则返回 false
 * @example
 * ```ts
 * // 字符串
 * isArrayLike('abc') // true
 *
 * // 数组
 * isArrayLike([1, 2, 3]) // true
 *
 * // 类数组对象
 * isArrayLike({ length: 3 }) // true
 *
 * // 非类数组
 * isArrayLike(null) // false
 * isArrayLike(() => {}) // false
 * isArrayLike({ length: -1 }) // false
 * ```
 */
export function isArrayLike(val: unknown): val is ArrayLike<any> {
  if (!val)
    return false

  const len = (val as any).length

  return isNumber(len) && len >= 0 && len % 1 === 0 && len <= Number.MAX_SAFE_INTEGER && !isFunction(val)
}
