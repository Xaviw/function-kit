import { get } from './get'
import { isArray, isObject, isString } from './is'
import { isEqual } from './isEqual'

interface FuzzySearchOptions {
  key?: string
  caseSensitive?: boolean
  fuzzy?: boolean
}

/**
 * 搜索数组中满足条件的数组项
 * @param target 搜索值，为字符串时支持模糊匹配
 * @param sources 源数组
 * @param options 选项
 * @param options.key 目标字段路径（仅数组项为对象或数组时有效，支持嵌套），未指定时匹配数组项本身
 * @param options.caseSensitive 大小写敏感，默认 true
 * @param options.fuzzy 模糊搜索（仅搜索值、字段值均为字符串时有效），默认 false
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
