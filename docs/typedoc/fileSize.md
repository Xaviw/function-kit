[function-kit](index.md) / fileSize

# fileSize

## fileSize()

```ts
function fileSize(bytes: number, suffixes: string[]): string;
```

将字节数转换为带单位的文件大小字符串

### 参数

#### bytes

`number`

要转换的字节数

#### suffixes

`string`[] = `...`

单位数组，默认为 ['b', 'K', 'M', 'G', 'T']

### 返回

`string`

返回格式化后的文件大小字符串，最多保留两位小数

### 示例

```ts
// 基础转换
fileSize(1024) // '1K'
fileSize(1048576) // '1M'

// 小数保留
fileSize(1536) // '1.5K'
fileSize(2684354560) // '2.5G'

// 自定义单位
fileSize(1024, ['B', 'KB', 'MB']) // '1KB'

// 边界情况
fileSize(-1) // '0b'
fileSize(1024 ** 5) // '1024T'
```
