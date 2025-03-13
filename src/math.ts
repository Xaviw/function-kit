import { isNumber } from './is'

/**
 * 判断数值是否为整数
 * @param val - 要检查的数值
 * @returns 如果数值是整数则返回 true，否则返回 false
 * @example
 * ```ts
 * isInteger(1) // true
 * isInteger(1.5) // false
 * isInteger(NaN) // false
 * ```
 */
export function isInteger(val: number): boolean {
  return isNumber(val) && val % 1 === 0
}

/**
 * 判断数值是否为偶数
 * @param val - 要检查的数值
 * @returns 如果数值是偶数则返回 true，否则返回 false
 * @example
 * ```ts
 * isEven(2) // true
 * isEven(3) // false
 * isEven(1.2) // false
 * ```
 */
export function isEven(val: number): boolean {
  if (!isInteger(val))
    return false
  return val % 2 === 0
}

/**
 * 判断数值是否为奇数
 * @param val - 要检查的数值
 * @returns 如果数值是奇数则返回 true，否则返回 false
 * @example
 * ```ts
 * isOdd(3) // true
 * isOdd(2) // false
 * isOdd(1.5) // false
 * ```
 */
export function isOdd(val: number): boolean {
  if (!isInteger(val))
    return false
  return val % 2 !== 0
}
