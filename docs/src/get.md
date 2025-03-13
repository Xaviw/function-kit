[function-kit](index.md) / get

# get

## Functions

### get()

```ts
function get<TDefault>(
   value: any, 
   path: string, 
   defaultValue?: TDefault): undefined | TDefault
```

Defined in: [get.ts:27](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/get.ts#L27)

安全地获取对象或数组中的嵌套值

#### Type Parameters

• **TDefault**

#### Parameters

##### value

`any`

要获取值的对象或数组

##### path

`string`

属性路径字符串，支持点号和方括号表示法

##### defaultValue?

`TDefault`

当路径不存在时返回的默认值

#### Returns

`undefined` \| `TDefault`

返回路径对应的值，如果路径不存在则返回默认值

#### Example

```ts
// 基础对象访问
get({ a: { b: 1 } }, 'a.b') // 1

// 数组访问
get({ a: [{ b: 1 }] }, 'a[0].b') // 1

// 默认值
get({ a: 1 }, 'b', 'default') // 'default'

// 复杂路径
get({ a: [{ b: { c: 3 } }] }, 'a[0].b.c') // 3

// 无效路径
get({ a: 1 }, 'a.b.c') // undefined
```
