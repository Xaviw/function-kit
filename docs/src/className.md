[function-kit](index.md) / className

# className

## Functions

### className()

```ts
function className(...names: any[]): string
```

Defined in: [className.ts:25](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/className.ts#L25)

计算动态绑定后的 css class 字符串

#### Parameters

##### names

...`any`[]

要计算的 class 值列表，支持以下类型：
- 字符串：作为单个 class 名
- 对象：key 为 class 名，value 为布尔值
- 数组：包含上述任意类型

#### Returns

`string`

返回计算后的 class 字符串，多个 class 用空格分隔

#### Example

```ts
// 基础用法
className('btn', 'primary') // 'btn primary'

// 条件类名
className({ active: true, disabled: false }) // 'active'

// 混合使用
className('btn', ['primary', { active: true }]) // 'btn primary active'

// 嵌套数组
className(['btn', ['primary', { active: true }]]) // 'btn primary active'
```
