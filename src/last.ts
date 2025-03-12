/**
 * 获取数组最后一项
 * @param arr 数组
 * @param defaultValue 数组为空时返回默认值
 */
export function last<T>(arr: T[], defaultValue?: T): T | undefined {
  return arr?.length > 0 ? arr[arr.length - 1] : defaultValue
}
