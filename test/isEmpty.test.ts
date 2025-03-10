import { expect, it } from 'vitest'
import { isEmpty } from '../src/isEmpty'

it('isEmpty', () => {
  expect(isEmpty([])).toBe(true)
  expect(isEmpty({})).toBe(true)
  expect(isEmpty(null)).toBe(true)
  expect(isEmpty('')).toBe(true)
  expect(isEmpty([1])).toBe(false)
  expect(isEmpty({ a: 1 })).toBe(false)
  expect(isEmpty('test')).toBe(false)
  ; (function (a: any) {
    // eslint-disable-next-line prefer-rest-params
    expect(isEmpty(arguments)).toBe(false)
    return a
  })('test')
})
