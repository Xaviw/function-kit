import type { TryitReturn } from '../src/tryit'
import { expect, it } from 'vitest'
import { tryit } from '../src/tryit'

it('tryit', async () => {
  // 测试同步成功场景
  const [err1, result1] = tryit(JSON.parse)('{"name":"test"}') as TryitReturn<string>
  expect(err1).toBeUndefined()
  expect(result1).toEqual({ name: 'test' })

  // 测试同步失败场景
  const [err2, result2] = tryit(JSON.parse)('{invalid}') as TryitReturn<string>
  expect(err2).toBeInstanceOf(Error)
  expect(result2).toBeUndefined()

  // 测试异步成功场景
  const asyncFn = async (x: number) => x * 2
  const [err3, result3] = await tryit(asyncFn)(2)
  expect(err3).toBeUndefined()
  expect(result3).toBe(4)

  // 测试异步失败场景
  const asyncError = async () => {
    throw new Error('async error')
  }
  const [err4, result4] = await tryit(asyncError)()
  expect(err4).toBeInstanceOf(Error)
  expect(result4).toBeUndefined()
})
