import { expect, it } from 'vitest'
import { get } from '../src/get'

it('get', () => {
  const obj = { a: { aa: [{ aaa: 1 }, 2], b: null } }

  expect(get(obj, 'a.aa')).toBe(obj.a.aa)

  expect(get(obj, 'a.aa[0].aaa')).toBe(1)

  expect(get(obj, 'c')).toBe(undefined)

  expect(get(obj, 'c', 1)).toBe(1)

  expect(get(obj, 'a.b', 1)).toBe(null)

  expect(get(null, 'a.b', 1)).toBe(1)
})
