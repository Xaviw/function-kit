import type { CancelableFunction, Fn } from '../types/common'
import { isFunction } from './is'

/**
 * 节流函数，可通过自身的 cancel 方法取消
 * @param fn
 * @param waitMilliseconds 单位毫秒，默认 300
 * @param immediate 默认 false，一段时间内的连续触发仅执行最后一次；设置为 true 则一段时间内的连续触发只执行第一次
 */
export function throttle<F extends Fn>(fn: F, waitMilliseconds?: number, immediate = false): CancelableFunction<F> {
  if (!isFunction(fn)) {
    throw new TypeError('第一个参数要求传入函数')
  }

  waitMilliseconds = Number.parseFloat(waitMilliseconds as any) || 300

  let timeoutId: NodeJS.Timeout | undefined
  let lastExecutionTime = 0

  const throttledFunction: CancelableFunction<F> = function (...args) {
    const now = Date.now()

    const remainingTime = Math.max(lastExecutionTime + waitMilliseconds - now, 0)

    if (immediate && !remainingTime) {
      lastExecutionTime = now
      fn.apply(this, args)
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
