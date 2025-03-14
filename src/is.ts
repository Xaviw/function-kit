import type { Fn, Recordable } from '../types/common'
import { objectToString } from './objectToString'

/**
 * 判断值是否为数组
 * @param val - 要检查的值
 * @returns 如果值是数组，则返回 true，否则返回 false
 * @example
 * ```ts
 * isArray([1, 2, 3]) // true
 * isArray('hello') // false
 * ```
 */
export function isArray(val: unknown): val is any[] {
  if (Array.isArray as any)
    return Array.isArray(val)

  return objectToString(val) === '[object Array]'
}

/**
 * 判断值是否为 ArrayBuffer
 * @param val - 要检查的值
 * @returns 如果值是 ArrayBuffer，则返回 true，否则返回 false
 * @example
 * ```ts
 * isArrayBuffer(new ArrayBuffer(10)) // true
 * isArrayBuffer([]) // false
 * ```
 */
export function isArrayBuffer(val: unknown): val is ArrayBuffer {
  return objectToString(val) === '[object ArrayBuffer]'
}

/**
 * 判断值是否为 Blob
 * @param val - 要检查的值
 * @returns 如果值是 Blob，则返回 true，否则返回 false
 * @example
 * ```ts
 * isBlob(new Blob()) // true
 * isBlob({}) // false
 * ```
 */
export function isBlob(val: unknown): val is Blob {
  return objectToString(val) === '[object Blob]'
}

/**
 * 判断值是否为布尔值
 * @param val - 要检查的值
 * @returns 如果值是布尔值，则返回 true，否则返回 false
 * @example
 * ```ts
 * isBoolean(true) // true
 * isBoolean(0) // false
 * ```
 */
export function isBoolean(val: unknown): val is boolean {
  return val === true || val === false
}

/**
 * 判断值是否为日期对象
 * @param val - 要检查的值
 * @returns 如果值是日期对象，则返回 true，否则返回 false
 * @example
 * ```ts
 * isDate(new Date()) // true
 * isDate('2021-01-01') // false
 * ```
 */
export function isDate(val: unknown): val is Date {
  return objectToString(val) === '[object Date]'
}

/**
 * 判断值是否为错误对象
 * @param val - 要检查的值
 * @returns 如果值是错误对象，则返回 true，否则返回 false
 * @example
 * ```ts
 * isError(new Error()) // true
 * isError('error') // false
 * ```
 */
export function isError(val: unknown): val is Error {
  switch (objectToString(val)) {
    case '[object Error]':
    case '[object DOMException]':
      return true
    default:
      return val instanceof Error
  }
}

/**
 * 判断值是否为函数
 * @param val - 要检查的值
 * @returns 如果值是函数，则返回 true，否则返回 false
 * @example
 * ```ts
 * isFunction(() => {}) // true
 * isFunction(123) // false
 * ```
 */
export function isFunction(val: unknown): val is Fn {
  return ['[object Function]', '[object GeneratorFunction]', '[object AsyncFunction]'].includes(objectToString(val))
}

/**
 * 判断值是否为生成器函数
 * @param val - 要检查的值
 * @returns 如果值是生成器函数，则返回 true，否则返回 false
 * @example
 * ```ts
 * isGeneratorFunction(function* () { }) // true
 * isGeneratorFunction(123) // false
 * ```
 */
export function isGeneratorFunction(val: unknown): val is GeneratorFunction {
  return objectToString(val) === '[object GeneratorFunction]'
}

/**
 * 判断值是否为 Map
 * @param val - 要检查的值
 * @returns 如果值是 Map，则返回 true，否则返回 false
 * @example
 * ```ts
 * isMap(new Map()) // true
 * isMap({}) // false
 * ```
 */
export function isMap(val: unknown): val is Map<any, any> {
  return objectToString(val) === '[object Map]'
}
/**
 * 判断值是否为 null 或者 undefined（void 0）
 * @param val - 要检查的值
 * @returns 如果值是null 或者 undefined（void 0），则返回 true，否则返回 false
 * @example
 * ```ts
 * isNil(null) // true
 * isNil(123) // false
 * ```
 */
export function isNil(val: unknown): val is null | undefined {
  return val == null
}

/**
 * 判断值是否为数字
 * @param val - 要检查的值
 * @returns 如果值是数字，则返回 true，否则返回 false
 * @example
 * ```ts
 * isNumber(123) // true
 * isNumber('123') // false
 * ```
 */
