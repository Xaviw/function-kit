[function-kit](index.md) / isEqual

# isEqual

## Functions

### isEqual()

```ts
function isEqual(a: any, b: any): boolean
```

Defined in: [isEqual.ts:25](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/isEqual.ts#L25)

深度比较两个值是否相等

#### Parameters

##### a

`any`

要比较的第一个值

##### b

`any`

要比较的第二个值

#### Returns

`boolean`

如果两个值相等返回 true，否则返回 false

#### Remarks

支持比较的类型：
- 基本类型（包括 NaN、+0/-0 的特殊处理）
- 数组
- 普通对象
- 内置对象（Date、RegExp、Map、Set 等）
- 循环引用对象

#### Example

```ts
isEqual(1, 1) // true
isEqual([1, 2], [1, 2]) // true
isEqual(new Date('2024'), new Date('2024')) // true
isEqual(new Map([[1, 2]]), new Map([[1, 2]])) // true
isEqual({ a: 1 }, { a: 2 }) // false
```
