/**
 * 判断传入的年份是否是闰年
 */
export function isLeapYear(year: number): boolean {
  year = Number.parseInt(year as unknown as string)

  if (Number.isNaN(year))
    return false

  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}
