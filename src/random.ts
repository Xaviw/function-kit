import { isArray, isString } from './is'

/**
 * 生成随机数
 * @param min 最小值，默认 0；只传这一个参数时范围为 [0, min]
 * @param max 最大值，默认100；传递后范围为 [min, max]
 * @param floatNum 小数位数，默认 0
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

  return +val.toFixed(floatNum)
}

/**
 * 生成随机字符串
 * @param length 长度，默认 8
 * @param chars 可选字符，默认 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
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
 * 打乱数组项顺序
 */
export function shuffle<T extends unknown[]>(arr: T): T {
  if (!isArray(arr))
    return arr

  return arr.sort(() => +(Math.random() > 0.5))
}
