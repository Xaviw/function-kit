import type { AsyncFn, Fn, Recordable } from '../types/common'
import { stat } from 'node:fs/promises'
import { objectToString } from './objectToString'

// ------------------------------- 类型判断 -------------------------------
export function isArrayBuffer(val: unknown): val is ArrayBuffer {
  return objectToString(val) === '[object ArrayBuffer]'
}

export function isAsyncFunction(val: unknown): val is AsyncFn {
  return objectToString(val) === '[object AsyncFunction]'
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

/**
 * @web
 */
export function isFile(val: unknown): val is File {
  return objectToString(val) === '[object File]'
}

export function isString(val: unknown): val is string {
  return objectToString(val) === '[object String]'
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

/**
 * 判断参数是否是 null 或 undefined（void 0）
 */
export function isNil(val: unknown): val is null | undefined {
  return val == null
}

/**
 * 判断参数是否是简单类型
 */
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

export function isMap(val: unknown): val is Map<any, any> {
  return objectToString(val) === '[object Map]'
}

export function isSet(val: unknown): val is Set<any> {
  return objectToString(val) === '[object Set]'
}

export function isWeakMap(val: unknown): val is WeakMap<any, any> {
  return objectToString(val) === '[object WeakMap]'
}

export function isWeakSet(val: unknown): val is WeakSet<any> {
  return objectToString(val) === '[object WeakSet]'
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

// ------------------------------- 其他判断 -------------------------------

/**
 * 判断参数是否是合法的 data url
 */
export function isDataUrl(str: string): boolean {
  if (!isString(str))
    return false

  // https://tools.ietf.org/html/rfc2397
  const regDataUrl = /^data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z0-9-.!#$%*+{}|~`]+=[a-z0-9-.!#$%*+{}|~`]+)*)?(?:;base64)?,[\w!$&',()*+;=\-.~:@/?%\s]*$/i
  return regDataUrl.test(str.trim())
}

/**
 * 支持 localhost
 */
export function isUrl(str: string): boolean {
  if (!isString(str))
    return false

  const regUrl = /^(?:\w+:)?\/\/(?:[^\s.]+\.\S{2}|localhost)\S*$/
  return regUrl.test(str)
}

export function isEmail(str: string): boolean {
  if (!isString(str))
    return false

  return /.[^\n\r@\u2028\u2029]*@.+\..+/.test(str)
}

/**
 * 判断传入的年份是否是闰年
 */
export function isLeapYear(year: number): boolean {
  year = Number.parseInt(year as unknown as string)

  if (Number.isNaN(year))
    return false

  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}

/**
 * 判断参数是否是“类数组”
 */
export function isArrayLike(val: unknown): val is ArrayLike<any> {
  if (!val)
    return false

  const len = (val as any).length

  return isNumber(len) && len >= 0 && len % 1 === 0 && len <= Number.MAX_SAFE_INTEGER && !isFunction(val)
}

/**
 * 检查路径是否是文件夹
 * @node
 */
export async function isDirectory(path: string): Promise<boolean> {
  if (!isString(path))
    return false

  try {
    const stats = await stat(path)
    return stats.isDirectory()
  }
  catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT')
      return false
    return Promise.reject(err)
  }
}

/**
 * 判断参数是否为空（对象、类数组、字符串、null、undefined）
 */
export function isEmpty(val: unknown): boolean {
  if (val == null)
    return true

  if (isArrayLike(val) && (Array.isArray(val) || isString(val) || objectToString(val) === '[object Arguments]')) {
    return val.length === 0
  }

  return Object.keys(val).length === 0
}

/**
 * 深度比较两个值是否相等
 */
export function isEqual(a: any, b: any): boolean {
  return eq(a, b)
}
function eq(a: any, b: any, aStack?: any[], bStack?: any[]): boolean {
  // 区分 0 和 -0
  if (a === b)
    return a !== 0 || 1 / a === 1 / b
  if (a == null || b == null)
    return a === b
  // 处理 NaN
  // eslint-disable-next-line no-self-compare
  if (a !== a)
    // eslint-disable-next-line no-self-compare
    return b !== b
  const type = typeof a
  if (type !== 'function' && type !== 'object' && typeof b != 'object')
    return false

  return deepEq(a, b, aStack, bStack)
}
function deepEq(a: any, b: any, aStack?: any[], bStack?: any[]): boolean {
  const className = toString.call(a)
  if (className !== toString.call(b))
    return false

  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return `${a}` === `${b}`
    case '[object Number]':
      // eslint-disable-next-line no-self-compare
      if (+a !== +a)
        // eslint-disable-next-line no-self-compare
        return +b !== +b
      return +a === 0 ? 1 / +a === 1 / b : +a === +b
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b
  }

  const areArrays = className === '[object Array]'
  if (!areArrays) {
    if (typeof a != 'object' || typeof b != 'object')
      return false

    const aCtor = a.constructor
    const bCtor = b.constructor
    if (
      aCtor !== bCtor
      && !(
        isFunction(aCtor)
        && aCtor instanceof aCtor
        && isFunction(bCtor)
        && bCtor instanceof bCtor
      )
      && 'constructor' in a
      && 'constructor' in b
    ) {
      return false
    }
  }
  aStack = aStack || []
  bStack = bStack || []
  let length = aStack.length
  while (length--) {
    if (aStack[length] === a)
      return bStack[length] === b
  }

  aStack.push(a)
  bStack.push(b)

  if (areArrays) {
    length = a.length
    if (length !== b.length)
      return false
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack))
        return false
    }
  }
  else {
    const _keys = Object.keys(a)
    let key
    length = _keys.length
    if (Object.keys(b).length !== length)
      return false
    while (length--) {
      key = _keys[length]
      if (!(Object.prototype.hasOwnProperty.call(b, key) && eq(a[key], b[key], aStack, bStack)))
        return false
    }
  }
  aStack.pop()
  bStack.pop()

  return true
}

export function isInteger(val: number): boolean {
  return isNumber(val) && val % 1 === 0
}

/**
 * 判断数值是否是偶数
 */
export function isEven(val: number): boolean {
  if (!isInteger(val))
    return false
  return val % 2 === 0
}

/**
 * 判断数值是否是奇数
 */
export function isOdd(val: number): boolean {
  if (!isInteger(val))
    return false
  return val % 2 !== 0
}

/**
 * 判断字符串是否是合法的 JSON 格式字符串
 */
export function isJSON(val: string): boolean {
  try {
    JSON.parse(val)
    return true
  }
  catch {
    return false
  }
}

/**
 * 判断数组是否是有序的
 * @param arr 需要检查的数组
 * @param cmp 比较函数，默认使用 isSorted.defaultComparator（升序）
 */
export function isSorted<T>(arr: T[], cmp: (a: T, b: T) => number = isSorted.defaultComparator): boolean {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    if (cmp(arr[i], arr[i + 1]) > 0)
      return false
  }

  return true
}

/**
 * 升序比较函数
 */
isSorted.defaultComparator = function (a: any, b: any): number {
  if (a < b)
    return -1
  if (a > b)
    return 1
  return 0
}
