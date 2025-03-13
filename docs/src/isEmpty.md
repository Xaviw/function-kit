[function-kit](index.md) / isEmpty

# isEmpty

## Functions

### isEmpty()

```ts
function isEmpty(val: unknown): boolean
```

Defined in: [isEmpty.ts:24](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/isEmpty.ts#L24)

判断参数是否为空值

#### Parameters

##### val

`unknown`

要检查的值

#### Returns

`boolean`

如果值为空则返回 true，否则返回 false

#### Remarks

以下情况被认为是空值：
- null 或 undefined
- 空数组或空类数组对象
- 空字符串
- 空对象（没有自身可枚举属性）

#### Example

```ts
isEmpty(null) // true
isEmpty([]) // true
isEmpty('') // true
isEmpty({}) // true
isEmpty([1, 2]) // false
isEmpty({ a: 1 }) // false
```
