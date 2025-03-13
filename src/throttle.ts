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
 * // 基础用法
 * const throttled = throttle(() => console.log('scroll'), 1000)
 * window.addEventListener('scroll', throttled)
 *
 * // 取消节流
 * const fn = throttle(() => {}, 1000)
 * fn.cancel()
 *
 * // 延迟执行
 * const delayed = throttle(() => console.log('delayed'), 1000, false)
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
