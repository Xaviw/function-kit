import { expect, it } from 'vitest'
import { difference, intersects, isEven, isInteger, isOdd, union } from '../src/math'

it('isInteger', () => {
  expect(isInteger(1)).toBe(true)
  expect(isInteger(1.2)).toBe(false)
  expect(isInteger({} as any)).toBe(false)
})

it('isEven', () => {
  expect(isEven(0)).toBe(true)
  expect(isEven(1)).toBe(false)
  expect(isEven(2.2)).toBe(false)
  expect(isEven(2)).toBe(true)
})

it('isOdd', () => {
  expect(isOdd(0)).toBe(false)
  expect(isOdd(1)).toBe(true)
  expect(isOdd(1.1)).toBe(false)
  expect(isOdd(2)).toBe(false)
})

it('difference', () => {
  expect((difference as any)('1', '2', (x: string) => x)).toEqual([])

  expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1])
  expect(difference([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3])
  expect(difference([1, 2, 3], [])).toEqual([1, 2, 3])

  const a = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const b = [{ id: 2 }, { id: 3 }, { id: 4 }]
  expect(difference(a, b, x => x.id)).toEqual([{ id: 1 }])

  expect(difference([], [1, 2, 3])).toEqual([])
  expect(difference([1, 2, 3], [])).toEqual([1, 2, 3])
  expect(difference([], [])).toEqual([])
})

it('intersects', () => {
  expect((intersects as any)('1', '2', (x: string) => x)).toEqual([])

  expect(intersects([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
  expect(intersects([1, 2, 3], [4, 5, 6])).toEqual([])
  expect(intersects([1, 2, 2], [2, 2, 3])).toEqual([2, 2])

  const a = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const b = [{ id: 2 }, { id: 3 }, { id: 4 }]
  expect(intersects(a, b, x => x.id)).toEqual([{ id: 2 }, { id: 3 }])

  expect(intersects([], [1, 2, 3])).toEqual([])
  expect(intersects([1, 2, 3], [])).toEqual([])
  expect(intersects([], [])).toEqual([])
})

it('union', () => {
  expect((union as any)('1', '2', (x: string) => x)).toEqual([])

  expect(union([1, 2], [2, 3])).toEqual([1, 2, 3])
  expect(union([1, 2], [3, 4])).toEqual([1, 2, 3, 4])
  expect(union([1, 1], [2, 2])).toEqual([1, 2])

  const a = [{ id: 1 }, { id: 2 }]
  const b = [{ id: 2 }, { id: 3 }]
  expect(union(a, b, x => x.id)).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])

  expect(union([], [1, 2, 3])).toEqual([1, 2, 3])
  expect(union([1, 2, 3], [])).toEqual([1, 2, 3])
  expect(union([], [])).toEqual([])
})
