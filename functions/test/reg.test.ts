import { expect, it } from 'vitest'
import { isBase64, isChinese, isChineseName, isDataUrl, isEmail, isIDCard, isIPV4, isMacAddress, isPath, isPhone, isPostalCode, isTelphone, isUrl, isVehiclePlate } from '../src/reg'

it('isPath', () => {
  expect(isPath('/a/b/c')).toBe(true)
  expect(isPath('./a/b/c')).toBe(true)
  expect(isPath('../a/b/c')).toBe(true)
  expect(isPath('../../a/b/c')).toBe(true)
  expect(isPath('C:\\a\\b')).toBe(false)
  expect(isPath(1 as any)).toBe(false)
})

it('isDataUrl', () => {
  expect(isDataUrl('data:,Hello%2C%20World!')).toBe(true)
  expect(isDataUrl('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')).toBe(true)
  expect(isDataUrl('test')).toBe(false)
  expect(isDataUrl(1 as any)).toBe(false)
})

it('isBase64', () => {
  expect(isBase64('data:image/gif;base64,xxxx==')).toBe(true)
  expect(isBase64(1 as any)).toBe(false)
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

it('isChineseName', () => {
  expect(isChineseName('张三·李四')).toBe(true)
  expect(isChineseName('test')).toBe(false)
  expect(isChineseName(1 as any)).toBe(false)
})

it('isVehiclePlate', () => {
  expect(isVehiclePlate('川A88888')).toBe(true)
  expect(isVehiclePlate('川A888888')).toBe(true)
  expect(isVehiclePlate('测A88888')).toBe(false)
  expect(isVehiclePlate(1 as any)).toBe(false)
})

it('isPhone', () => {
  expect(isPhone('+8613111111111')).toBe(true)
  expect(isPhone('13111111111')).toBe(true)
  expect(isPhone('12111111111')).toBe(false)
  expect(isPhone(1 as any)).toBe(false)
})

it('isTelphone', () => {
  expect(isTelphone('0341-86091234')).toBe(true)
  expect(isTelphone('13211111111')).toBe(false)
  expect(isTelphone(1 as any)).toBe(false)
})

it('isIDCard', () => {
  expect(isIDCard('511111199901011234')).toBe(true)
  expect(isIDCard('12345619991205131x')).toBe(true)
  expect(isIDCard('111111111111111111')).toBe(false)
  expect(isIDCard(1 as any)).toBe(false)
})

it('isChinese', () => {
  expect(isChinese('中文')).toBe(true)
  expect(isChinese('test')).toBe(false)
  expect(isChinese(1 as any)).toBe(false)
})

it('isIPV4', () => {
  expect(isIPV4('192.168.1.1')).toBe(true)
  expect(isIPV4('172.16.0.0:8080')).toBe(true)
  expect(isIPV4('test')).toBe(false)
  expect(isIPV4(1 as any)).toBe(false)
})

it('isMacAddress', () => {
  expect(isMacAddress('38:f9:d3:4b:f5:51')).toBe(true)
  expect(isMacAddress('test')).toBe(false)
  expect(isMacAddress(1 as any)).toBe(false)
})

it('isPostalCode', () => {
  expect(isPostalCode('100101')).toBe(true)
  expect(isPostalCode('test')).toBe(false)
  expect(isPostalCode(1 as any)).toBe(false)
})
