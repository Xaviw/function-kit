import type { Recordable } from '../types/common'
import { isArray, isArrayBuffer, isDate, isMap, isPrimitive, isRegExp, isSet } from './is'
import { mapObject } from './mapObject'

/**
 * 深度克隆一个值，支持多种数据类型
 * @param val - 要克隆的值
 * @returns 返回克隆后的值
 * @example
 * ```ts
 * // 基础类型
 * cloneDeep(42) // 42
 *
 * // 对象和数组
 * cloneDeep({ a: 1, b: [2, 3] }) // { a: 1, b: [2, 3] }
 *
 * // 特殊对象
 * cloneDeep(new Date()) // new Date()
 * cloneDeep(new RegExp('test', 'g')) // /test/g
 * cloneDeep(new Map([['key', 'value']])) // Map(1) { 'key' => 'value' }
 *
 * // 循环引用
 * const obj = { a: 1 }
 * obj.self = obj
 * cloneDeep(obj) // { a: 1, self: [Circular] }
 * ```
 */
export function cloneDeep<T>(val: T, seen = new WeakMap<any>()): T {
  if (seen.has(val))
    return seen.get(val)

  if (isPrimitive(val))
    return val

  let result: T

  if (isDate(val)) {
    result = new Date(+val) as T
  }
  else if (isRegExp(val)) {
    result = new RegExp(val.source, val.flags) as T
  }
  else if (isMap(val)) {
    result = new Map() as T
    val.forEach((value, key) => {
      (result as Map<any, any>).set(key, cloneDeep(value, seen))
    })
  }
  else if (isSet(val)) {
    result = new Set() as T
    val.forEach((value) => {
      (result as Set<any>).add(cloneDeep(value, seen))
    })
  }
  else if (isArrayBuffer(val)) {
    result = val.slice() as T
  }
  else if (isArray(val)) {
    result = val.map(item => cloneDeep(item, seen)) as T
  }
  else {
    result = mapObject(val as Recordable, (k, v) => [k, cloneDeep(v, seen)])
  }

  seen.set(val, result)

  return result
}
