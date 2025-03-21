import { expect, it } from 'vitest'
import { pick } from '../src/pick'

it('pick', () => {
  const obj = { name: 'John', age: 30, email: 'john@example.com' }

  expect(pick(obj, ['name', 'age'])).toEqual({ name: 'John', age: 30 })

  expect(pick(obj, ['name', 'notExist'] as any)).toEqual({ name: 'John' })

  expect(pick(obj, [])).toEqual({})

  const nonObj = 123
  expect(pick(nonObj as any, ['toString'])).toBe(nonObj)
})
