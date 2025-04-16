[function-kit](index.md) / isEqual

# isEqual

## isEqual()

```ts
function isEqual(a: any, b: any): boolean;
```

深度比较两个值是否相等

### 参数

#### a

`any`

要比较的第一个值

#### b

`any`

要比较的第二个值

### 返回

`boolean`

如果两个值相等返回 true，否则返回 false

### 备注

支持比较的类型：
- 基本类型（包括 NaN、+0/-0 的特殊处理）
- 数组
- 普通对象
- 内置对象（Date、RegExp、Map、Set 等）
- 循环引用对象

### 示例

```ts
isEqual(1, 1) // true
isEqual([1, 2], [1, 2]) // true
isEqual(new Date('2024'), new Date('2024')) // true
isEqual(new Map([[1, 2]]), new Map([[1, 2]])) // true
isEqual({ a: 1 }, { a: 2 }) // false
```
