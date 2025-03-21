/**
 * 将字节数转换为带单位的文件大小字符串
 * @param bytes - 要转换的字节数
 * @param suffixes - 单位数组，默认为 ['b', 'K', 'M', 'G', 'T']
 * @returns 返回格式化后的文件大小字符串，最多保留两位小数
 * @example
 * ```ts
 * // 基础转换
 * fileSize(1024) // '1K'
 * fileSize(1048576) // '1M'
 *
 * // 小数保留
 * fileSize(1536) // '1.5K'
 * fileSize(2684354560) // '2.5G'
 *
 * // 自定义单位
 * fileSize(1024, ['B', 'KB', 'MB']) // '1KB'
 *
 * // 边界情况
 * fileSize(-1) // '0b'
 * fileSize(1024 ** 5) // '1024T'
 * ```
 */
export function fileSize(bytes: number, suffixes = ['b', 'K', 'M', 'G', 'T']): string {
  const num = Number.parseInt(bytes as any)

  if (Number.isNaN(num))
    return bytes as any

  if (num <= 0)
    return `0${suffixes[0]}`

  const maxIdx = suffixes.length - 1
  const suffixIdx = Math.floor(Math.log(num) / Math.log(1024))
  const overMax = suffixIdx > maxIdx
  const suffix = overMax ? suffixes[maxIdx] : suffixes[suffixIdx]

  const val = (num / 2 ** (suffixIdx * 10)) * (overMax ? (suffixIdx - maxIdx) * 1024 : 1)

  return +val.toFixed(2) + suffix
}
