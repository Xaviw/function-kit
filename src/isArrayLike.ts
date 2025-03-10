import { isFunction, isNumber } from './is'

/**
 * 判断参数是否是“类数组”
 */
export function isArrayLike(val: unknown): val is ArrayLike<any> {
  if (!val)
    return false

  const len = (val as any).length

  return isNumber(len) && len >= 0 && len % 1 === 0 && len <= Number.MAX_SAFE_INTEGER && !isFunction(val)
}
