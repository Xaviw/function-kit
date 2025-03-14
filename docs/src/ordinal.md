[function-kit](index.md) / ordinal

# ordinal

## Functions

### ordinal()

```ts
function ordinal(num: number): string
```

Defined in: [ordinal.ts:18](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/ordinal.ts#L18)

为数字添加英文序数词后缀（st、nd、rd、th）

#### Parameters

##### num

`number`

要转换的数字

#### Returns

`string`

返回添加了序数词后缀的字符串

#### Throws

当输入的值无法转换为数字时抛出类型错误

#### Example

```ts
ordinal(1) // '1st'
ordinal(2) // '2nd'
ordinal(3) // '3rd'
ordinal(4) // '4th'
ordinal(11) // '11th'
ordinal(21) // '21st'
```
