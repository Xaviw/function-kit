import { isArray, isString } from './is'
import { isArrayLike } from './isArrayLike'
import { objectToString } from './objectToString'

/**
 * 判断参数是否为空（对象、类数组、字符串、null、undefined）
 */
export function isEmpty(val: unknown): boolean {
  if (val == null)
    return true

  if (isArrayLike(val) && (isArray(val) || isString(val) || objectToString(val) === '[object Arguments]')) {
    return val.length === 0
  }

  return Object.keys(val).length === 0
}
