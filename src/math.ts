import { isNumber } from './is'

export function isInteger(val: number): boolean {
  return isNumber(val) && val % 1 === 0
}

/**
 * 判断数值是否是偶数
 */
export function isEven(val: number): boolean {
  if (!isInteger(val))
    return false
  return val % 2 === 0
}

/**
 * 判断数值是否是奇数
 */
export function isOdd(val: number): boolean {
  if (!isInteger(val))
    return false
  return val % 2 !== 0
}
