import type { Key } from '../types/common'

/**
 * 简单 LRU (Least Recently Used) 缓存实现
 * @example
 * ```ts
 * const cache = new Lru(2)
 * cache.set('a', 1)
 * cache.set('b', 2)
 * cache.get('a') // 1
 * cache.set('c', 3) // 'b' 会被删除
 * ```
 */
export class Lru {
  private max: number
  private cache = new Map<Key, any>()

  /**
   * 创建一个新的 LRU 缓存实例
   * @param max - 缓存的最大容量，默认为 Infinity
   */
  constructor(max?: number) {
    this.max = Number.parseInt(max as any) || Infinity
  }

  /**
   * 检查缓存中是否存在指定的键
   * @param key - 要检查的键
   * @returns 如果键存在则返回 true，否则返回 false
   */
  has(key: Key): boolean {
    return this.cache.has(key)
  }

  /**
   * 从缓存中移除指定的键值对
   * @param key - 要移除的键
   */
  remove(key: Key): void {
    if (this.has(key))
      this.cache.delete(key)
  }

  /**
   * 获取缓存中指定键的值，并将其移到最近使用的位置
   * @param key - 要获取的键
   * @returns 键对应的值，如果键不存在则返回 null
   */
  get(key: Key): any {
    if (!this.has(key))
      return null

    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }

  /**
   * 设置缓存中的键值对，如果缓存已满则移除最久未使用的项
   * @param key - 要设置的键
   * @param value - 要设置的值
   */
  set(key: Key, value: any): void {
    if (this.has(key)) {
      this.cache.delete(key)
    }
    else if (this.cache.size >= this.max) {
      const firstKey = this.cache.keys().next().value
      firstKey && this.cache.delete(firstKey)
    }

    this.cache.set(key, value)
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear()
  }
}
