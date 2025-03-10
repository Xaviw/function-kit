import type { Fn, Recordable } from '../types/common'
import { objectToString } from './objectToString'

export function isArrayBuffer(val: unknown): val is ArrayBuffer {
  return objectToString(val) === '[object ArrayBuffer]'
}

export function isBlob(val: unknown): val is Blob {
  return objectToString(val) === '[object Blob]'
}

export function isBoolean(val: unknown): val is boolean {
  return val === true || val === false
}

export function isDate(val: unknown): val is Date {
  return objectToString(val) === '[object Date]'
}

export function isError(val: unknown): val is Error {
  switch (objectToString(val)) {
    case '[object Error]':
    case '[object DOMException]':
      return true
    default:
      return val instanceof Error
  }
}

export function isFunction(val: unknown): val is Fn {
  return ['[object Function]', '[object GeneratorFunction]', '[object AsyncFunction]'].includes(objectToString(val))
}

export function isGeneratorFunction(val: unknown): val is GeneratorFunction {
  return objectToString(val) === '[object GeneratorFunction]'
}

export function isMap(val: unknown): val is Map<any, any> {
  return objectToString(val) === '[object Map]'
}

export function isNil(val: unknown): val is null | undefined {
  return val == null
}

export function isNumber(val: unknown): val is number {
  return objectToString(val) === '[object Number]'
}

/**
 * 判断参数是否是对象（包括函数）
 */
export function isObject(val: unknown): val is Recordable {
  const type = typeof val

  return !!val && (type === 'function' || type === 'object')
}

export function isPrimitive(val: unknown): val is null | undefined | string | number | boolean | symbol {
  const type = typeof val

  return val == null || (type !== 'function' && type !== 'object')
}

export function isPromise(val: unknown): val is Promise<any> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isRegExp(val: unknown): val is RegExp {
  return objectToString(val) === '[object RegExp]'
}

export function isSet(val: unknown): val is Set<any> {
  return objectToString(val) === '[object Set]'
}

export function isString(val: unknown): val is string {
  return objectToString(val) === '[object String]'
}

export function isSymbol(val: unknown): val is symbol {
  return typeof val === 'symbol'
}

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

export function isUndef(val: unknown): val is undefined {
  return val === void 0
}

export function isWeakMap(val: unknown): val is WeakMap<any, any> {
  return objectToString(val) === '[object WeakMap]'
}

export function isWeakSet(val: unknown): val is WeakSet<any> {
  return objectToString(val) === '[object WeakSet]'
}
