[function-kit](index.md) / random

# random

## Functions

### randomNumber()

```ts
function randomNumber(
   min?: number, 
   max?: number, 
   floatNum?: number): number
```

Defined in: [random.ts:16](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/random.ts#L16)

生成指定范围内的随机数

#### Parameters

##### min?

`number`

最小值，默认为 0；当只传入一个参数时，范围为 [0, min]

##### max?

`number`

最大值，默认为 100；传入后范围为 [min, max]

##### floatNum?

`number`

保留的小数位数，默认为 0（整数）

#### Returns

`number`

返回指定范围内的随机数

#### Example

```ts
randomNumber(10) // 0-10 之间的整数
randomNumber(1, 10) // 1-10 之间的整数
randomNumber(1, 10, 2) // 1-10 之间的数字，保留 2 位小数
```

***

### randomString()

```ts
function randomString(length?: number, chars?: string): string
```

Defined in: [random.ts:44](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/random.ts#L44)

生成指定长度的随机字符串

#### Parameters

##### length?

`number`

字符串长度，默认为 8

##### chars?

`string`

可选字符集，默认为所有大小写字母和数字

#### Returns

`string`

返回生成的随机字符串

#### Example

```ts
randomString() // 'Xa4Bm9Pq'
randomString(4) // 'Xm9P'
randomString(4, 'abc123') // 'a1b2'
```

***

### shuffle()

```ts
function shuffle<T>(arr: T): T
```

Defined in: [random.ts:72](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/random.ts#L72)

随机打乱数组元素的顺序

#### Type Parameters

• **T** *extends* `unknown`[]

#### Parameters

##### arr

`T`

要打乱的数组

#### Returns

`T`

返回打乱顺序后的新数组

#### Example

```ts
shuffle([1, 2, 3, 4]) // [3, 1, 4, 2]
shuffle(['a', 'b', 'c']) // ['b', 'c', 'a']
```
