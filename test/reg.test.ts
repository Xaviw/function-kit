import { expect, it } from 'vitest'
import { isDataUrl, isEmail, isUrl } from '../src/reg'

it('isDataUrl', () => {
  expect(isDataUrl('data:,Hello%2C%20World!')).toBe(true)
  expect(isDataUrl('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')).toBe(true)
  expect(isDataUrl('test')).toBe(false)
  expect(isDataUrl(1 as any)).toBe(false)
})

it('isUrl', () => {
  expect(isUrl('http://www.example.com?foo=bar&param=test')).toBe(true)
  expect(isUrl('http://127.0.0.1')).toBe(true)
  expect(isUrl('http://localhost')).toBe(true)
  expect(isUrl('test')).toBe(false)
  expect(isUrl(1 as any)).toBe(false)
})

it('isEmail', () => {
  expect(isEmail('test@xxx.com')).toBe(true)
  expect(isEmail('test@')).toBe(false)
  expect(isEmail('test')).toBe(false)
  expect(isEmail(1 as any)).toBe(false)
})
