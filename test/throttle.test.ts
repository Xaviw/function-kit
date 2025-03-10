import { describe, expect, it, vi } from 'vitest'
import { throttle } from '../src/throttle'

describe('throttle 节流', () => {
  it('非立即执行', () => {
    const fn = vi.fn(n => n)
    const throttleFn = throttle(fn, 100)

    throttleFn(1)
    throttleFn(2)
    expect(fn).toHaveBeenCalledTimes(0)
    setTimeout(() => {
      throttleFn(3)
    }, 150)
    setTimeout(() => {
      throttleFn(4)
    }, 200)
    setTimeout(() => {
      throttleFn(5)
    }, 250)
    setTimeout(() => {
      throttleFn(5)
      expect(fn).toHaveBeenCalledTimes(2)
    }, 300)
    setTimeout(() => {
      throttleFn.cancel()
    }, 350)
    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(2)
    }, 400)
  })

  it('立即执行', () => {
    const fn = vi.fn(n => n)
    const throttleFn = throttle(fn, 100, true)

    throttleFn(1)
    throttleFn(2)
    expect(fn).toHaveBeenCalledTimes(1)
    setTimeout(() => {
      throttleFn(3)
    }, 150)
    setTimeout(() => {
      throttleFn(4)
    }, 200)
    setTimeout(() => {
      throttleFn(5)
    }, 250)
    setTimeout(() => {
      throttleFn(5)
      expect(fn).toHaveBeenCalledTimes(3)
    }, 300)
    setTimeout(() => {
      throttleFn.cancel()
    }, 350)
    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(3)
    }, 400)
  })
})
