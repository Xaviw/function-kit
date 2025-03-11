import type { Recordable } from '../types/common'
import { isArray, isArrayBuffer, isDate, isMap, isPrimitive, isRegExp, isSet } from './is'
import { mapObject } from './mapObject'

/**
 * 支持拷贝 简单值、Date、RegExp、Map、Set、ArrayBuffer、Array、Object
 *
 * 支持处理循环引用
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
    result = mapObject(val as Recordable, key => cloneDeep(key, seen))
  }

  seen.set(val, result)

  return result
}
