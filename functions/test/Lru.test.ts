import { expect, it } from 'vitest'
import { Lru } from '../src/Lru'

it('lru', () => {
  const lru = new Lru(2)

  // 测试 set 和 get
  lru.set('a', 1)
  lru.set('b', 2)
  lru.set('a', 11)
  lru.set('c', 3)
  expect(lru.get('b')).toBeNull() // b 应该被删除
  expect(lru.get('c')).toBe(3)
  expect(lru.get('a')).toBe(11)

  // 测试 has
  expect(lru.has('a')).toBe(true)
  expect(lru.has('b')).toBe(false)

  // 测试 remove
  lru.remove('a')
  expect(lru.has('a')).toBe(false)
  lru.remove('notexist') // 删除不存在的键不会报错

  // 测试 clear
  lru.clear()
  expect(lru.has('c')).toBe(false)
})
