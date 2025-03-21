import type { Fn, Key, Recordable } from '../types/common'
import { isFunction, isObject } from './is'

export type MapObjectIterator<T extends Recordable> = Fn<[key: keyof T, value: T[keyof T]], [Key, any]>

/**
 * 遍历对象的每个键值并返回一个新对象，类似数组的 map 方法
 * @param obj - 要遍历的对象
 * @param iterator - 遍历函数，接收属性名和属性值作为参数，返回新的属性名和属性值元组
 * @returns 返回一个新对象，包含遍历函数处理后的结果
 * @throws 当 iterator 不是函数时抛出类型错误
 * @example
 * ```ts
 * mapObject({ a: 1, b: 2 }, (key, val) => [key, val * 2]) // { a: 2, b: 4 }
 * mapObject({ x: 'hello', y: 'world' }, (key, val) => [key.toUpperCase(), `${key}_${val}`])
 * // { X: 'x_hello', Y: 'y_world' }
 * mapObject({}, (key, val) => [key, val]) // {}
 * ```
 */
export function mapObject<T extends Recordable>(
  obj: T,
  iterator: MapObjectIterator<T>,
): Recordable {
  if (!isObject(obj))
    return obj as any

  if (!isFunction(iterator))
    throw new TypeError('iterator 应该是一个函数')

  const result: Recordable = {};

  (Object.keys(obj) as Array<keyof T>).forEach((key) => {
    const [k, v] = iterator(key, obj[key])
    result[k] = v
  })

  return result
}
