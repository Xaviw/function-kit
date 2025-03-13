/**
 * 获取值的内部 [[Class]] 属性，等同于 Object.prototype.toString.call
 * @param val - 要获取类型的值
 * @returns 返回形如 '[object Type]' 的字符串
 * @example
 * ```ts
 * objectToString([]) // '[object Array]'
 * objectToString({}) // '[object Object]'
 * objectToString(null) // '[object Null]'
 * objectToString(new Date()) // '[object Date]'
 * ```
 */
export function objectToString(val: any): string {
  return Object.prototype.toString.call(val)
}
