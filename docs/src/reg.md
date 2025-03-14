[function-kit](index.md) / reg

# reg

## isBase64()

```ts
function isBase64(str: string): boolean
```

判断字符串是否为 Base64 编码的 Data URL

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果是 Base64 编码的 Data URL 则返回 true，否则返回 false

### 示例

```ts
isBase64('data:image/png;base64,iVBORw0K...') // true
isBase64('data:text/plain,Hello') // false
```

***

## isChinese()

```ts
function isChinese(str: string): boolean
```

判断字符串是否全为中文字符

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果全为中文字符则返回 true，否则返回 false

### 示例

```ts
isChinese('你好世界') // true
isChinese('Hello世界') // false
```

***

## isChineseName()

```ts
function isChineseName(str: string): boolean
```

判断字符串是否为中文姓名（支持 "·" 分隔）

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果是有效的中文姓名则返回 true，否则返回 false

### 示例

```ts
isChineseName('张三') // true
isChineseName('艾力·买买提') // true
```

***

## isDataUrl()

```ts
function isDataUrl(str: string): boolean
```

判断字符串是否为有效的 Data URL

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果是有效的 Data URL 则返回 true，否则返回 false

### 示例

```ts
isDataUrl('data:image/png;base64,iVBORw0K...') // true
isDataUrl('https://example.com/image.png') // false
```

***

## isEmail()

```ts
function isEmail(str: string): boolean
```

判断字符串是否为有效的电子邮件地址

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果是有效的电子邮件地址则返回 true，否则返回 false

### 示例

```ts
isEmail('user@example.com') // true
isEmail('invalid-email') // false
```

***

## isIDCard()

```ts
function isIDCard(str: string): boolean
```

判断字符串是否为有效的中国大陆第二代身份证号

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果是有效的身份证号则返回 true，否则返回 false

### 示例

```ts
isIDCard('110101199003077758') // true
isIDCard('11010119900307775X') // true
```

***

## isIPV4()

```ts
function isIPV4(str: string): boolean
```

判断字符串是否为有效的 IPv4 地址（可选带端口号）

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果是有效的 IPv4 地址则返回 true，否则返回 false

### 示例

```ts
isIPV4('192.168.1.1') // true
isIPV4('192.168.1.1:8080') // true
```

***

## isMacAddress()

```ts
function isMacAddress(str: string): boolean
```

判断字符串是否为有效的 MAC 地址

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果是有效的 MAC 地址则返回 true，否则返回 false

### 示例

```ts
isMacAddress('00:0a:95:9d:68:16') // true
isMacAddress('00-0a-95-9d-68-16') // true
```

***

## isPhone()

```ts
function isPhone(str: string): boolean
```

判断字符串是否为有效的中国大陆手机号

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果是有效的手机号则返回 true，否则返回 false

### 示例

```ts
isPhone('13812345678') // true
isPhone('+8613812345678') // true
```

***

## isPostalCode()

```ts
function isPostalCode(str: string): boolean
```

判断字符串是否为有效的中国邮政编码

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果是有效的邮政编码则返回 true，否则返回 false

### 示例

```ts
isPostalCode('518000') // true
isPostalCode('000000') // false
```

***

## isTelphone()

```ts
function isTelphone(str: string): boolean
```

判断字符串是否为有效的座机号码

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果是有效的座机号码则返回 true，否则返回 false

### 示例

```ts
isTelphone('010-12345678') // true
isTelphone('0755-1234567') // true
```

***

## isUrl()

```ts
function isUrl(str: string): boolean
```

判断字符串是否为有效的 URL（支持 localhost）

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果是有效的 URL 则返回 true，否则返回 false

### 示例

```ts
isUrl('https://example.com') // true
isUrl('http://localhost:3000') // true
```

***

## isVehiclePlate()

```ts
function isVehiclePlate(str: string): boolean
```

判断字符串是否为有效的中国车牌号（支持新能源和非新能源）

### 参数

#### str

`string`

要检查的字符串

### 返回

`boolean`

如果是有效的车牌号则返回 true，否则返回 false

### 示例

```ts
isVehiclePlate('京A12345') // true
isVehiclePlate('粤B123456') // true
```
