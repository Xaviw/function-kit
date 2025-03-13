import { isArray, isObject, isString } from './is'

/**
 * 计算动态绑定后的 css class 字符串
 * @param names - 要计算的 class 值列表，支持以下类型：
 * - 字符串：作为单个 class 名
 * - 对象：key 为 class 名，value 为布尔值
 * - 数组：包含上述任意类型
 * @returns 返回计算后的 class 字符串，多个 class 用空格分隔
 * @example
 * ```ts
 * // 基础用法
 * className('btn', 'primary') // 'btn primary'
 *
 * // 条件类名
 * className({ active: true, disabled: false }) // 'active'
 *
 * // 混合使用
 * className('btn', ['primary', { active: true }]) // 'btn primary active'
 *
 * // 嵌套数组
 * className(['btn', ['primary', { active: true }]]) // 'btn primary active'
 * ```
 */
export function className(...names: any[]): string {
  const result: string[] = []

  names.forEach((name) => {
    if (!name)
      return

    if (isString(name))
      return result.push(name)

    if (isArray(name))
      return result.push(className(...name))

    if (!isObject(name))
      return

    Object.entries(name).forEach(([key, value]) => {
      if (value)
        result.push(key)
    })
  })

  return result.join(' ')
}
