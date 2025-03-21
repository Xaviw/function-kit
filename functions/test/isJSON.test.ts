import { expect, it } from 'vitest'
import { isJSON } from '../src/isJSON'

it('isJSON', () => {
  expect(isJSON(`{"a": 1}`)).toBe(true)
  expect(isJSON(`[1,2,3]`)).toBe(true)
  expect(isJSON(`{a: 1}`)).toBe(false)
})
