[function-kit](index.md) / isArrayLike

# isArrayLike

## isArrayLike()

```ts
function isArrayLike(val: unknown): val is ArrayLike<any>;
```

判断值是否为类数组值

### 参数

#### val

`unknown`

要检查的值

### 返回

`val is ArrayLike<any>`

如果值是类数组值则返回 true，否则返回 false

### 备注

类数组值需满足以下条件：
- 具有 length 属性
- length 为非负整数
- length 不大于 Number.MAX_SAFE_INTEGER
- 不是函数

### 示例

```ts
// 字符串
isArrayLike('abc') // true

// 数组
isArrayLike([1, 2, 3]) // true

// 类数组对象
isArrayLike({ length: 3 }) // true

// 非类数组
isArrayLike(null) // false
isArrayLike(() => {}) // false
isArrayLike({ length: -1 }) // false
```
