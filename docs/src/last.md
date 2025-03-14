[function-kit](index.md) / last

# last

## Functions

### last()

```ts
function last<T>(arr: T[], defaultValue?: T): undefined | T
```

Defined in: [last.ts:14](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/last.ts#L14)

获取数组最后一项

#### Type Parameters

• **T**

#### Parameters

##### arr

`T`[]

要获取最后一项的数组

##### defaultValue?

`T`

当数组为空时返回的默认值

#### Returns

`undefined` \| `T`

返回数组的最后一项，如果数组为空且提供了默认值则返回默认值，否则返回 undefined

#### Example

```ts
last([1, 2, 3]) // 3
last([]) // undefined
last([], 0) // 0
last(['a', 'b']) // 'b'
```
