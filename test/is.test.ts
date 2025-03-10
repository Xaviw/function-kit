import { expect, it } from 'vitest'
import { isArrayBuffer, isBlob, isBoolean, isDate, isError, isFunction, isGeneratorFunction, isMap, isNil, isNumber, isObject, isPrimitive, isPromise, isRegExp, isSet, isString, isSymbol, isTypedArray, isUndef, isWeakMap, isWeakSet } from '../src/is'

it('isArrayBuffer', () => {
  expect(isArrayBuffer(new ArrayBuffer(8))).toBe(true)
  expect(isArrayBuffer(new Int16Array())).toBe(false)
  expect(isArrayBuffer([])).toBe(false)
})

it('isBlob', () => {
  expect(isBlob(new Blob([]))).toBe(true)
  expect(isBlob([])).toBe(false)
})

it('isBoolean', () => {
  expect(isBoolean(true)).toBe(true)
  expect(isBoolean(false)).toBe(true)
  expect(isBoolean(1)).toBe(false)
})

it('isDate', () => {
  expect(isDate(new Date())).toBe(true)
  expect(isDate(Date.now())).toBe(false)
})

it('isError', () => {
  expect(isError(new Error('test'))).toBe(true)
  expect(isError(new DOMException('test'))).toBe(true)
  expect(isError({})).toBe(false)
})

it('isFunction', () => {
  expect(isFunction(() => { })).toBe(true)
  expect(isFunction(async () => { })).toBe(true)
  expect(isFunction(function* () { })).toBe(true)
  expect(isFunction(() => {
    return new Promise(() => {})
  })).toBe(true)
  expect(isFunction({})).toBe(false)
})

it('isGeneratorFunction', () => {
  expect(isGeneratorFunction(function* () { })).toBe(true)
  expect(isGeneratorFunction(() => { })).toBe(false)
  expect(isGeneratorFunction(async () => { })).toBe(false)
  expect(isGeneratorFunction({})).toBe(false)
})

it('isMap', () => {
  expect(isMap(new Map())).toBe(true)
  expect(isMap(new Set())).toBe(false)
  expect(isMap(new WeakMap())).toBe(false)
  expect(isMap({})).toBe(false)
})

it('isNil', () => {
  expect(isNil(null)).toBe(true)
  expect(isNil(undefined)).toBe(true)
  expect(isNil(void 0)).toBe(true)
  expect(isNil(0)).toBe(false)
  expect(isNil('')).toBe(false)
  expect(isNil([])).toBe(false)
})

it('isNumber', () => {
  expect(isNumber(1)).toBe(true)
  expect(isNumber('')).toBe(false)
  expect(isNumber(null)).toBe(false)
})

it('isObject', () => {
  expect(isObject({})).toBe(true)
  expect(isObject([])).toBe(true)
  expect(isObject(() => { })).toBe(true)
  expect(isObject(/x/)).toBe(true)
  expect(isObject(1)).toBe(false)
  expect(isObject('')).toBe(false)
})

it('isPrimitive', () => {
  expect(isPrimitive(1)).toBe(true)
  expect(isPrimitive('1')).toBe(true)
  expect(isPrimitive(true)).toBe(true)
  expect(isPrimitive({})).toBe(false)
})

it('isPromise', () => {
  expect(isPromise((async () => { })())).toBe(true)
  expect(isPromise(Promise.resolve())).toBe(true)
  expect(isPromise(new Promise(() => { }))).toBe(true)
  expect(isPromise(() => { })).toBe(false)
})

it('isRegExp', () => {
  expect(isRegExp(/a/)).toBe(true)
  // eslint-disable-next-line prefer-regex-literals
  expect(isRegExp(new RegExp('a'))).toBe(true)
  expect(isRegExp(1)).toBe(false)
})

it('isSet', () => {
  expect(isSet(new Set())).toBe(true)
  expect(isSet(new Map())).toBe(false)
  expect(isSet(new WeakSet())).toBe(false)
  expect(isSet({})).toBe(false)
})

it('isString', () => {
  expect(isString('')).toBe(true)
  expect(isString(null)).toBe(false)
  expect(isString(1)).toBe(false)
})

it('isSymbol', () => {
  expect(isSymbol(Symbol('test'))).toBe(true)
  expect(isSymbol({})).toBe(false)
})

it('isTypedArray', () => {
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

it('isUndef', () => {
  expect(isUndef(undefined)).toBe(true)
  expect(isUndef(void 0)).toBe(true)
  expect(isUndef(null)).toBe(false)
})

it('isWeakMap', () => {
  expect(isWeakMap(new WeakMap())).toBe(true)
  expect(isWeakMap(new Map())).toBe(false)
  expect(isWeakMap({})).toBe(false)
})

it('isWeakSet', () => {
  expect(isWeakSet(new WeakSet())).toBe(true)
  expect(isWeakSet(new Set())).toBe(false)
  expect(isWeakSet({})).toBe(false)
})
