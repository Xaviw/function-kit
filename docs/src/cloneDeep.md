[function-kit](index.md) / cloneDeep

# cloneDeep

## Functions

### cloneDeep()

```ts
function cloneDeep<T>(val: T, seen: WeakMap<any, any>): T
```

Defined in: [cloneDeep.ts:28](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/cloneDeep.ts#L28)

深度克隆一个值，支持多种数据类型

#### Type Parameters

• **T**

#### Parameters

##### val

`T`

要克隆的值

##### seen

`WeakMap`\<`any`, `any`\> = `...`

#### Returns

`T`

返回克隆后的值

#### Example

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
