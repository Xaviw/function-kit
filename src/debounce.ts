import type { CancelableFunction } from '../types/utils'

/**
 * 防抖
 * @web
 * @miniprogram
 * @node
 * @param fn 防抖函数
 * @param waitMilliseconds 防抖时长（毫秒），默认 300
 * @param immediate 是否立即执行一次，立即执行时才有返回值，默认 false
 * @returns 防抖函数，可通过自身的 cancel 方法取消
 */
export function debounce<F extends Fn>(fn: F, waitMilliseconds = 300, immediate = false): CancelableFunction<F> {
  let timeoutId: NodeJS.Timeout | undefined

  const debouncedFunction: CancelableFunction<F> = function (...args) {
    const callNow = immediate && timeoutId === undefined
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      timeoutId = undefined
      if (!immediate) {
        fn.apply(this, args)
      }
    }, waitMilliseconds)

    if (callNow) {
      return fn.apply(this, args)
    }
  }

  debouncedFunction.cancel = function () {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
  }

  return debouncedFunction
}
