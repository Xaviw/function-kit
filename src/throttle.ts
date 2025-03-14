import type { CancelableFunction, Fn } from '../types/common'
import { isFunction } from './is'

/**
 * 创建一个节流函数，限制函数在一定时间内只能执行一次
 * @param fn - 要节流的函数
 * @param waitMilliseconds - 等待时间（毫秒），默认为 300
 * @param immediate - 是否立即执行，默认为 true。若为 false 则等待时间结束后才执行
 * @returns 返回节流后的函数，该函数包含 cancel 方法用于取消等待中的定时器
 * @throws 当第一个参数不是函数时抛出类型错误
 * @example
 * ```ts
 * // 立即执行模式
 * const fn1 = throttle(console.log, 1000)
 * fn1('a') // 立即输出 'a'
 * fn1('b') // 被忽略
 *
 * // 延迟执行模式
 * const fn2 = throttle(console.log, 1000, false)
 * fn2('a') // 被忽略
 * fn2('b') // 1秒后输出 'b'
 *
 * // 立即执行时调用 cancel
 * const fn3 = throttle(console.log, 1000)
 * fn3('a') // 立即输出 'a'
 * fn3.cancel() // 取消运行中的等待
 * fn3('b') // 立即输出 'b'
 *
 * // 非立即执行时调用 cancel
 * const fn4 = throttle(console.log, 1000, false)
 * fn4('a') // 被忽略
 * fn4.cancel() // 取消运行中的等待
 * ```
 */
export function throttle<F extends Fn>(fn: F, waitMilliseconds?: number, immediate = true): CancelableFunction<F> {
  if (!isFunction(fn)) {
    throw new TypeError('第一个参数要求传入函数')
  }

  waitMilliseconds = Number.parseFloat(waitMilliseconds as any) || 300

  let timeoutId: NodeJS.Timeout | undefined

  const throttledFunction: CancelableFunction<F> = function (...args) {
    if (timeoutId)
      return

    timeoutId = setTimeout(() => {
      timeoutId = undefined
      if (!immediate) {
        fn.apply(this, args)
      }
    }, waitMilliseconds)

    if (immediate) {
      fn.apply(this, args)
    }
  }

  throttledFunction.cancel = function () {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
  }

  return throttledFunction
}
