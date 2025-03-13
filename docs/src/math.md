[function-kit](index.md) / math

# math

## Functions

### difference()

```ts
function difference<T, K>(
   root: readonly T[], 
   other: readonly T[], 
   identity?: (item: T) => K): T[]
```

Defined in: [math.ts:64](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/math.ts#L64)

计算两个数组的差集

#### Type Parameters

• **T**

• **K** *extends* `string` \| `number` \| `symbol`

#### Parameters

##### root

readonly `T`[]

主数组

##### other

readonly `T`[]

要排除的数组

##### identity?

(`item`: `T`) => `K`

可选的用于获取元素标识符的函数

#### Returns

`T`[]

返回一个新数组，包含在 root 中但不在 other 中的元素

#### Example

```ts
difference([1, 2, 3], [2, 3, 4]) // [1]
difference([{id: 1}, {id: 2}], [{id: 2}], x => x.id) // [{id: 1}]
```

***

### intersects()

```ts
function intersects<T, K>(
   listA: readonly T[], 
   listB: readonly T[], 
   identity?: (t: T) => K): T[]
```

Defined in: [math.ts:103](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/math.ts#L103)

计算两个数组的交集

#### Type Parameters

• **T**

• **K** *extends* `string` \| `number` \| `symbol`

#### Parameters

##### listA

readonly `T`[]

第一个数组

##### listB

readonly `T`[]

第二个数组

##### identity?

(`t`: `T`) => `K`

可选的用于获取元素标识符的函数

#### Returns

`T`[]

返回一个新数组，包含同时存在于两个数组中的元素

#### Example

```ts
intersects([1, 2, 3], [2, 3, 4]) // [2, 3]
intersects([{id: 1}, {id: 2}], [{id: 2}, {id: 3}], x => x.id) // [{id: 2}]
```

***

### isEven()

```ts
function isEven(val: number): boolean
```

Defined in: [math.ts:29](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/math.ts#L29)

判断数值是否为偶数

#### Parameters

##### val

`number`

要检查的数值

#### Returns

`boolean`

如果数值是偶数则返回 true，否则返回 false

#### Example

```ts
isEven(2) // true
isEven(3) // false
isEven(1.2) // false
```

***

### isInteger()

```ts
function isInteger(val: number): boolean
```

Defined in: [math.ts:14](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/math.ts#L14)

判断数值是否为整数

#### Parameters

##### val

`number`

要检查的数值

#### Returns

`boolean`

如果数值是整数则返回 true，否则返回 false

#### Example

```ts
isInteger(1) // true
isInteger(1.5) // false
isInteger(NaN) // false
```

***

### isOdd()

```ts
function isOdd(val: number): boolean
```

Defined in: [math.ts:46](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/math.ts#L46)

判断数值是否为奇数

#### Parameters

##### val

`number`

要检查的数值

#### Returns

`boolean`

如果数值是奇数则返回 true，否则返回 false

#### Example

```ts
isOdd(3) // true
isOdd(2) // false
isOdd(1.5) // false
```

***

### union()

```ts
function union<T, K>(
   listA: readonly T[], 
   listB: readonly T[], 
   identity?: (t: T) => K): T[]
```

Defined in: [math.ts:139](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/math.ts#L139)

计算两个数组的并集

#### Type Parameters

• **T**

• **K** *extends* `string` \| `number` \| `symbol`

#### Parameters

##### listA

readonly `T`[]

第一个数组

##### listB

readonly `T`[]

第二个数组

##### identity?

(`t`: `T`) => `K`

可选的用于获取元素标识符的函数

#### Returns

`T`[]

返回一个新数组，包含两个数组中的所有不重复元素

#### Example

```ts
union([1, 2], [2, 3]) // [1, 2, 3]
union([{id: 1}, {id: 2}], [{id: 2}, {id: 3}], x => x.id) // [{id: 1}, {id: 2}, {id: 3}]
```
