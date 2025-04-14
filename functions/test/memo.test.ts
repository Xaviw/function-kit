import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Lru } from '../src/Lru'
import { memo } from '../src/memo'

describe('memo', () => {
  let fn: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fn = vi.fn((a: number, b: number) => a + b)
    vi.useFakeTimers()
  })

  it('should memoize basic function calls', () => {
    const memoized = memo(fn)

    expect(memoized(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledTimes(1)

    expect(memoized(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledTimes(1)

    expect(memoized(2, 3)).toBe(5)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should work with custom key function', () => {
    const memoizedWithKey = memo(fn, {
      key: (a, b) => `${a}-${b}`,
    })

    expect(memoizedWithKey(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(memoizedWithKey(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledTimes(1)

    const memoizedWithKeyCache = new Lru()
    memoizedWithKeyCache.set('1-2', { expires: null, value: 3 })
    expect((memoizedWithKey as any).cache).toEqual(memoizedWithKeyCache)
  })

  it('should handle expiration correctly', () => {
    const memoizedWithExpires = memo(fn, {
      expires: 50,
    })

    expect(memoizedWithExpires(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(memoizedWithExpires(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(100)

    expect(memoizedWithExpires(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should handle invalid expires parameter', () => {
    const memoizedWithInvalidExpires = memo(fn, {
      expires: 'invalid' as any,
    })

    expect(memoizedWithInvalidExpires(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(memoizedWithInvalidExpires(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should handle LRU cache correctly', () => {
    const memoizedWithLru = memo(fn, {
      lruMax: 2,
    })

    expect(memoizedWithLru(1, 2)).toBe(3)
    expect(memoizedWithLru(3, 4)).toBe(7)
    expect(fn).toHaveBeenCalledTimes(2)

    expect(memoizedWithLru(5, 6)).toBe(11)
    expect(fn).toHaveBeenCalledTimes(3)

    expect(memoizedWithLru(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledTimes(4)

    expect(memoizedWithLru(5, 6)).toBe(11)
    expect(fn).toHaveBeenCalledTimes(4)
  })

  it('should handle async functions', async () => {
    const asyncFn = vi.fn(async (a: number, b: number) => a + b)
    const memoizedAsync = memo(asyncFn)

    await expect(memoizedAsync(1, 2)).resolves.toBe(3)
    expect(asyncFn).toHaveBeenCalledTimes(1)

    await expect(memoizedAsync(1, 2)).resolves.toBe(3)
    expect(asyncFn).toHaveBeenCalledTimes(1)
  })

  it('should handle async function errors', async () => {
    const error = new Error('test error')
    const asyncFn = vi.fn(async () => {
      throw error
    })
    const memoizedAsync = memo(asyncFn)

    await expect(memoizedAsync()).rejects.toThrow(error)
    expect(asyncFn).toHaveBeenCalledTimes(1)

    await expect(memoizedAsync()).rejects.toThrow(error)
    expect(asyncFn).toHaveBeenCalledTimes(2)
  })
})
