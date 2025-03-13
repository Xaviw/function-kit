[function-kit](index.md) / isJSON

# isJSON

## Functions

### isJSON()

```ts
function isJSON(val: string): boolean
```

Defined in: [isJSON.ts:13](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/isJSON.ts#L13)

判断字符串是否是合法的 JSON 格式字符串

#### Parameters

##### val

`string`

要检查的字符串

#### Returns

`boolean`

如果字符串是合法的 JSON 格式则返回 true，否则返回 false

#### Example

```ts
isJSON('{"name": "test"}') // true
isJSON('{"name": test}') // false
isJSON('[1, 2, 3]') // true
isJSON('invalid json') // false
```
