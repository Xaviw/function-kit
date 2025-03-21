import type { Fn } from '../types/common'
import { expect, it } from 'vitest'
import { isOdd } from '../src/math'
import { wxPromisify } from '../src/wxPromisify'

it('wxPromisify', async () => {
  interface Options {
    value: number
    success?: Fn<any[], { value: number }>
    fail?: Fn<any[], { value: number }>
  }

  function isOddCallbackify({ value, success, fail }: Options): void {
    isOdd(value) ? success?.({ value }) : fail?.({ value })
  }

  await expect(wxPromisify(isOddCallbackify, { value: 1 })).resolves.toEqual({ value: 1 })

  await expect(wxPromisify(isOddCallbackify, { value: 2 })).rejects.toEqual({ value: 2 })
})
