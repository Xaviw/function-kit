import { expect, it, vi } from 'vitest'
import { Lru } from '../src/Lru'
import { memo } from '../src/memo'

it('memo', () => {
  const fn = vi.fn((a: number, b: number) => a + b)

  const memoized = memo(fn)

  // 首次调用应该执行原函数
  expect(memoized(1, 2)).toBe(3)
  expect(fn).toHaveBeenCalledTimes(1)

  // 相同参数再次调用应该使用缓存
  expect(memoized(1, 2)).toBe(3)
  expect(fn).toHaveBeenCalledTimes(1)

  // 不同参数应该重新执行原函数
  expect(memoized(2, 3)).toBe(5)
  expect(fn).toHaveBeenCalledTimes(2)

  // 测试自定义 key 函数
  fn.mockClear()
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

  // 测试过期功能
  fn.mockClear()
  vi.useFakeTimers()
  const memoizedWithExpires = memo(fn, {
    expires: 50,
  })

  expect(memoizedWithExpires(1, 2)).toBe(3)
  expect(fn).toHaveBeenCalledTimes(1)
  expect(memoizedWithExpires(1, 2)).toBe(3)
  expect(fn).toHaveBeenCalledTimes(1)

  // 等待缓存过期
  vi.advanceTimersByTime(100)

  expect(memoizedWithExpires(1, 2)).toBe(3)
  expect(fn).toHaveBeenCalledTimes(2)

  // 测试 LRU 缓存限制
  fn.mockClear()
  const memoizedWithLru = memo(fn, {
    lruMax: 2,
  })

  expect(memoizedWithLru(1, 2)).toBe(3)
  expect(memoizedWithLru(3, 4)).toBe(7)
  expect(fn).toHaveBeenCalledTimes(2)

  // 添加第三个缓存项，应该淘汰最早的缓存
  expect(memoizedWithLru(5, 6)).toBe(11)
  expect(fn).toHaveBeenCalledTimes(3)

  // 第一个缓存项应该被淘汰，再次调用应重新执行
  expect(memoizedWithLru(1, 2)).toBe(3)
  expect(fn).toHaveBeenCalledTimes(4)

  // 第三个缓存项应该还在
  expect(memoizedWithLru(5, 6)).toBe(11)
  expect(fn).toHaveBeenCalledTimes(4)
})
