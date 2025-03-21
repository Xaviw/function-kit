import { expect, it } from 'vitest'
import { isArrayLike } from '../src/isArrayLike'

it('isArrayLike', () => {
  expect(isArrayLike([1, 2, 3])).toBe(true)
  expect(isArrayLike('abc')).toBe(true)
  expect(isArrayLike({ length: 2, 0: '0', 1: '1' })).toBe(true)
  expect(isArrayLike(() => {})).toBe(false)
  expect(isArrayLike({})).toBe(false)
  expect((isArrayLike as any)()).toBe(false)
})
