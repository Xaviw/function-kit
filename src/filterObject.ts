import type { Fn, Recordable } from '../types/common'
import { isFunction, isObject } from './is'

type ObjectIterator<T extends Recordable> = Fn<[key: keyof T, value: T[keyof T]], boolean>

/**
 * 根据条件过滤对象的属性并返回新对象
 * @param obj - 要过滤的源对象
 * @param iterator - 过滤函数，接收属性名和属性值作为参数，返回 true 表示保留该属性
 * @returns 返回过滤后的新对象
 * @throws 当 iterator 不是函数时抛出类型错误
 * @example
 * ```ts
 * // 按属性名过滤
 * filterObject({ a: 1, b: 2 }, key => key === 'a') // { a: 1 }
 *
 * // 按属性值过滤
 * filterObject({ a: 1, b: 2 }, (_, value) => value > 1) // { b: 2 }
 *
 * // 组合条件过滤
 * filterObject({ a: 1, b: 2, c: 3 }, (key, value) =>
 *   key !== 'b' && value < 3
 * ) // { a: 1 }
 * ```
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
