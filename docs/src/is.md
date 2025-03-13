[function-kit](index.md) / is

# is

## Functions

### isArray()

```ts
function isArray(val: unknown): val is any[]
```

Defined in: [is.ts:14](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L14)

判断值是否为数组

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is any[]`

如果值是数组，则返回 true，否则返回 false

#### Example

```ts
isArray([1, 2, 3]) // true
isArray('hello') // false
```

***

### isArrayBuffer()

```ts
function isArrayBuffer(val: unknown): val is ArrayBuffer
```

Defined in: [is.ts:31](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L31)

判断值是否为 ArrayBuffer

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is ArrayBuffer`

如果值是 ArrayBuffer，则返回 true，否则返回 false

#### Example

```ts
isArrayBuffer(new ArrayBuffer(10)) // true
isArrayBuffer([]) // false
```

***

### isBlob()

```ts
function isBlob(val: unknown): val is Blob
```

Defined in: [is.ts:45](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L45)

判断值是否为 Blob

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is Blob`

如果值是 Blob，则返回 true，否则返回 false

#### Example

```ts
isBlob(new Blob()) // true
isBlob({}) // false
```

***

### isBoolean()

```ts
function isBoolean(val: unknown): val is boolean
```

Defined in: [is.ts:59](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L59)

判断值是否为布尔值

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is boolean`

如果值是布尔值，则返回 true，否则返回 false

#### Example

```ts
isBoolean(true) // true
isBoolean(0) // false
```

***

### isDate()

```ts
function isDate(val: unknown): val is Date
```

Defined in: [is.ts:73](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L73)

判断值是否为日期对象

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is Date`

如果值是日期对象，则返回 true，否则返回 false

#### Example

```ts
isDate(new Date()) // true
isDate('2021-01-01') // false
```

***

### isError()

```ts
function isError(val: unknown): val is Error
```

Defined in: [is.ts:87](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L87)

判断值是否为错误对象

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is Error`

如果值是错误对象，则返回 true，否则返回 false

#### Example

```ts
isError(new Error()) // true
isError('error') // false
```

***

### isFunction()

```ts
function isFunction(val: unknown): val is Fn
```

Defined in: [is.ts:107](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L107)

判断值是否为函数

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is Fn`

如果值是函数，则返回 true，否则返回 false

#### Example

```ts
isFunction(() => {}) // true
isFunction(123) // false
```

***

### isGeneratorFunction()

```ts
function isGeneratorFunction(val: unknown): val is GeneratorFunction
```

Defined in: [is.ts:121](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L121)

判断值是否为生成器函数

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is GeneratorFunction`

如果值是生成器函数，则返回 true，否则返回 false

#### Example

```ts
isGeneratorFunction(function* () { }) // true
isGeneratorFunction(123) // false
```

***

### isMap()

```ts
function isMap(val: unknown): val is Map<any, any>
```

Defined in: [is.ts:135](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L135)

判断值是否为 Map

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is Map<any, any>`

如果值是 Map，则返回 true，否则返回 false

#### Example

```ts
isMap(new Map()) // true
isMap({}) // false
```

***

### isNil()

```ts
function isNil(val: unknown): val is undefined | null
```

Defined in: [is.ts:148](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L148)

判断值是否为 null 或者 undefined（void 0）

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

val is undefined \| null

如果值是null 或者 undefined（void 0），则返回 true，否则返回 false

#### Example

```ts
isNil(null) // true
isNil(123) // false
```

***

### isNumber()

```ts
function isNumber(val: unknown): val is number
```

Defined in: [is.ts:162](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L162)

判断值是否为数字

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is number`

如果值是数字，则返回 true，否则返回 false

#### Example

```ts
isNumber(123) // true
isNumber('123') // false
```

***

### isObject()

```ts
function isObject(val: unknown): val is Recordable
```

Defined in: [is.ts:176](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L176)

