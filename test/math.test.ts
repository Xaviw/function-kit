import { expect, it } from 'vitest'
import { isEven, isInteger, isOdd } from '../src/math'

it('isInteger', () => {
  expect(isInteger(1)).toBe(true)
  expect(isInteger(1.2)).toBe(false)
  expect(isInteger({} as any)).toBe(false)
})

it('isEven', () => {
  expect(isEven(0)).toBe(true)
  expect(isEven(1)).toBe(false)
  expect(isEven(2.2)).toBe(false)
  expect(isEven(2)).toBe(true)
})

it('isOdd', () => {
  expect(isOdd(0)).toBe(false)
  expect(isOdd(1)).toBe(true)
  expect(isOdd(1.1)).toBe(false)
  expect(isOdd(2)).toBe(false)
})