export function isNumber(val: unknown): val is number {
  return objectToString(val) === '[object Number]'
}

/**
 * 判断值是否为对象（包括函数）
 * @param val - 要检查的值
 * @returns 如果值是对象，则返回 true，否则返回 false
 * @example
 * ```ts
 * isObject({}) // true
 * isObject(null) // false
 * ```
 */
export function isObject(val: unknown): val is Recordable {
  const type = typeof val

  return !!val && (type === 'function' || type === 'object')
}
/**
 * 判断值是否为原始类型值
 * @param val - 要检查的值
 * @returns 如果值是原始类型值，则返回 true，否则返回 false
 * @example
 * ```ts
 * isPrimitive(1) // true
 * isPrimitive({}) // false
 * ```
 */
export function isPrimitive(val: unknown): val is null | undefined | string | number | boolean | symbol {
  const type = typeof val

  return val == null || (type !== 'function' && type !== 'object')
}

/**
 * 判断值是否为 Promise 对象
 * @param val - 要检查的值
 * @returns 如果值是 Promise 对象，则返回 true，否则返回 false
 * @example
 * ```ts
 * isPromise(Promise.resolve()) // true
 * isPromise({}) // false
 * ```
 */
export function isPromise(val: unknown): val is Promise<any> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 判断值是否为正则表达式对象
 * @param val - 要检查的值
 * @returns 如果值是正则表达式对象，则返回 true，否则返回 false
 * @example
 * ```ts
 * isRegExp(/a/i) // true
 * isRegExp({}) // false
 * ```
 */
export function isRegExp(val: unknown): val is RegExp {
  return objectToString(val) === '[object RegExp]'
}

/**
 * 判断值是否为 Set 对象
 * @param val - 要检查的值
 * @returns 如果值是 Set 对象，则返回 true，否则返回 false
 * @example
 * ```ts
 * isSet(new Set()) // true
 * isSet({}) // false
 * ```
 */
export function isSet(val: unknown): val is Set<any> {
  return objectToString(val) === '[object Set]'
}

/**
 * 判断值是否为字符串
 * @param val - 要检查的值
 * @returns 如果值是字符串，则返回 true，否则返回 false
 * @example
 * ```ts
 * isString('hello') // true
 * isString(123) // false
 * ```
 */
export function isString(val: unknown): val is string {
  return objectToString(val) === '[object String]'
}

/**
 * 判断值是否为 Symbol
 * @param val - 要检查的值
 * @returns 如果值是 Symbol，则返回 true，否则返回 false
 * @example
 * ```ts
 * isSymbol(Symbol('foo')) // true
 * isSymbol('foo') // false
 * ```
 */
export function isSymbol(val: unknown): val is symbol {
  return typeof val === 'symbol'
}

/**
 * 判断值是否为 typedArray
 * @param val - 要检查的值
 * @returns 如果值是 typedArray，则返回 true，否则返回 false
 * @example
 * ```ts
 * isTypedArray(new Int16Array()) // true
 * isTypedArray([]) // false
 * ```
 */
export function isTypedArray(val: unknown): val is Int8Array | Int16Array | Int32Array | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Float32Array | Float64Array {
  const map = [
    '[object Int8Array]',
    '[object Int16Array]',
    '[object Int32Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Uint16Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]',
  ]
  return map.includes(objectToString(val))
}

/**
 * 判断值是否为 undefined（void 0）
 * @param val - 要检查的值
 * @returns 如果值是 undefined（void 0），则返回 true，否则返回 false
 * @example
 * ```ts
 * isUndef(undefined) // true
 * isUndef(null) // false
 * ```
 */
export function isUndef(val: unknown): val is undefined {
  return val === void 0
}

/**
 * 判断值是否为 WeakMap
 * @param val - 要检查的值
 * @returns 如果值是 WeakMap，则返回 true，否则返回 false
 * @example
 * ```ts
 * isWeakMap(new WeakMap()) // true
 * isWeakMap({}) // false
 * ```
 */
export function isWeakMap(val: unknown): val is WeakMap<any, any> {
  return objectToString(val) === '[object WeakMap]'
}

/**
 * 判断值是否为 WeakSet
 * @param val - 要检查的值
 * @returns 如果值是 WeakSet，则返回 true，否则返回 false
 * @example
 * ```ts
 * isWeakSet(new WeakSet()) // true
 * isWeakSet({}) // false
 * ```
 */
export function isWeakSet(val: unknown): val is WeakSet<any> {
  return objectToString(val) === '[object WeakSet]'
}
