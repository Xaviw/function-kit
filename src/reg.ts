import { isString } from './is'

/**
 * 判断字符串是否为有效的 Data URL
 * @param str - 要检查的字符串
 * @returns 如果是有效的 Data URL 则返回 true，否则返回 false
 * @example
 * ```ts
 * isDataUrl('data:image/png;base64,iVBORw0K...') // true
 * isDataUrl('https://example.com/image.png') // false
 * ```
 */
export function isDataUrl(str: string): boolean {
  if (!isString(str))
    return false

  // https://tools.ietf.org/html/rfc2397
  return /^data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z0-9-.!#$%*+{}|~`]+=[a-z0-9-.!#$%*+{}|~`]+)*)?(?:;base64)?,[\w!$&',()*+;=\-.~:@/?%\s]*$/i.test(str.trim())
}

/**
 * 判断字符串是否为 Base64 编码的 Data URL
 * @param str - 要检查的字符串
 * @returns 如果是 Base64 编码的 Data URL 则返回 true，否则返回 false
 * @example
 * ```ts
 * isBase64('data:image/png;base64,iVBORw0K...') // true
 * isBase64('data:text/plain,Hello') // false
 * ```
 */
export function isBase64(str: string): boolean {
  if (!isString(str))
    return false

  return /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,[\w!$&',()*+;=\-.~:@/?%\s]*$/i.test(str.trim())
}

/**
 * 判断字符串是否为有效的 URL（支持 localhost）
 * @param str - 要检查的字符串
 * @returns 如果是有效的 URL 则返回 true，否则返回 false
 * @example
 * ```ts
 * isUrl('https://example.com') // true
 * isUrl('http://localhost:3000') // true
 * ```
 */
export function isUrl(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:\w+:)?\/\/(?:[^\s.]+\.\S{2}|localhost)\S*$/.test(str)
}

/**
 * 判断字符串是否为有效的电子邮件地址
 * @param str - 要检查的字符串
 * @returns 如果是有效的电子邮件地址则返回 true，否则返回 false
 * @example
 * ```ts
 * isEmail('user@example.com') // true
 * isEmail('invalid-email') // false
 * ```
 */
export function isEmail(str: string): boolean {
  if (!isString(str))
    return false

  return /.[^\n\r@\u2028\u2029]*@.+\..+/.test(str)
}

/**
 * 判断字符串是否为中文姓名（支持 "·" 分隔）
 * @param str - 要检查的字符串
 * @returns 如果是有效的中文姓名则返回 true，否则返回 false
 * @example
 * ```ts
 * isChineseName('张三') // true
 * isChineseName('艾力·买买提') // true
 * ```
 */
export function isChineseName(str: string): boolean {
  if (!isString(str))
    return false

  return /^[\u4E00-\u9FA5·]{2,16}$/.test(str)
}

/**
 * 判断字符串是否为有效的中国车牌号（支持新能源和非新能源）
 * @param str - 要检查的字符串
 * @returns 如果是有效的车牌号则返回 true，否则返回 false
 * @example
 * ```ts
 * isVehiclePlate('京A12345') // true
 * isVehiclePlate('粤B123456') // true
 * ```
 */
export function isVehiclePlate(str: string): boolean {
  if (!isString(str))
    return false

  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/.test(str)
}

/**
 * 判断字符串是否为有效的中国大陆手机号
 * @param str - 要检查的字符串
 * @returns 如果是有效的手机号则返回 true，否则返回 false
 * @example
 * ```ts
 * isPhone('13812345678') // true
 * isPhone('+8613812345678') // true
 * ```
 */
export function isPhone(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:(?:\+|00)86)?1(?:3\d|4[5-79]|5[0-35-9]|6[5-7]|7[0-8]|8\d|9[0125-9])\d{8}$/.test(str)
}

/**
 * 判断字符串是否为有效的座机号码
 * @param str - 要检查的字符串
 * @returns 如果是有效的座机号码则返回 true，否则返回 false
 * @example
 * ```ts
 * isTelphone('010-12345678') // true
 * isTelphone('0755-1234567') // true
 * ```
 */
export function isTelphone(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:(?:\d{3}-)?\d{8}|(?:\d{4}-)?\d{7,8})(?:-\d+)?$/.test(str)
}

/**
 * 判断字符串是否为有效的中国大陆第二代身份证号
 * @param str - 要检查的字符串
 * @returns 如果是有效的身份证号则返回 true，否则返回 false
 * @example
 * ```ts
 * isIDCard('110101199003077758') // true
 * isIDCard('11010119900307775X') // true
 * ```
 */
export function isIDCard(str: string): boolean {
  if (!isString(str))
    return false

  return /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[12]\d|30|31)\d{3}[\dX]$/i.test(str)
}

/**
 * 判断字符串是否全为中文字符
 * @param str - 要检查的字符串
 * @returns 如果全为中文字符则返回 true，否则返回 false
 * @example
 * ```ts
 * isChinese('你好世界') // true
 * isChinese('Hello世界') // false
 * ```
 */
export function isChinese(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/.test(str)
}

/**
 * 判断字符串是否为有效的 IPv4 地址（可选带端口号）
 * @param str - 要检查的字符串
 * @returns 如果是有效的 IPv4 地址则返回 true，否则返回 false
 * @example
 * ```ts
 * isIPV4('192.168.1.1') // true
 * isIPV4('192.168.1.1:8080') // true
 * ```
 */
export function isIPV4(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/.test(str)
}

/**
 * 判断字符串是否为有效的 MAC 地址
 * @param str - 要检查的字符串
 * @returns 如果是有效的 MAC 地址则返回 true，否则返回 false
 * @example
 * ```ts
 * isMacAddress('00:0a:95:9d:68:16') // true
 * isMacAddress('00-0a-95-9d-68-16') // true
 * ```
 */
export function isMacAddress(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:[a-f0-9][0,2468ace]:(?:[a-f0-9]{2}:){4}|[a-f0-9][0,2468ace]-(?:[a-f0-9]{2}-){4})[a-f0-9]{2}$/i.test(str)
}

/**
 * 判断字符串是否为有效的中国邮政编码
 * @param str - 要检查的字符串
 * @returns 如果是有效的邮政编码则返回 true，否则返回 false
 * @example
 * ```ts
 * isPostalCode('518000') // true
 * isPostalCode('000000') // false
 * ```
 */
export function isPostalCode(str: string): boolean {
  if (!isString(str))
    return false

  return /^(?:0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/.test(str)
}
