import type { CancelableFunction, Fn } from '../types/common'
import { isFunction } from './is'

/**
 * 防抖函数
 * 可调用 cancel 方法取消等待中的定时器
 * @param fn
 * @param waitMilliseconds 单位毫秒，默认 300
 * @param immediate 默认为 true，连续触发只执行第一次; 设置为 false 则连续触发仅执行最后一次
 */
export function debounce<F extends Fn>(fn: F, waitMilliseconds?: number, immediate = true): CancelableFunction<F> {
  if (!isFunction(fn)) {
    throw new TypeError('第一个参数要求传入函数')
  }

  waitMilliseconds = Number.parseFloat(waitMilliseconds as any) || 300

  let timeoutId: NodeJS.Timeout | undefined

  const debouncedFunction: CancelableFunction<F> = function (...args) {
    if (immediate && timeoutId === undefined) {
      fn.apply(this, args)
    }

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      timeoutId = undefined
      if (!immediate) {
        fn.apply(this, args)
      }
    }, waitMilliseconds)
  }

  debouncedFunction.cancel = function () {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
  }

  return debouncedFunction
}
