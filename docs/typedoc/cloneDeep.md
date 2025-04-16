[function-kit](index.md) / cloneDeep

# cloneDeep

## cloneDeep()

```ts
function cloneDeep<T>(val: T, seen: WeakMap<any, any>): T;
```

深度克隆一个值，支持多种数据类型

### 类型参数

#### T

`T`

### 参数

#### val

`T`

要克隆的值

#### seen

`WeakMap`\<`any`, `any`\> = `...`

### 返回

`T`

返回克隆后的值

### 示例

```ts
// 基础类型
cloneDeep(42) // 42

// 对象和数组
cloneDeep({ a: 1, b: [2, 3] }) // { a: 1, b: [2, 3] }

// 特殊对象
cloneDeep(new Date()) // new Date()
cloneDeep(new RegExp('test', 'g')) // /test/g
cloneDeep(new Map([['key', 'value']])) // Map(1) { 'key' => 'value' }

// 循环引用
const obj = { a: 1 }
obj.self = obj
cloneDeep(obj) // { a: 1, self: [Circular] }
```
