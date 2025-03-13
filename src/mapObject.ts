import type { Fn, Recordable } from '../types/common'
import { isFunction, isObject } from './is'

type ObjectIterator<T extends Recordable, Res> = Fn<[value: T[keyof T], key: keyof T], Res>

type MapObjectResult<T extends Recordable, Res> = {
  -readonly [key in keyof T]: Res
}

/**
 * 遍历对象的每个属性并返回一个新对象，类似数组的 map 方法
 * @param obj - 要遍历的对象
 * @param iterator - 遍历函数，接收属性值和属性名作为参数
 * @returns 返回一个新对象，包含遍历函数处理后的结果
 * @throws 当 iterator 不是函数时抛出类型错误
 * @example
 * ```ts
 * mapObject({ a: 1, b: 2 }, val => val * 2) // { a: 2, b: 4 }
 * mapObject({ x: 'hello', y: 'world' }, (val, key) => `${key}_${val}`)
 * // { x: 'x_hello', y: 'y_world' }
 * mapObject({}, val => val) // {}
 * ```
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
