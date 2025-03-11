import { isString } from './is'

export function isDataUrl(str: string): boolean {
  if (!isString(str))
    return false

  // https://tools.ietf.org/html/rfc2397
  return /^data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z0-9-.!#$%*+{}|~`]+=[a-z0-9-.!#$%*+{}|~`]+)*)?(?:;base64)?,[\w!$&',()*+;=\-.~:@/?%\s]*$/i.test(str.trim())
}

export function isBase64(str: string): boolean {
  if (!isString(str))
    return false

  return /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,[\w!$&',()*+;=\-.~:@/?%\s]*$/i.test(str.trim())
}

/**
 * 支持 localhost
 */
export function isUrl(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:\w+:)?\/\/(?:[^\s.]+\.\S{2}|localhost)\S*$/.test(str)
}

export function isEmail(str: string): boolean {
  if (!isString(str))
    return false

  return /.[^\n\r@\u2028\u2029]*@.+\..+/.test(str)
}

/**
 * 中文姓名，支持 “·” 分隔
 */
export function isChineseName(str: string): boolean {
  if (!isString(str))
    return false

  return /^[\u4E00-\u9FA5·]{2,16}$/.test(str)
}

/**
 * 车牌号(新能源+非新能源)
 */
export function isVehiclePlate(str: string): boolean {
  if (!isString(str))
    return false

  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/.test(str)
}

/**
 * 手机号（严谨）
 */
export function isPhone(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:(?:\+|00)86)?1(?:3\d|4[5-79]|5[0-35-9]|6[5-7]|7[0-8]|8\d|9[0125-9])\d{8}$/.test(str)
}

/**
 * 座机号
 */
export function isTelphone(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:(?:\d{3}-)?\d{8}|(?:\d{4}-)?\d{7,8})(?:-\d+)?$/.test(str)
}

/**
 * 身份证号（2代，18位）
 */
export function isIDCard(str: string): boolean {
  if (!isString(str))
    return false

  return /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[12]\d|30|31)\d{3}[\dX]$/i.test(str)
}

/**
 * 中文
 */
export function isChinese(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/.test(str)
}

/**
 * ip-v4[:端口]
 */
export function isIPV4(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/.test(str)
}

export function isMacAddress(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:[a-f0-9][0,2468ace]:(?:[a-f0-9]{2}:){4}|[a-f0-9][0,2468ace]-(?:[a-f0-9]{2}-){4})[a-f0-9]{2}$/i.test(str)
}

/**
 * 邮政编码
 */
export function isPostalCode(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/.test(str)
}
