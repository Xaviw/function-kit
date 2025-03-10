import type { CancelableFunction, Fn } from '../types/common'
import { isFunction } from './is'

/**
 * 防抖函数，可通过自身的 cancel 方法取消（仅 immediate 为 false 时生效）
 * @param fn
 * @param waitMilliseconds 单位毫秒，默认 300
 * @param immediate 默认 false，连续触发仅执行最后一次；设置为 true 则连续触发只执行第一次
 */
export function debounce<F extends Fn>(fn: F, waitMilliseconds?: number, immediate = false): CancelableFunction<F> {
  if (!isFunction(fn)) {
    throw new TypeError('第一个参数要求传入函数')
  }

  waitMilliseconds = Number.parseFloat(waitMilliseconds as any) || 300

  let timeoutId: NodeJS.Timeout | undefined

  const debouncedFunction: CancelableFunction<F> = function (...args) {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }

    const callNow = immediate && timeoutId === undefined

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
