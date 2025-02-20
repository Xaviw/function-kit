import { describe, expect, it, vi } from 'vitest'
import { debounce } from '../src/debounce'

describe('debounce 防抖', () => {
  it('非立即执行', () => {
    const fn = vi.fn(n => n)
    const debouncedFn = debounce(fn, 100)

    debouncedFn(1)
    const r1 = debouncedFn(2)

    let r2: number | undefined
    setTimeout(() => {
      debouncedFn(3)
    }, 150)
    setTimeout(() => {
      r2 = debouncedFn(4)
    }, 200)

    let r3: number | undefined
    setTimeout(() => {
      r3 = debouncedFn(5)
    }, 350)
    setTimeout(() => {
      debouncedFn.cancel()
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
    const debouncedFn = debounce(fn, 100, true)

    const r1 = debouncedFn(1)
    debouncedFn(2)

    let r2: number | undefined
    setTimeout(() => {
      r2 = debouncedFn(3)
    }, 150)
    setTimeout(() => {
      debouncedFn(4)
    }, 200)

    let r3: number | undefined, r4: number | undefined
    setTimeout(() => {
      r3 = debouncedFn(5)
    }, 350)
    setTimeout(() => {
      debouncedFn.cancel()
      r4 = debouncedFn(6)
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
