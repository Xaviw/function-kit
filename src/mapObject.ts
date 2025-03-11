import type { Fn, Recordable } from '../types/common'
import { isFunction, isObject } from './is'

type ObjectIterator<T extends Recordable, Res> = Fn<[value: T[keyof T], key: keyof T], Res>

type MapObjectResult<T extends Recordable, Res> = {
  -readonly [key in keyof T]: Res
}

/**
 * 遍历对象并返回新对象，类似 Array.map
 * @example
 * mapObject({ a: 1, b: 2 }, (val, key) => val += 1) // { a: 2, b: 3 }
 */
export function mapObject<T extends Recordable, Res = any>(
  obj: T,
  iterator: ObjectIterator<T, Res>,
): MapObjectResult<T, Res> {
  if (!isObject(obj))
    return obj as any

  if (!isFunction(iterator))
    throw new TypeError('iterator 应该是一个函数')

  const result = {} as MapObjectResult<T, Res>;

  (Object.keys(obj) as Array<keyof T>).forEach((key) => {
    result[key] = iterator(obj[key], key)
  })

  return result
}
