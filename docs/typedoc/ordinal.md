[function-kit](index.md) / ordinal

# ordinal

## ordinal()

```ts
function ordinal(num: number): string;
```

为数字添加英文序数词后缀（st、nd、rd、th）

### 参数

#### num

`number`

要转换的数字

### 返回

`string`

返回添加了序数词后缀的字符串

### 抛出

当输入的值无法转换为数字时抛出类型错误

### 示例

```ts
ordinal(1) // '1st'
ordinal(2) // '2nd'
ordinal(3) // '3rd'
ordinal(4) // '4th'
ordinal(11) // '11th'
ordinal(21) // '21st'
```
