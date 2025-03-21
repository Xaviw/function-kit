import { expect, it } from 'vitest'
import { last } from '../src/last'

it('last', () => {
  expect(last([])).toBe(undefined)

  expect(last([], 1)).toBe(1)

  expect(last([1, 2, '3', '4'])).toBe('4')
})
