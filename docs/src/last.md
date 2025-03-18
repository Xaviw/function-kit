[function-kit](index.md) / last

# last

## last()

```ts
function last<T>(arr: T[], defaultValue?: T): undefined | T
```

获取数组最后一项

### 类型参数

#### T

`T`

### 参数

#### arr

`T`[]

要获取最后一项的数组

#### defaultValue?

`T`

当数组为空时返回的默认值

### 返回

`undefined` \| `T`

返回数组的最后一项，如果数组为空且提供了默认值则返回默认值，否则返回 undefined

### 示例

```ts
last([1, 2, 3]) // 3
last([]) // undefined
last([], 0) // 0
last(['a', 'b']) // 'b'
```
