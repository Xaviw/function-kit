[function-kit](index.md) / math

# math

## difference()

```ts
function difference<T, K>(
   root: readonly T[], 
   other: readonly T[], 
   identity?: (item: T) => K): T[]
```

计算两个数组的差集

### 类型参数

#### T

`T`

#### K

`K` *extends* `string` \| `number` \| `symbol`

### 参数

#### root

readonly `T`[]

主数组

#### other

readonly `T`[]

要排除的数组

#### identity?

(`item`: `T`) => `K`

可选的用于获取元素标识符的函数

### 返回

`T`[]

返回一个新数组，包含在 root 中但不在 other 中的元素

### 示例

```ts
difference([1, 2, 3], [2, 3, 4]) // [1]
difference([{id: 1}, {id: 2}], [{id: 2}], x => x.id) // [{id: 1}]
```

***

## intersects()

```ts
function intersects<T, K>(
   listA: readonly T[], 
   listB: readonly T[], 
   identity?: (t: T) => K): T[]
```

计算两个数组的交集

### 类型参数

#### T

`T`

#### K

`K` *extends* `string` \| `number` \| `symbol`

### 参数

#### listA

readonly `T`[]

第一个数组

#### listB

readonly `T`[]

第二个数组

#### identity?

(`t`: `T`) => `K`

可选的用于获取元素标识符的函数

### 返回

`T`[]

返回一个新数组，包含同时存在于两个数组中的元素

### 示例

```ts
intersects([1, 2, 3], [2, 3, 4]) // [2, 3]
intersects([{id: 1}, {id: 2}], [{id: 2}, {id: 3}], x => x.id) // [{id: 2}]
```

***

## isEven()

```ts
function isEven(val: number): boolean
```

判断数值是否为偶数

### 参数

#### val

`number`

要检查的数值

### 返回

`boolean`

如果数值是偶数则返回 true，否则返回 false

### 示例

```ts
isEven(2) // true
isEven(3) // false
isEven(1.2) // false
```

***

## isInteger()

```ts
function isInteger(val: number): boolean
```

判断数值是否为整数

### 参数

#### val

`number`

要检查的数值

### 返回

`boolean`

如果数值是整数则返回 true，否则返回 false

### 示例

```ts
isInteger(1) // true
isInteger(1.5) // false
isInteger(NaN) // false
```

***

## isOdd()

```ts
function isOdd(val: number): boolean
```

判断数值是否为奇数

### 参数

#### val

`number`

要检查的数值

### 返回

`boolean`

如果数值是奇数则返回 true，否则返回 false

### 示例

```ts
isOdd(3) // true
isOdd(2) // false
isOdd(1.5) // false
```

***

## union()

```ts
function union<T, K>(
   listA: readonly T[], 
   listB: readonly T[], 
   identity?: (t: T) => K): T[]
```

计算两个数组的并集

### 类型参数

#### T

`T`

#### K

`K` *extends* `string` \| `number` \| `symbol`

### 参数

#### listA

readonly `T`[]

第一个数组

#### listB

readonly `T`[]

第二个数组

#### identity?

(`t`: `T`) => `K`

可选的用于获取元素标识符的函数

### 返回

`T`[]

返回一个新数组，包含两个数组中的所有不重复元素

### 示例

```ts
union([1, 2], [2, 3]) // [1, 2, 3]
union([{id: 1}, {id: 2}], [{id: 2}, {id: 3}], x => x.id) // [{id: 1}, {id: 2}, {id: 3}]
```
