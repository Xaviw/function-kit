import { expect, it } from 'vitest'
import { randomNumber, randomString, shuffle } from '../src/random'

it('randomNumber', () => {
  expect(randomNumber()).greaterThanOrEqual(0).lessThanOrEqual(100)

  expect(randomNumber(10)).greaterThanOrEqual(0).lessThanOrEqual(10)

  expect(randomNumber(-1, 1)).greaterThanOrEqual(-1).lessThanOrEqual(1)

  expect(randomNumber(0, 10, 3)).greaterThanOrEqual(0).lessThanOrEqual(10).match(/^-?\d+\.\d{3}$/)

  expect(randomNumber(0, 10, -3)).greaterThanOrEqual(0).lessThanOrEqual(10).match(/^-?\d+$/)
})

it('randomString', () => {
  expect(randomString()).toHaveLength(8)

  expect(randomString(-4)).toHaveLength(8)

  expect(randomString(4)).toHaveLength(4)

  expect(randomString(4, 'a')).toBe('aaaa')
})

it('shuffle', () => {
  const arr = [1, 2, 3, 4, 5]

  expect(shuffle(arr)).toHaveLength(5)

  expect((shuffle as any)()).toBe(undefined)
})
