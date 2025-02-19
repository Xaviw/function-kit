interface DebouncedFunction<F extends Fn> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): ReturnType<F> | void
  cancel: () => void
}

/**
 * 防抖
 * @web
 * @miniprogram
 * @node
 * @param fn 目标函数
 * @param waitMilliseconds 防抖间隔（毫秒）
 * @param immediate 是否立即执行一次，立即执行时才有返回值
 */
export function debounce<F extends Fn>(fn: F, waitMilliseconds = 50, immediate = false): DebouncedFunction<F> {
  let timeoutId: NodeJS.Timeout | undefined

  const debouncedFunction: DebouncedFunction<F> = function (...args) {
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
