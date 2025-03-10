/* eslint-disable unicorn/new-for-builtins */
/* eslint-disable no-new-wrappers */
import { expect, it } from 'vitest'
import { isEqual } from '../src/isEqual'

it('isEqual', () => {
  expect(isEqual(1, 1)).toBe(true)
  expect(isEqual('a', 'a')).toBe(true)
  expect(isEqual(true, true)).toBe(true)
  expect(isEqual(null, null)).toBe(true)
  expect(isEqual(undefined, undefined)).toBe(true)

  expect(isEqual(1, 2)).toBe(false)
  expect(isEqual('a', 'b')).toBe(false)
  expect(isEqual(true, false)).toBe(false)
  expect(isEqual(null, undefined)).toBe(false)

  expect(isEqual(Number.NaN, Number.NaN)).toBe(true)
  expect(isEqual(Number.NaN, 1)).toBe(false)

  expect(isEqual(0, -0)).toBe(false)
  expect(isEqual(0, 0)).toBe(true)
  expect(isEqual(-0, -0)).toBe(true)

  expect(isEqual(new Number(), new String())).toBe(false)
  expect(isEqual(new Number(Number.NaN), new Number(Number.NaN))).toBe(true)
  expect(isEqual(new Number(0), new Number(-0))).toBe(false)
  expect(isEqual(new Number(1), new Number(-1))).toBe(false)

  const obj = { a: 1, b: 2 }
  expect(isEqual(obj, obj)).toBe(true)

  expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
  expect(isEqual({ a: 1 }, { a: 2 })).toBe(false)

  const arr = [1, 2, 3]
  expect(isEqual(arr, arr)).toBe(true)

  expect(isEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false)
  expect(isEqual([1, 2, 3], [4, 5, 6])).toBe(false)

  const date = new Date()
  expect(isEqual(date, date)).toBe(true)

  expect(isEqual(new Date(2020, 1, 1), new Date(2021, 1, 1))).toBe(false)

  const regex = /a/g
  expect(isEqual(regex, regex)).toBe(true)

  expect(isEqual(/a/g, /b/g)).toBe(false)

  expect(isEqual(new Map([['a', 1], ['b', 2]]), new Map([['a', 1]]))).toBe(false)
  expect(isEqual(new Map([['a', 1], ['b', 2]]), new Map([['a', 1], ['b', 3]]))).toBe(false)
  expect(isEqual(new Map([['a', 1]]), new Map([['a', 1]]))).toBe(true)

  expect(isEqual(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true)
  expect(isEqual(new Set([1, 2, 3]), new Set([4, 5]))).toBe(false)
  expect(isEqual(new Set([1, 2, 3]), new Set([4, 5, 6]))).toBe(false)

  const a: any = { }
  const b: any = { }
  a.self = a
  b.self = b
  expect(isEqual(a, b)).toBe(true)

  expect(isEqual(() => { }, () => {})).toBe(false)

  const c: any = { }
  const d: any = { }
  c.self = c
  d.self = d
  d.other = 1
  expect(isEqual(c, d)).toBe(false)

  class Test1 {
    constructor() {}
  }
  class Test2 {
    constructor() {}
  }
  expect(isEqual(new Test1(), new Test1())).toBe(true)
  expect(isEqual(new Test1(), new Test2())).toBe(false)
})
