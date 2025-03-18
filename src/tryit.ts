import { isPromise } from './is'

export type TryitReturn<Return> =
  Return extends Promise<any>
    ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
    : [Error, undefined] | [undefined, Return]

/**
 * 包装一个函数，使其返回值转换为 [error, result] 的形式，用于优雅地处理错误
 * @param func - 需要被包装的函数
 * @returns 返回一个新函数，该函数返回 [error, result] 形式的结果
 * @example
 * ```ts
 * const [err, result] = tryit(JSON.parse)('{"name": "test"}')
 * if (err) {
 *   console.error('解析失败:', err)
 * } else {
 *   console.log('解析结果:', result)
 * }
 *
 * // 异步函数示例
 * const [err, user] = await tryit(fetchUser)(123)
 * if (err) {
 *   console.error('获取用户失败:', err)
 * } else {
 *   console.log('用户信息:', user)
 * }
 * ```
 */
export function tryit<Args extends any[], Return>(
  func: (...args: Args) => Return,
) {
  return (
    ...args: Args
  ): TryitReturn<Return> => {
    try {
      const result = func?.(...args)
      if (isPromise(result)) {
        return result
          .then(value => [undefined, value])
          .catch(err => [err, undefined]) as TryitReturn<Return>
      }

      return [undefined, result] as TryitReturn<Return>
    }
    catch (err) {
      return [err as any, undefined] as TryitReturn<Return>
    }
  }
}
