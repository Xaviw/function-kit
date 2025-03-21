import { it } from 'vitest'
import { objectToString } from '../src/objectToString'

it('objectToString', ({ expect }) => {
  expect(objectToString(1)).toBe('[object Number]')
  expect(objectToString('')).toBe('[object String]')
  expect(objectToString(true)).toBe('[object Boolean]')
  expect(objectToString([])).toBe('[object Array]')
  expect(objectToString({})).toBe('[object Object]')
  expect(objectToString(() => {})).toBe('[object Function]')
})
