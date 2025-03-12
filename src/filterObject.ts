import type { Fn, Recordable } from '../types/common'
import { isFunction, isObject } from './is'

type ObjectIterator<T extends Recordable> = Fn<[key: keyof T, value: T[keyof T]], boolean>

/**
 * 遍历对象进行筛选并返回新对象，类似 Array.filter
 * @example
 * filterObject({ a: 1, b: 2 }, (key, value) => key === 'a') // { a: 1 }
 */
export function filterObject<T extends Recordable>(obj: T, iterator: ObjectIterator<T>): Partial<T> {
  if (!isObject(obj))
    return obj

  if (!isFunction(iterator))
    throw new TypeError('iterator 应该是一个函数')

  const result = {} as T;

  (Object.keys(obj) as Array<keyof T>).forEach((key) => {
    const value = obj[key]

    if (iterator(key, value)) {
      result[key] = value
    }
  })

  return result
}
