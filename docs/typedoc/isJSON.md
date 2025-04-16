[function-kit](index.md) / isJSON

# isJSON

## isJSON()

```ts
function isJSON(val: string): boolean;
```

判断字符串是否是合法的 JSON 格式字符串

### 参数

#### val

`string`

要检查的字符串

### 返回

`boolean`

如果字符串是合法的 JSON 格式则返回 true，否则返回 false

### 示例

```ts
isJSON('{"name": "test"}') // true
isJSON('{"name": test}') // false
isJSON('[1, 2, 3]') // true
isJSON('invalid json') // false
```
