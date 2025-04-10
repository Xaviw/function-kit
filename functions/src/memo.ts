import type { Fn, Key } from '../types/common'
import { isFunction, isPromise } from './is'
import { Lru } from './Lru'

/**
 * memo 函数配置选项
 */
export interface MemoOptions<Args extends any[]> {
  /** 调用传参映射到缓存 key 的方法，默认 JSON.stringify(argumentsArray) */
  key?: Fn<Args, Key>
  /** 缓存有效时长，单位毫秒，默认永不过期 */
  expires?: number
  /** 使用 LRU 缓存算法，最多缓存多少个 key，默认不限制 */
  lruMax?: number
}

/**
 * 创建一个带有缓存功能的记忆化函数
 * @param fn - 需要被记忆化的原函数
 * @param options - 记忆化配置选项
 * @returns  返回一个带有缓存功能的新函数
 * @example
 * // 基本用法
 * const cachedFn = memo(expensiveFunction);
 *
 * // 使用自定义缓存键生成函数
 * const cachedFn = memo(userFetch, {
 *   key: (userId) => `user-${userId}`,
 *   expires: 60000 // 1分钟过期
 * });
 *
 * // 使用LRU缓存限制最大缓存数量
 * const cachedFn = memo(heavyComputation, {
 *   lruMax: 100
 * });
 */
export function memo<Args extends any[], R>(fn: Fn<Args, R>, options?: MemoOptions<Args>): Fn<Args, R> {
  /**
   * 记忆化后的函数
   * @param {...Args} args - 传递给原函数的参数
   * @returns {R} 原函数的返回值，可能来自缓存
   */
  function memoize(...args: Args): R {
    const key = isFunction(options?.key) ? options.key(...args) : JSON.stringify(args)

    const existing = memoize.cache.get(key)
    if (existing && (!existing.expires || existing.expires > Date.now())) {
      return existing.value
    }

    let result = fn(...args)
    if (isPromise(result)) {
      result = result.catch((err) => {
        memoize.cache.remove(key)
        throw err
      }) as R
    }

    const expires = Number.parseInt(options?.expires as any) || null

    memoize.cache.set(key, {
      value: result,
      expires: expires ? Date.now() + expires : null,
    })

    return result
  }

  /**
   * 缓存存储对象
   * @type {Lru}
   */
  memoize.cache = new Lru(options?.lruMax)

  return memoize
}
