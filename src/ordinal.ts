// https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number

/**
 * 为数字添加英文序数词后缀（st、nd、rd、th）
 * @param num - 要转换的数字
 * @returns 返回添加了序数词后缀的字符串
 * @throws 当输入的值无法转换为数字时抛出类型错误
 * @example
 * ```ts
 * ordinal(1) // '1st'
 * ordinal(2) // '2nd'
 * ordinal(3) // '3rd'
 * ordinal(4) // '4th'
 * ordinal(11) // '11th'
 * ordinal(21) // '21st'
 * ```
 */
export function ordinal(num: number): string {
  const val = Number.parseInt(num as any)
  if (Number.isNaN(val))
    throw new TypeError('参数需要是数字')

  const j = val % 10
  const k = val % 100
  let indicator = 'th'

  if (j === 1 && k !== 11)
    indicator = 'st'

  if (j === 2 && k !== 12)
    indicator = 'nd'

  if (j === 3 && k !== 13)
    indicator = 'rd'

  return val + indicator
};
