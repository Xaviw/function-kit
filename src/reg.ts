import { isString } from './is'

/**
 * 判断参数是否是合法的 data url
 */
export function isDataUrl(str: string): boolean {
  if (!isString(str))
    return false

  // https://tools.ietf.org/html/rfc2397
  const regDataUrl = /^data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z0-9-.!#$%*+{}|~`]+=[a-z0-9-.!#$%*+{}|~`]+)*)?(?:;base64)?,[\w!$&',()*+;=\-.~:@/?%\s]*$/i
  return regDataUrl.test(str.trim())
}

/**
 * 支持 localhost
 */
export function isUrl(str: string): boolean {
  if (!isString(str))
    return false

  const regUrl = /^(?:\w+:)?\/\/(?:[^\s.]+\.\S{2}|localhost)\S*$/
  return regUrl.test(str)
}

export function isEmail(str: string): boolean {
  if (!isString(str))
    return false

  return /.[^\n\r@\u2028\u2029]*@.+\..+/.test(str)
}
