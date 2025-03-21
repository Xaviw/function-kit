import { expect, it } from 'vitest'
import { filterObject } from '../src/filterObject'

it('filterObject', () => {
  expect(filterObject({ a: 1, b: 2 }, key => key === 'a')).toEqual({ a: 1 })

  expect((filterObject as any)(1)).toBe(1)

  expect(filterObject({}, val => val)).toEqual({})

  expect(() => (filterObject as any)({ a: 1 }, null)).toThrow(TypeError)
})
