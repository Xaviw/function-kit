/**
 * 判断字符串是否是合法的 JSON 格式字符串
 * @param val - 要检查的字符串
 * @returns 如果字符串是合法的 JSON 格式则返回 true，否则返回 false
 * @example
 * ```ts
 * isJSON('{"name": "test"}') // true
 * isJSON('{"name": test}') // false
 * isJSON('[1, 2, 3]') // true
 * isJSON('invalid json') // false
 * ```
 */
export function isJSON(val: string): boolean {
  try {
    JSON.parse(val)
    return true
  }
  catch {
    return false
  }
}
