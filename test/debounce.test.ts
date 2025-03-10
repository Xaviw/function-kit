import { describe, expect, it, vi } from 'vitest'
import { debounce } from '../src/debounce'

describe('debounce', () => {
  vi.useFakeTimers()

  it('非立即执行', () => {
    const fn = vi.fn()
    expect(() => debounce(null as any, 300)).toThrow(TypeError)

    const debouncedFn = debounce(fn)

    debouncedFn()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalled()

    debouncedFn()
    debouncedFn.cancel()
    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('立即执行', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 300, true)

    debouncedFn()
    debouncedFn()
    expect(fn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)

    debouncedFn()
    debouncedFn.cancel()
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
