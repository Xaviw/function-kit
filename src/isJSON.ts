/**
 * 判断字符串是否是合法的 JSON 格式字符串
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
