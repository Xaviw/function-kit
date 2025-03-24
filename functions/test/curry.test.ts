import { expect, it } from 'vitest'
import { curry } from '../src/curry'

it('curry', () => {
  expect(() => (curry as any)()).toThrow(TypeError)

  // 测试普通函数柯里化
  const add = curry((a: number, b: number, c: number) => a + b + c)
  expect(add(1)(2)(3)).toBe(6)
  expect(add(1, 2)(3)).toBe(6)
  expect(add(1, 2, 3)).toBe(6)

  // 测试this绑定
  const obj = {
    multiplier: 2,
    multiply: curry(function (this: { multiplier: number }, x: number) {
      return x * this.multiplier
    }),
  }
  expect(obj.multiply(4)).toBe(8)
})
