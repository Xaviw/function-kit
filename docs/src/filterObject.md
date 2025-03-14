[function-kit](index.md) / filterObject

# filterObject

## FilterObjectIterator\<T\>

```ts
type FilterObjectIterator<T> = Fn<[keyof T, T[keyof T]], boolean>;
```

### 类型参数

• **T** *extends* `Recordable`

***

## filterObject()

```ts
function filterObject<T>(obj: T, iterator: FilterObjectIterator<T>): Partial<T>
```

根据条件过滤对象的属性并返回新对象

### 类型参数

• **T** *extends* `Recordable`

### 参数

#### obj

`T`

要过滤的源对象

#### iterator

[`FilterObjectIterator`](filterObject.md#filterobjectiteratort)\<`T`\>

过滤函数，接收属性名和属性值作为参数，返回 true 表示保留该属性

### 返回

`Partial`\<`T`\>

返回过滤后的新对象

### 抛出

当 iterator 不是函数时抛出类型错误

### 示例

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
