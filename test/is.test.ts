import path from 'node:path'
import { it } from 'vitest'
import { isArrayBuffer, isArrayLike, isAsyncFunction, isBlob, isBoolean, isDataUrl, isDate, isDirectory, isEmail, isEmpty, isEqual, isError, isEven, isFile, isFunction, isGeneratorFunction, isInteger, isJSON, isLeapYear, isMap, isNil, isNumber, isObject, isOdd, isPrimitive, isPromise, isRegExp, isSet, isSorted, isString, isSymbol, isTypedArray, isUndef, isUrl, isWeakMap, isWeakSet } from '../src/is'

it('isArrayBuffer', ({ expect }) => {
  expect(isArrayBuffer(new ArrayBuffer(8))).toBe(true)
  expect(isArrayBuffer(new Int16Array())).toBe(false)
  expect(isArrayBuffer([])).toBe(false)
})

it('isAsyncFunction', ({ expect }) => {
  expect(isAsyncFunction(async () => {})).toBe(true)
  expect(isAsyncFunction(() => {})).toBe(false)
})

it('isBlob', ({ expect }) => {
  expect(isBlob(new Blob([]))).toBe(true)
  expect(isBlob([])).toBe(false)
})

it('isBoolean', ({ expect }) => {
  expect(isBoolean(true)).toBe(true)
  expect(isBoolean(false)).toBe(true)
  expect(isBoolean(1)).toBe(false)
})

it('isDate', ({ expect }) => {
  expect(isDate(new Date())).toBe(true)
  expect(isDate(1)).toBe(false)
})

it('isError', ({ expect }) => {
  expect(isError(new Error('test'))).toBe(true)
  expect(isError(new DOMException('test'))).toBe(true)
  expect(isError({})).toBe(false)
})

it('isFunction', ({ expect }) => {
  expect(isFunction(() => { })).toBe(true)
  expect(isFunction(async () => { })).toBe(true)
  expect(isFunction(function* () { })).toBe(true)
  expect(isFunction({})).toBe(false)
})

it('isGeneratorFunction', ({ expect }) => {
  expect(isGeneratorFunction(function* () { })).toBe(true)
  expect(isGeneratorFunction(() => { })).toBe(false)
  expect(isGeneratorFunction(async () => { })).toBe(false)
  expect(isGeneratorFunction({})).toBe(false)
})

it('isFile', ({ expect }) => {
  expect(isFile(new File(['test'], 'test.txt', { type: 'text/plain' }))).toBe(true)
  expect(isFile({})).toBe(false)
})

it('isString', ({ expect }) => {
  expect(isString('')).toBe(true)
  expect(isString(null)).toBe(false)
  expect(isString(1)).toBe(false)
})

it('isNumber', ({ expect }) => {
  expect(isNumber(1)).toBe(true)
  expect(isNumber('')).toBe(false)
  expect(isNumber(null)).toBe(false)
})

it('isObject', ({ expect }) => {
  expect(isObject({})).toBe(true)
  expect(isObject([])).toBe(true)
  expect(isObject(() => { })).toBe(true)
  expect(isObject(/x/)).toBe(true)
  expect(isObject(1)).toBe(false)
  expect(isObject('')).toBe(false)
})

it('isNil', ({ expect }) => {
  expect(isNil(null)).toBe(true)
  expect(isNil(undefined)).toBe(true)
  expect(isNil(void 0)).toBe(true)
  expect(isNil(0)).toBe(false)
  expect(isNil('')).toBe(false)
  expect(isNil([])).toBe(false)
})

it('isPrimitive', ({ expect }) => {
  expect(isPrimitive(1)).toBe(true)
  expect(isPrimitive('1')).toBe(true)
  expect(isPrimitive(true)).toBe(true)
  expect(isPrimitive({})).toBe(false)
})

it('isPromise', ({ expect }) => {
  expect(isPromise((async () => { })())).toBe(true)
  expect(isPromise(Promise.resolve())).toBe(true)
  expect(isPromise(new Promise(() => { }))).toBe(true)
  expect(isPromise(() => { })).toBe(false)
})

it('isRegExp', ({ expect }) => {
  expect(isRegExp(/a/)).toBe(true)
  // eslint-disable-next-line prefer-regex-literals
  expect(isRegExp(new RegExp('a'))).toBe(true)
  expect(isRegExp(1)).toBe(false)
})

it('isMap', ({ expect }) => {
  expect(isMap(new Map())).toBe(true)
  expect(isMap(new Set())).toBe(false)
  expect(isMap(new WeakMap())).toBe(false)
  expect(isMap({})).toBe(false)
})

it('isSet', ({ expect }) => {
  expect(isSet(new Set())).toBe(true)
  expect(isSet(new Map())).toBe(false)
  expect(isSet(new WeakSet())).toBe(false)
  expect(isSet({})).toBe(false)
})

it('isWeakMap', ({ expect }) => {
  expect(isWeakMap(new WeakMap())).toBe(true)
  expect(isWeakMap(new Map())).toBe(false)
  expect(isWeakMap({})).toBe(false)
})

