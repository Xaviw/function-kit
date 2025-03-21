import { expect, it } from 'vitest'
import { cloneDeep } from '../src/cloneDeep'

it('cloneDeep', () => {
  expect(cloneDeep(1)).toBe(1)

  const date = new Date()
  const clonedDate = cloneDeep(date)
  expect(clonedDate).toEqual(date)
  expect(clonedDate).not.toBe(date)

  const regex = /test/gi
  const clonedRegex = cloneDeep(regex)
  expect(clonedRegex).toEqual(regex)
  expect(clonedRegex).not.toBe(regex)

  const map = new Map([['key', 'value']])
  const clonedMap = cloneDeep(map)
  expect(clonedMap).toEqual(map)
  expect(clonedMap).not.toBe(map)

  const set = new Set([1, 2, 3])
  const clonedSet = cloneDeep(set)
  expect(clonedSet).toEqual(set)
  expect(clonedSet).not.toBe(set)

  const buffer = new ArrayBuffer(8)
  const clonedBuffer = cloneDeep(buffer)
  expect(clonedBuffer).toEqual(buffer)
  expect(clonedBuffer).not.toBe(buffer)

  const array = [1, [2, 3]]
  const clonedArray = cloneDeep(array)
  expect(clonedArray).toEqual(array)
  expect(clonedArray).not.toBe(array)

  const obj = { a: 1, b: { c: 2 }, d: array }
  const circularObj = { array, obj }
  const clonedObj = cloneDeep(circularObj)
  expect(clonedObj).toEqual(circularObj)
  expect(clonedObj).not.toBe(circularObj)
})
