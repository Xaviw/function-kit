/**
 * 通过字节数计算带单位的文件大小
 * @param bytes 字节数
 * @param suffixes 每一级单位名称，默认 ['b', 'K', 'M', 'G', 'T']
 */
export function fileSize(bytes: number, suffixes = ['b', 'K', 'M', 'G', 'T']): string {
  const num = Number.parseInt(bytes as any)

  if (Number.isNaN(num))
    return bytes as any

  if (num <= 0)
    return `0${suffixes[0]}`

  const suffixIdx = Math.floor(Math.log(num) / Math.log(1024))
  const suffix = suffixes[suffixIdx]

  const val = num / 2 ** (suffixIdx * 10)

  return +val.toFixed(2) + suffix
}
