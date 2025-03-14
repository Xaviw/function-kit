[function-kit](index.md) / isEmpty

# isEmpty

## isEmpty()

```ts
function isEmpty(val: unknown): boolean
```

判断参数是否为空值

### 参数

#### val

`unknown`

要检查的值

### 返回

`boolean`

如果值为空则返回 true，否则返回 false

### 备注

以下情况被认为是空值：
- null 或 undefined
- 空数组或空 Arguments 类数组
- 空字符串
- 空对象（没有自身可枚举属性）

### 示例

```ts
isEmpty(null) // true
isEmpty([]) // true
isEmpty('') // true
isEmpty({}) // true
isEmpty([1, 2]) // false
isEmpty({ a: 1 }) // false
```
