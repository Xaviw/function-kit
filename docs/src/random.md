[function-kit](index.md) / random

# random

## randomNumber()

```ts
function randomNumber(
   min?: number, 
   max?: number, 
   floatNum?: number): number
```

生成指定范围内的随机数

### 参数

#### min?

`number`

最小值，默认为 0；当只传入一个参数时，范围为 [0, min]

#### max?

`number`

最大值，默认为 100；传入后范围为 [min, max]

#### floatNum?

`number`

保留的小数位数，默认为 0

### 返回

`number`

返回指定范围内的随机数

### 示例

```ts
randomNumber(10) // 0-10 之间的整数
randomNumber(1, 10) // 1-10 之间的整数
randomNumber(1, 10, 2) // 1-10 之间的数字，保留 2 位小数
```

***

## randomString()

```ts
function randomString(length?: number, chars?: string): string
```

生成指定长度的随机字符串

### 参数

#### length?

`number`

字符串长度，默认为 8

#### chars?

`string`

可选字符集，默认为所有大小写字母和数字

### 返回

`string`

返回生成的随机字符串

### 示例

```ts
randomString() // 'Xa4Bm9Pq'
randomString(4) // 'Xm9P'
randomString(4, 'abc123') // 'a1b2'
```

***

## shuffle()

```ts
function shuffle<T>(arr: T): T
```

随机打乱数组元素的顺序

### 类型参数

• **T** *extends* `unknown`[]

### 参数

#### arr

`T`

要打乱的数组

### 返回

`T`

返回打乱顺序后的新数组

### 示例

```ts
shuffle([1, 2, 3, 4]) // [3, 1, 4, 2]
shuffle(['a', 'b', 'c']) // ['b', 'c', 'a']
```
