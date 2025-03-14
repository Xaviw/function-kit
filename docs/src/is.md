[function-kit](index.md) / is

# is

## isArray()

```ts
function isArray(val: unknown): val is any[]
```

判断值是否为数组

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is any[]`

如果值是数组，则返回 true，否则返回 false

### 示例

```ts
isArray([1, 2, 3]) // true
isArray('hello') // false
```

***

## isArrayBuffer()

```ts
function isArrayBuffer(val: unknown): val is ArrayBuffer
```

判断值是否为 ArrayBuffer

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is ArrayBuffer`

如果值是 ArrayBuffer，则返回 true，否则返回 false

### 示例

```ts
isArrayBuffer(new ArrayBuffer(10)) // true
isArrayBuffer([]) // false
```

***

## isBlob()

```ts
function isBlob(val: unknown): val is Blob
```

判断值是否为 Blob

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is Blob`

如果值是 Blob，则返回 true，否则返回 false

### 示例

```ts
isBlob(new Blob()) // true
isBlob({}) // false
```

***

## isBoolean()

```ts
function isBoolean(val: unknown): val is boolean
```

判断值是否为布尔值

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is boolean`

如果值是布尔值，则返回 true，否则返回 false

### 示例

```ts
isBoolean(true) // true
isBoolean(0) // false
```

***

## isDate()

```ts
function isDate(val: unknown): val is Date
```

判断值是否为日期对象

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is Date`

如果值是日期对象，则返回 true，否则返回 false

### 示例

```ts
isDate(new Date()) // true
isDate('2021-01-01') // false
```

***

## isError()

```ts
function isError(val: unknown): val is Error
```

判断值是否为错误对象

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is Error`

如果值是错误对象，则返回 true，否则返回 false

### 示例

```ts
isError(new Error()) // true
isError('error') // false
```

***

## isFunction()

```ts
function isFunction(val: unknown): val is Fn
```

判断值是否为函数

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is Fn`

如果值是函数，则返回 true，否则返回 false

### 示例

```ts
isFunction(() => {}) // true
isFunction(123) // false
```

***

## isGeneratorFunction()

```ts
function isGeneratorFunction(val: unknown): val is GeneratorFunction
```

判断值是否为生成器函数

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is GeneratorFunction`

如果值是生成器函数，则返回 true，否则返回 false

### 示例

```ts
isGeneratorFunction(function* () { }) // true
isGeneratorFunction(123) // false
```

***

## isMap()

```ts
function isMap(val: unknown): val is Map<any, any>
```

判断值是否为 Map

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is Map<any, any>`

如果值是 Map，则返回 true，否则返回 false

### 示例

```ts
isMap(new Map()) // true
isMap({}) // false
```

***

## isNil()

```ts
function isNil(val: unknown): val is undefined | null
```

判断值是否为 null 或者 undefined（void 0）

### 参数

#### val

`unknown`

要检查的值

### 返回

val is undefined \| null

如果值是null 或者 undefined（void 0），则返回 true，否则返回 false

### 示例

```ts
isNil(null) // true
isNil(123) // false
```

***

## isNumber()

```ts
function isNumber(val: unknown): val is number
```

判断值是否为数字

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is number`

如果值是数字，则返回 true，否则返回 false

### 示例

```ts
isNumber(123) // true
isNumber('123') // false
```

***

## isObject()

```ts
function isObject(val: unknown): val is Recordable
```

判断值是否为对象（包括函数）

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is Recordable`

如果值是对象，则返回 true，否则返回 false

### 示例

```ts
isObject({}) // true
isObject(null) // false
```

***

## isPrimitive()

```ts
function isPrimitive(val: unknown): val is undefined | null | string | number | boolean | symbol
```

判断值是否为原始类型值

### 参数

#### val

`unknown`

要检查的值

### 返回

val is undefined \| null \| string \| number \| boolean \| symbol

如果值是原始类型值，则返回 true，否则返回 false

### 示例

```ts
isPrimitive(1) // true
isPrimitive({}) // false
```

***

## isPromise()

```ts
function isPromise(val: unknown): val is Promise<any>
```

判断值是否为 Promise 对象

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is Promise<any>`

如果值是 Promise 对象，则返回 true，否则返回 false

### 示例

```ts
isPromise(Promise.resolve()) // true
isPromise({}) // false
```

***

## isRegExp()

```ts
function isRegExp(val: unknown): val is RegExp
```

判断值是否为正则表达式对象

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is RegExp`

如果值是正则表达式对象，则返回 true，否则返回 false

### 示例

```ts
isRegExp(/a/i) // true
isRegExp({}) // false
```

***

## isSet()

```ts
function isSet(val: unknown): val is Set<any>
```

判断值是否为 Set 对象

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is Set<any>`

如果值是 Set 对象，则返回 true，否则返回 false

### 示例

```ts
isSet(new Set()) // true
isSet({}) // false
```

***

## isString()

```ts
function isString(val: unknown): val is string
```

判断值是否为字符串

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is string`

如果值是字符串，则返回 true，否则返回 false

### 示例

```ts
isString('hello') // true
isString(123) // false
```

***

## isSymbol()

```ts
function isSymbol(val: unknown): val is symbol
```

判断值是否为 Symbol

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is symbol`

如果值是 Symbol，则返回 true，否则返回 false

### 示例

```ts
isSymbol(Symbol('foo')) // true
isSymbol('foo') // false
```

***

## isTypedArray()

```ts
function isTypedArray(val: unknown): val is Int8Array<ArrayBufferLike> | Int16Array<ArrayBufferLike> | Int32Array<ArrayBufferLike> | Uint8Array<ArrayBufferLike> | Uint8ClampedArray<ArrayBufferLike> | Uint16Array<ArrayBufferLike> | Uint32Array<ArrayBufferLike> | Float32Array<ArrayBufferLike> | Float64Array<ArrayBufferLike>
```

判断值是否为 typedArray

### 参数

#### val

`unknown`

要检查的值

### 返回

val is Int8Array\<ArrayBufferLike\> \| Int16Array\<ArrayBufferLike\> \| Int32Array\<ArrayBufferLike\> \| Uint8Array\<ArrayBufferLike\> \| Uint8ClampedArray\<ArrayBufferLike\> \| Uint16Array\<ArrayBufferLike\> \| Uint32Array\<ArrayBufferLike\> \| Float32Array\<ArrayBufferLike\> \| Float64Array\<ArrayBufferLike\>

如果值是 typedArray，则返回 true，否则返回 false

### 示例

```ts
isTypedArray(new Int16Array()) // true
isTypedArray([]) // false
```

***

## isUndef()

```ts
function isUndef(val: unknown): val is undefined
```

判断值是否为 undefined（void 0）

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is undefined`

如果值是 undefined（void 0），则返回 true，否则返回 false

### 示例

```ts
isUndef(undefined) // true
isUndef(null) // false
```

***

## isWeakMap()

```ts
function isWeakMap(val: unknown): val is WeakMap<any, any>
```

判断值是否为 WeakMap

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is WeakMap<any, any>`

如果值是 WeakMap，则返回 true，否则返回 false

### 示例

```ts
isWeakMap(new WeakMap()) // true
isWeakMap({}) // false
```

***

## isWeakSet()

```ts
function isWeakSet(val: unknown): val is WeakSet<any>
```

判断值是否为 WeakSet

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is WeakSet<any>`

如果值是 WeakSet，则返回 true，否则返回 false

### 示例

```ts
isWeakSet(new WeakSet()) // true
isWeakSet({}) // false
```
