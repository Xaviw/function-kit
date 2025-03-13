import { get } from './get'
import { isArray, isObject, isString } from './is'
import { isEqual } from './isEqual'

interface FuzzySearchOptions {
  /** 当数组项为对象时，指定要搜索的属性路径，支持嵌套路径（如 'user.name'） */
  key?: string
  /** 是否区分大小写，默认为 true */
  caseSensitive?: boolean
  /** 是否启用模糊搜索，默认为 false（仅当搜索值和目标值都是字符串时生效） */
  fuzzy?: boolean
}

/**
 * 在数组中搜索满足条件的项
 * @param target - 要搜索的值，当为字符串时支持模糊匹配
 * @param sources - 要搜索的源数组
 * @param options - 搜索选项配置
 * @returns 返回所有匹配项组成的数组
 * @example
 * ```ts
 * // 简单值搜索
 * search(1, [1, 2, 3]) // [1]
 *
 * // 对象数组搜索
 * search('John', [{ name: 'John' }, { name: 'Jane' }], { key: 'name' }) // [{ name: 'John' }]
 *
 * // 模糊搜索
 * search('jo', [{ name: 'John' }, { name: 'Jane' }], {
 *   key: 'name',
 *   fuzzy: true,
 *   caseSensitive: false
 * }) // [{ name: 'John' }]
 * ```
 */
export function search<T>(target: any, sources: T[], options?: FuzzySearchOptions): T[] {
  if (!isArray(sources)) {
    return []
  }

  const { key, caseSensitive = true, fuzzy = false } = isObject(options) ? options : {}

  return sources.filter((item) => {
    let val = key ? get(item, key) : item

    if (isString(target) && isString(val)) {
      if (!caseSensitive) {
        target = target.toLowerCase()
        val = val.toLowerCase()
      }

      if (fuzzy)
        return (val as string).includes(target)
    }

    return isEqual(target, val)
  })
}
