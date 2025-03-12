// https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number

/**
 * 为数字添加英文序号尾缀
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
