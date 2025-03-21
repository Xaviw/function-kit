import { describe, expect, it, vi } from 'vitest'
import { throttle } from '../src/throttle'

describe('throttle', () => {
  vi.useFakeTimers()

  it('非立即执行', () => {
    const fn = vi.fn()
    expect(() => throttle(null as any)).toThrow(TypeError)

    const throttledFn = throttle(fn, 300, false)

    throttledFn()
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(150)
    throttledFn()
    vi.advanceTimersByTime(150)
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(150)
    expect(fn).toHaveBeenCalledTimes(1)

    throttledFn()
    throttledFn.cancel()
    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('立即执行', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn)

    throttledFn()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(150)
    throttledFn()
    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)

    throttledFn()
    throttledFn.cancel()
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
