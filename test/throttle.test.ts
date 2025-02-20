import { describe, expect, it, vi } from 'vitest'
import { throttle } from '../src/throttle'

describe('throttle 节流', () => {
  it('非立即执行', () => {
    const fn = vi.fn(n => n)
    const throttleFn = throttle(fn, 100)

    throttleFn(1)
    const r1 = throttleFn(2)

    let r2: number | undefined
    setTimeout(() => {
      throttleFn(3)
    }, 150)
    setTimeout(() => {
      r2 = throttleFn(4)
    }, 200)

    let r3: number | undefined
    setTimeout(() => {
      r3 = throttleFn(5)
    }, 350)
    setTimeout(() => {
      throttleFn.cancel()
    }, 400)

    setTimeout(() => {
      expect(r1).toBeUndefined()
      expect(r2).toBeUndefined()
      expect(r3).toBeUndefined()
      expect(fn).toHaveBeenCalledTimes(2)
    }, 250)
  })

  it('立即执行', () => {
    const fn = vi.fn(n => n)
    const throttleFn = throttle(fn, 100, true)

    const r1 = throttleFn(1)
    throttleFn(2)

    let r2: number | undefined
    setTimeout(() => {
      r2 = throttleFn(3)
    }, 150)
    setTimeout(() => {
      throttleFn(4)
    }, 200)

    let r3: number | undefined, r4: number | undefined
    setTimeout(() => {
      r3 = throttleFn(5)
    }, 350)
    setTimeout(() => {
      throttleFn.cancel()
      r4 = throttleFn(6)
    }, 400)

    setTimeout(() => {
      expect(r1).toBe(1)
      expect(r2).toBe(3)
      expect(r3).toBe(5)
      expect(r4).toBe(6)
      expect(fn).toHaveBeenCalledTimes(4)
    }, 250)
  })
})