判断值是否为对象（包括函数）

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is Recordable`

如果值是对象，则返回 true，否则返回 false

#### Example

```ts
isObject({}) // true
isObject(null) // false
```

***

### isPrimitive()

```ts
function isPrimitive(val: unknown): val is undefined | null | string | number | boolean | symbol
```

Defined in: [is.ts:191](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L191)

判断值是否为原始类型值

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

val is undefined \| null \| string \| number \| boolean \| symbol

如果值是原始类型值，则返回 true，否则返回 false

#### Example

```ts
isPrimitive(1) // true
isPrimitive({}) // false
```

***

### isPromise()

```ts
function isPromise(val: unknown): val is Promise<any>
```

Defined in: [is.ts:207](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L207)

判断值是否为 Promise 对象

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is Promise<any>`

如果值是 Promise 对象，则返回 true，否则返回 false

#### Example

```ts
isPromise(Promise.resolve()) // true
isPromise({}) // false
```

***

### isRegExp()

```ts
function isRegExp(val: unknown): val is RegExp
```

Defined in: [is.ts:221](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L221)

判断值是否为正则

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is RegExp`

如果值是正则，则返回 true，否则返回 false

#### Example

```ts
isRegExp(/a/i) // true
isRegExp({}) // false
```

***

### isSet()

```ts
function isSet(val: unknown): val is Set<any>
```

Defined in: [is.ts:235](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L235)

判断值是否为 Set 对象

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is Set<any>`

如果值是 Set 对象，则返回 true，否则返回 false

#### Example

```ts
isSet(new Set()) // true
isSet({}) // false
```

***

### isString()

```ts
function isString(val: unknown): val is string
```

Defined in: [is.ts:249](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L249)

判断值是否为字符串

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is string`

如果值是字符串，则返回 true，否则返回 false

#### Example

```ts
isString('hello') // true
isString(123) // false
```

***

### isSymbol()

```ts
function isSymbol(val: unknown): val is symbol
```

Defined in: [is.ts:263](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L263)

判断值是否为 Symbol

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is symbol`

如果值是 Symbol，则返回 true，否则返回 false

#### Example

```ts
isSymbol(Symbol('foo')) // true
isSymbol('foo') // false
```

***

### isTypedArray()

```ts
function isTypedArray(val: unknown): val is Int8Array<ArrayBufferLike> | Int16Array<ArrayBufferLike> | Int32Array<ArrayBufferLike> | Uint8Array<ArrayBufferLike> | Uint8ClampedArray<ArrayBufferLike> | Uint16Array<ArrayBufferLike> | Uint32Array<ArrayBufferLike> | Float32Array<ArrayBufferLike> | Float64Array<ArrayBufferLike>
```

Defined in: [is.ts:277](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L277)

判断值是否为 typedArray

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

val is Int8Array\<ArrayBufferLike\> \| Int16Array\<ArrayBufferLike\> \| Int32Array\<ArrayBufferLike\> \| Uint8Array\<ArrayBufferLike\> \| Uint8ClampedArray\<ArrayBufferLike\> \| Uint16Array\<ArrayBufferLike\> \| Uint32Array\<ArrayBufferLike\> \| Float32Array\<ArrayBufferLike\> \| Float64Array\<ArrayBufferLike\>

如果值是 typedArray，则返回 true，否则返回 false

#### Example

```ts
isTypedArray(new Int16Array()) // true
isTypedArray([]) // false
```

***

### isUndef()

```ts
function isUndef(val: unknown): val is undefined
```

Defined in: [is.ts:302](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L302)

判断值是否为 undefined（void 0）

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is undefined`

如果值是 undefined（void 0），则返回 true，否则返回 false

#### Example

```ts
isUndef(undefined) // true
isUndef(null) // false
```

***

### isWeakMap()

```ts
function isWeakMap(val: unknown): val is WeakMap<any, any>
```

Defined in: [is.ts:316](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L316)

判断值是否为 weakMap

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is WeakMap<any, any>`

如果值是 weakMap，则返回 true，否则返回 false

#### Example

```ts
isWeakMap(new WeakMap()) // true
isWeakMap({}) // false
```

***

### isWeakSet()

```ts
function isWeakSet(val: unknown): val is WeakSet<any>
```

Defined in: [is.ts:330](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/is.ts#L330)

判断值是否为 weakSet

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`val is WeakSet<any>`

如果值是 weakSet，则返回 true，否则返回 false

#### Example

```ts
isWeakSet(new WeakSet()) // true
isWeakSet({}) // false
```
