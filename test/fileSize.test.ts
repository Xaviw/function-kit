import { expect, it } from 'vitest'
import { fileSize } from '../src/fileSize'

it('fileSize', () => {
  expect((fileSize as any)()).toBe(undefined)

  expect(fileSize(-1)).toBe('0b')

  expect(fileSize(1023)).toBe('1023b')

  expect(fileSize(1500)).toBe('1.46K')

  expect(fileSize(1500000)).toBe('1.43M')

  expect(fileSize(1500000000)).toBe('1.4G')

  expect(fileSize(1500000000000)).toBe('1.36T')
})
