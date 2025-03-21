import { isArray, isFunction, isNumber } from './is'

/**
 * 判断数值是否为整数
 * @param val - 要检查的数值
 * @returns 如果数值是整数则返回 true，否则返回 false
 * @example
 * ```ts
 * isInteger(1) // true
 * isInteger(1.5) // false
 * isInteger(NaN) // false
 * ```
 */
export function isInteger(val: number): boolean {
  return isNumber(val) && val % 1 === 0
}

/**
 * 判断数值是否为偶数
 * @param val - 要检查的数值
 * @returns 如果数值是偶数则返回 true，否则返回 false
 * @example
 * ```ts
 * isEven(2) // true
 * isEven(3) // false
 * isEven(1.2) // false
 * ```
 */
export function isEven(val: number): boolean {
  if (!isInteger(val))
    return false
  return val % 2 === 0
}

/**
 * 判断数值是否为奇数
 * @param val - 要检查的数值
 * @returns 如果数值是奇数则返回 true，否则返回 false
 * @example
 * ```ts
 * isOdd(3) // true
 * isOdd(2) // false
 * isOdd(1.5) // false
 * ```
 */
export function isOdd(val: number): boolean {
  if (!isInteger(val))
    return false
  return val % 2 !== 0
}

/**
 * 计算两个数组的差集
 * @param root - 主数组
 * @param other - 要排除的数组
 * @param identity - 可选的用于获取元素标识符的函数
 * @returns 返回一个新数组，包含在 root 中但不在 other 中的元素
 * @example
 * ```ts
 * difference([1, 2, 3], [2, 3, 4]) // [1]
 * difference([{id: 1}, {id: 2}], [{id: 2}], x => x.id) // [{id: 1}]
 * ```
 */
export function difference<T, K extends string | number | symbol>(
  root: readonly T[],
  other: readonly T[],
  identity?: (item: T) => K,
): T[] {
  if (!isArray(root))
    root = []

  if (!isArray(other))
    other = []

  if (!root.length)
    return []

  if (!other.length)
    return [...root]

  const ident = isFunction(identity) ? identity : (x: T) => x as unknown as K

  const bKeys = other.reduce((acc, item) => {
    acc[ident(item)] = true
    return acc
  }, {} as Record<K, boolean>)

  return root.filter(a => !bKeys[ident(a)])
}

/**
 * 计算两个数组的交集
 * @param listA - 第一个数组
 * @param listB - 第二个数组
 * @param identity - 可选的用于获取元素标识符的函数
 * @returns 返回一个新数组，包含同时存在于两个数组中的元素
 * @example
 * ```ts
 * intersects([1, 2, 3], [2, 3, 4]) // [2, 3]
 * intersects([{id: 1}, {id: 2}], [{id: 2}, {id: 3}], x => x.id) // [{id: 2}]
 * ```
 */
export function intersects<T, K extends string | number | symbol>(
  listA: readonly T[],
  listB: readonly T[],
  identity?: (t: T) => K,
): T[] {
  if (!isArray(listA))
    listA = []

  if (!isArray(listB))
    listB = []

  if (!listA.length || !listB.length)
    return []

  const ident = isFunction(identity) ? identity : (x: T) => x as unknown as K

  const dictB = listB.reduce((acc, item) => {
    acc[ident(item)] = true
    return acc
  }, {} as Record<K, boolean>)

  return listA.filter(a => dictB[ident(a)])
}

/**
 * 计算两个数组的并集
 * @param listA - 第一个数组
 * @param listB - 第二个数组
 * @param identity - 可选的用于获取元素标识符的函数
 * @returns 返回一个新数组，包含两个数组中的所有不重复元素
 * @example
 * ```ts
 * union([1, 2], [2, 3]) // [1, 2, 3]
 * union([{id: 1}, {id: 2}], [{id: 2}, {id: 3}], x => x.id) // [{id: 1}, {id: 2}, {id: 3}]
 * ```
 */
export function union<T, K extends string | number | symbol>(
  listA: readonly T[],
  listB: readonly T[],
  identity?: (t: T) => K,
): T[] {
  if (!isArray(listA))
    listA = []

  if (!isArray(listB))
    listB = []

  if (!listA.length && !listB.length)
    return []

  if (!listA.length)
    return [...listB]

  if (!listB.length)
    return [...listA]

  const ident = isFunction(identity) ? identity : (x: T) => x as unknown as K

  const dictA = listA.reduce((acc, item) => {
    const id = ident(item)
    if (!acc[id])
      acc[id] = true
    return acc
  }, {} as Record<K, boolean>)

  return Array.from(new Set(listA.concat(listB.filter(b => !dictA[ident(b)]))))
}
