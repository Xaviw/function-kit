import type { CancelableFunction, Fn } from '../types/common'

/**
 * 节流
 * @param fn 节流函数
 * @param waitMilliseconds 节流时长（毫秒），默认 300
 * @param immediate 是否立即执行一次，立即执行时才有返回值，默认 false
 * @returns 节流函数，可通过自身的 cancel 方法取消
 */
export function throttle<F extends Fn>(fn: F, waitMilliseconds = 300, immediate = false): CancelableFunction<F> {
  let timeoutId: NodeJS.Timeout | undefined
  let lastExecutionTime = 0

  const throttledFunction: CancelableFunction<F> = function (...args) {
    const now = Date.now()

    const remainingTime = Math.max(lastExecutionTime + waitMilliseconds - now, 0)

    if (immediate && !remainingTime) {
      lastExecutionTime = now
      return fn.apply(this, args)
    }

    if (!immediate) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        lastExecutionTime = Date.now()
        fn.apply(this, args)
      }, remainingTime)
    }
  }

  throttledFunction.cancel = function () {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
    lastExecutionTime = 0
  }

  return throttledFunction
}
