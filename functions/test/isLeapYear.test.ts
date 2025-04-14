import { expect, it } from 'vitest'
import { isLeapYear } from '../src/isLeapYear'

it('isLeapYear', () => {
  expect(isLeapYear(2008)).toBe(true)
  expect(isLeapYear(2009)).toBe(false)
  expect(isLeapYear('2024' as any)).toBe(true)
  expect(isLeapYear('test' as any)).toBe(false)
})
