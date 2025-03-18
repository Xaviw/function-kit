import { isArray, isString } from './is'

/**
 * 生成指定范围内的随机数
 * @param min - 最小值，默认为 0；当只传入一个参数时，范围为 [0, min]
 * @param max - 最大值，默认为 100；传入后范围为 [min, max]
 * @param floatNum - 保留的小数位数，默认为 0
 * @returns 返回指定范围内的随机数
 * @example
 * ```ts
 * randomNumber(10) // 0-10 之间的整数
 * randomNumber(1, 10) // 1-10 之间的整数
 * randomNumber(1, 10, 2) // 1-10 之间的数字，保留 2 位小数
 * ```
 */
export function randomNumber(min?: number, max?: number, floatNum?: number): number {
  min = Number.parseInt(min as any)
  max = Number.parseInt(max as any)

  floatNum = Number.parseInt(floatNum as any) || 0
  if (floatNum < 0)
    floatNum = 0

  const _min = Number.isNaN(min) ? 0 : min
  const _max = Number.isNaN(max) ? Number.isNaN(min) ? 100 : min : max

  const val = Math.random() * (_max - _min) + _min

  return +(val.toFixed(floatNum).replace(/(?<=\.\d*)0(?=0*$)/g, () => randomNumber(1, 9).toString()))
}

/**
 * 生成指定长度的随机字符串
 * @param length - 字符串长度，默认为 8
 * @param chars - 可选字符集，默认为所有大小写字母和数字
 * @returns 返回生成的随机字符串
 * @example
 * ```ts
 * randomString() // 'Xa4Bm9Pq'
 * randomString(4) // 'Xm9P'
 * randomString(4, 'abc123') // 'a1b2'
 * ```
 */
export function randomString(length?: number, chars?: string): string {
  length = Number.parseInt(length as any) || 8
  if (length <= 0)
    length = 8

  if (!chars || !isString(chars))
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let result = ''

  for (let i = 0; i < length; i++) {
    const idx = randomNumber(0, chars.length - 1)
    result += chars[idx]
  }

  return result
}

/**
 * 随机打乱数组元素的顺序
 * @param arr - 要打乱的数组
 * @returns 返回打乱顺序后的新数组
 * @example
 * ```ts
 * shuffle([1, 2, 3, 4]) // [3, 1, 4, 2]
 * shuffle(['a', 'b', 'c']) // ['b', 'c', 'a']
 * ```
 */
export function shuffle<T extends unknown[]>(arr: T): T {
  if (!isArray(arr))
    return arr

  return arr.sort(() => +(Math.random() > 0.5))
}