it('isWeakSet', ({ expect }) => {
  expect(isWeakSet(new WeakSet())).toBe(true)
  expect(isWeakSet(new Set())).toBe(false)
  expect(isWeakSet({})).toBe(false)
})

it('isSymbol', ({ expect }) => {
  expect(isSymbol(Symbol('test'))).toBe(true)
  expect(isSymbol({})).toBe(false)
})

it('isTypedArray', ({ expect }) => {
  expect(isTypedArray(new Int16Array())).toBe(true)
  expect(isTypedArray(new Int32Array())).toBe(true)
  expect(isTypedArray(new Uint8Array())).toBe(true)
  expect(isTypedArray(new Uint8ClampedArray())).toBe(true)
  expect(isTypedArray(new Uint16Array())).toBe(true)
  expect(isTypedArray(new Uint32Array())).toBe(true)
  expect(isTypedArray(new Float32Array())).toBe(true)
  expect(isTypedArray(new Float64Array())).toBe(true)
  expect(isTypedArray(1)).toBe(false)
  expect(isTypedArray([])).toBe(false)
})

it('isUndef', ({ expect }) => {
  expect(isUndef(undefined)).toBe(true)
  expect(isUndef(void 0)).toBe(true)
  expect(isUndef(null)).toBe(false)
})

it('isDataUrl', ({ expect }) => {
  expect(isDataUrl('data:,Hello%2C%20World!')).toBe(true)
  expect(isDataUrl('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')).toBe(true)
  expect(isDataUrl('test')).toBe(false)
  expect(isDataUrl(1 as any)).toBe(false)
})

it('isUrl', ({ expect }) => {
  expect(isUrl('http://www.example.com?foo=bar&param=test')).toBe(true)
  expect(isUrl('http://127.0.0.1')).toBe(true)
  expect(isUrl('http://localhost')).toBe(true)
  expect(isUrl('test')).toBe(false)
  expect(isUrl(1 as any)).toBe(false)
})

it('isEmail', ({ expect }) => {
  expect(isEmail('test@xxx.com')).toBe(true)
  expect(isEmail('test@')).toBe(false)
  expect(isEmail('test')).toBe(false)
  expect(isEmail(1 as any)).toBe(false)
})

it('isLeapYear', ({ expect }) => {
  expect(isLeapYear(2008)).toBe(true)
  expect(isLeapYear(2009)).toBe(false)
  expect(isLeapYear('2024' as any)).toBe(true)
  expect(isLeapYear('test' as any)).toBe(false)
})

it('isArrayLike', ({ expect }) => {
  expect(isArrayLike([1, 2, 3])).toBe(true)
  expect(isArrayLike('abc')).toBe(true)
  expect(isArrayLike({ length: 2, 0: '0', 1: '1' })).toBe(true)
  expect(isArrayLike(() => {})).toBe(false)
  expect(isArrayLike({})).toBe(false)
})

it('isDirectory', async ({ expect }) => {
  expect(await isDirectory(path.resolve())).toBe(true)
  expect(await isDirectory(path.join('is.test.ts'))).toBe(false)
  expect(await isDirectory(path.join('a/b/c'))).toBe(false)
  expect(await isDirectory(1 as any)).toBe(false)
})

it('isEmpty', ({ expect }) => {
  expect(isEmpty([])).toBe(true)
  expect(isEmpty({})).toBe(true)
  expect(isEmpty(null)).toBe(true)
  expect(isEmpty('')).toBe(true)
  expect(isEmpty([1])).toBe(false)
  expect(isEmpty({ a: 1 })).toBe(false)
  expect(isEmpty('test')).toBe(false)
})

it('isEqual', ({ expect }) => {
  expect(isEqual([1, [2, { a: 3 }]], [1, [2, { a: 3 }]])).toBe(true)
  expect(isEqual(1, 1)).toBe(true)
  expect(isEqual(1, '1')).toBe(false)
  expect(isEqual(1, [1])).toBe(false)
})

it('isInteger', ({ expect }) => {
  expect(isInteger(1)).toBe(true)
  expect(isInteger(1.2)).toBe(false)
  expect(isInteger({} as any)).toBe(false)
})

it('isEven', ({ expect }) => {
  expect(isEven(0)).toBe(true)
  expect(isEven(1)).toBe(false)
  expect(isEven(2.2)).toBe(false)
  expect(isEven(2)).toBe(true)
})

it('isOdd', ({ expect }) => {
  expect(isOdd(0)).toBe(false)
  expect(isOdd(1)).toBe(true)
  expect(isOdd(1.1)).toBe(false)
  expect(isOdd(2)).toBe(false)
})

it('isJSON', ({ expect }) => {
  expect(isJSON(`{"a": 1}`)).toBe(true)
  expect(isJSON(`[1,2,3]`)).toBe(true)
  expect(isJSON(`{a: 1}`)).toBe(false)
})

it('isSorted', ({ expect }) => {
  expect(isSorted([1, 2, 3])).toBe(true)
  expect(isSorted([3, 1, 3, 4, 2])).toBe(false)
  expect(isSorted([3, 2, 1], (a, b) => {
    return b - a
  })).toBe(true)
})
