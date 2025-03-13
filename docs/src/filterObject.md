[function-kit](index.md) / filterObject

# filterObject

## Functions

### filterObject()

```ts
function filterObject<T>(obj: T, iterator: ObjectIterator<T>): Partial<T>
```

Defined in: [filterObject.ts:26](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/filterObject.ts#L26)

根据条件过滤对象的属性并返回新对象

#### Type Parameters

• **T** *extends* `Recordable`

#### Parameters

##### obj

`T`

要过滤的源对象

##### iterator

`ObjectIterator`\<`T`\>

过滤函数，接收属性名和属性值作为参数，返回 true 表示保留该属性

#### Returns

`Partial`\<`T`\>

返回过滤后的新对象

#### Throws

当 iterator 不是函数时抛出类型错误

#### Example

```ts
// 按属性名过滤
filterObject({ a: 1, b: 2 }, key => key === 'a') // { a: 1 }

// 按属性值过滤
filterObject({ a: 1, b: 2 }, (_, value) => value > 1) // { b: 2 }

// 组合条件过滤
filterObject({ a: 1, b: 2, c: 3 }, (key, value) =>
  key !== 'b' && value < 3
) // { a: 1 }
```
