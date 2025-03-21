import { expect, it } from 'vitest'
import { mapObject } from '../src/mapObject'

it('mapObject', () => {
  expect(mapObject({ a: 1, b: 2 }, (key, val) => [key, val += 1])).toEqual({ a: 2, b: 3 })

  expect((mapObject as any)(1)).toBe(1)

  expect(mapObject({}, val => val)).toEqual({})

  expect(() => (mapObject as any)({ a: 1 }, null)).toThrow(TypeError)

  expect(mapObject({ a: { b: 2 } }, (key, val) => [key.toUpperCase(), (typeof val === 'number' ? val + 1 : val)])).toEqual({ A: { b: 2 } })

  expect(mapObject({ a: 1, b: 'string', c: true }, (key, val) => [key, typeof val === 'number' ? val + 1 : val])).toEqual({ a: 2, b: 'string', c: true })
})
