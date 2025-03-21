/**
 * 判断年份是否是闰年
 * @param year - 要判断的年份
 * @returns 如果是闰年返回 true，否则返回 false
 * @example
 * ```ts
 * // 世纪闰年
 * isLeapYear(2000) // true
 * isLeapYear(1900) // false
 *
 * // 普通闰年
 * isLeapYear(2008) // true
 * isLeapYear(2023) // false
 *
 * // 非法输入
 * isLeapYear(NaN) // false
 * ```
 */
export function isLeapYear(year: number): boolean {
  year = Number.parseInt(year as unknown as string)

  if (Number.isNaN(year))
    return false

  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}
