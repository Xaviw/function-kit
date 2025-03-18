import { expect, it } from 'vitest'
import { omit } from '../src/omit'

it('omit', () => {
  const obj = {
    name: 'Tom',
    age: 18,
    gender: 'male',
    address: 'Beijing',
  }

  expect(omit(obj, ['age', 'gender'])).toEqual({
    name: 'Tom',
    address: 'Beijing',
  })

  expect(omit(obj, [])).toEqual(obj)

  expect(omit(obj, ['nonexistent'] as any)).toEqual(obj)

  expect(omit(null as any, ['age'])).toEqual(null)

  expect(omit({}, ['test'] as any)).toEqual({})
})
