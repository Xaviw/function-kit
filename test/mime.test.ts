import { expect, it } from 'vitest'
import { getExtensionsFromMime, getMimeFromExtension } from '../src/mime'

it('mime', () => {
  expect(getMimeFromExtension('jpg')).toBe('image/jpeg')

  expect((getMimeFromExtension as any)()).toBe(undefined)

  expect(getExtensionsFromMime('image/jpeg')).toEqual(['jpeg', 'jpg'])

  expect((getExtensionsFromMime as any)()).toBe(undefined)
})
