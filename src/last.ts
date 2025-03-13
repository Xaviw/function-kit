/**
 * 获取数组最后一项
 * @param arr - 要获取最后一项的数组
 * @param defaultValue - 当数组为空时返回的默认值
 * @returns 返回数组的最后一项，如果数组为空且提供了默认值则返回默认值，否则返回 undefined
 * @example
 * ```ts
 * last([1, 2, 3]) // 3
 * last([]) // undefined
 * last([], 0) // 0
 * last(['a', 'b']) // 'b'
 * ```
 */
export function last<T>(arr: T[], defaultValue?: T): T | undefined {
  return arr?.length > 0 ? arr[arr.length - 1] : defaultValue
}
