/* eslint-disable no-self-compare */
import { isFunction } from './is'
import { objectToString } from './objectToString'

/**
 * 深度比较两个值是否相等(支持 Map、Set)
 */
export function isEqual(a: any, b: any): boolean {
  return eq(a, b)
}

function eq(a: any, b: any, aStack?: any[], bStack?: any[]): boolean {
  // 严格相等成立时还需要区分 0 和 -0
  if (a === b)
    return a !== 0 || 1 / a === 1 / b

  // null、undefined
  if (a == null || b == null)
    return a === b

  // NaN
  if (a !== a)
    return b !== b

  // 其他简单值
  const type = typeof a
  if (type !== 'function' && type !== 'object' && typeof b !== 'object')
    return false

  return deepEq(a, b, aStack, bStack)
}

function deepEq(a: any, b: any, aStack?: any[], bStack?: any[]): boolean {
  // 对象值类型判断
  const className = objectToString(a)
  if (className !== objectToString(b))
    return false

  switch (className) {
    // 文本对象转字符串比较
    case '[object RegExp]':
    case '[object String]':
      return `${a}` === `${b}`
    // 数字对象比较
    case '[object Number]':
      // NaN
      if (+a !== +a)
        return +b !== +b
      // 0、-0
      return +a === 0 ? 1 / +a === 1 / b : +a === +b
    // 日期、布尔对象转数字比较
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b
    // Map 对象比较
    case '[object Map]':
      if (a.size !== b.size)
        return false
      for (const [key, value] of a.entries()) {
        if (!b.has(key) || !eq(value, b.get(key), aStack, bStack))
          return false
      }
      return true
    // Set 对象比较
    case '[object Set]':
      if (a.size !== b.size)
        return false
      for (const value of a.values()) {
        if (!b.has(value))
          return false
      }
      return true
  }

  const areArrays = className === '[object Array]'

  if (!areArrays) {
    // 函数直接判断为不相等
    if (typeof a != 'object' || typeof b != 'object')
      return false

    // 不同的构造函数创建的对象，直接判断为不相等
    const aCtor = a.constructor
    const bCtor = b.constructor
    if (
      // 构造函数不同
      aCtor !== bCtor
      // 均是构造函数创建
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

  // 处理循环引用
  aStack = aStack || []
  bStack = bStack || []
  let length = aStack.length
  while (length--) {
    if (aStack[length] === a)
      return bStack[length] === b
  }

  aStack.push(a)
  bStack.push(b)

  // 数组
  if (areArrays) {
    // 比较长度
    length = a.length
    if (length !== b.length)
      return false

    // 深度比较每一项
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack))
        return false
    }
  }
  // 其他对象
  else {
    const _keys = Object.keys(a)
    let key
    // 比较键数量
    length = _keys.length
    if (Object.keys(b).length !== length)
      return false
    // 深度比较每一个值
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
