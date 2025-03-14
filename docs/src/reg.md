[function-kit](index.md) / reg

# reg

## Functions

### isBase64()

```ts
function isBase64(str: string): boolean
```

Defined in: [reg.ts:31](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L31)

判断字符串是否为 Base64 编码的 Data URL

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果是 Base64 编码的 Data URL 则返回 true，否则返回 false

#### Example

```ts
isBase64('data:image/png;base64,iVBORw0K...') // true
isBase64('data:text/plain,Hello') // false
```

***

### isChinese()

```ts
function isChinese(str: string): boolean
```

Defined in: [reg.ts:167](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L167)

判断字符串是否全为中文字符

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果全为中文字符则返回 true，否则返回 false

#### Example

```ts
isChinese('你好世界') // true
isChinese('Hello世界') // false
```

***

### isChineseName()

```ts
function isChineseName(str: string): boolean
```

Defined in: [reg.ts:82](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L82)

判断字符串是否为中文姓名（支持 "·" 分隔）

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果是有效的中文姓名则返回 true，否则返回 false

#### Example

```ts
isChineseName('张三') // true
isChineseName('艾力·买买提') // true
```

***

### isDataUrl()

```ts
function isDataUrl(str: string): boolean
```

Defined in: [reg.ts:13](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L13)

判断字符串是否为有效的 Data URL

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果是有效的 Data URL 则返回 true，否则返回 false

#### Example

```ts
isDataUrl('data:image/png;base64,iVBORw0K...') // true
isDataUrl('https://example.com/image.png') // false
```

***

### isEmail()

```ts
function isEmail(str: string): boolean
```

Defined in: [reg.ts:65](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L65)

判断字符串是否为有效的电子邮件地址

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果是有效的电子邮件地址则返回 true，否则返回 false

#### Example

```ts
isEmail('user@example.com') // true
isEmail('invalid-email') // false
```

***

### isIDCard()

```ts
function isIDCard(str: string): boolean
```

Defined in: [reg.ts:150](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L150)

判断字符串是否为有效的中国大陆第二代身份证号

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果是有效的身份证号则返回 true，否则返回 false

#### Example

```ts
isIDCard('110101199003077758') // true
isIDCard('11010119900307775X') // true
```

***

### isIPV4()

```ts
function isIPV4(str: string): boolean
```

Defined in: [reg.ts:184](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L184)

判断字符串是否为有效的 IPv4 地址（可选带端口号）

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果是有效的 IPv4 地址则返回 true，否则返回 false

#### Example

```ts
isIPV4('192.168.1.1') // true
isIPV4('192.168.1.1:8080') // true
```

***

### isMacAddress()

```ts
function isMacAddress(str: string): boolean
```

Defined in: [reg.ts:201](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L201)

判断字符串是否为有效的 MAC 地址

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果是有效的 MAC 地址则返回 true，否则返回 false

#### Example

```ts
isMacAddress('00:0a:95:9d:68:16') // true
isMacAddress('00-0a-95-9d-68-16') // true
```

***

### isPhone()

```ts
function isPhone(str: string): boolean
```

Defined in: [reg.ts:116](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L116)

判断字符串是否为有效的中国大陆手机号

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果是有效的手机号则返回 true，否则返回 false

#### Example

```ts
isPhone('13812345678') // true
isPhone('+8613812345678') // true
```

***

### isPostalCode()

```ts
function isPostalCode(str: string): boolean
```

Defined in: [reg.ts:218](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L218)

判断字符串是否为有效的中国邮政编码

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果是有效的邮政编码则返回 true，否则返回 false

#### Example

```ts
isPostalCode('518000') // true
isPostalCode('000000') // false
```

***

### isTelphone()

```ts
function isTelphone(str: string): boolean
```

Defined in: [reg.ts:133](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L133)

判断字符串是否为有效的座机号码

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果是有效的座机号码则返回 true，否则返回 false

#### Example

```ts
isTelphone('010-12345678') // true
isTelphone('0755-1234567') // true
```

***

### isUrl()

```ts
function isUrl(str: string): boolean
```

Defined in: [reg.ts:48](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L48)

判断字符串是否为有效的 URL（支持 localhost）

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果是有效的 URL 则返回 true，否则返回 false

#### Example

```ts
isUrl('https://example.com') // true
isUrl('http://localhost:3000') // true
```

***

### isVehiclePlate()

```ts
function isVehiclePlate(str: string): boolean
```

Defined in: [reg.ts:99](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/reg.ts#L99)

判断字符串是否为有效的中国车牌号（支持新能源和非新能源）

#### Parameters

##### str

`string`

要检查的字符串

#### Returns

`boolean`

如果是有效的车牌号则返回 true，否则返回 false

#### Example

```ts
isVehiclePlate('京A12345') // true
isVehiclePlate('粤B123456') // true
```
