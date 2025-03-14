[function-kit](index.md) / fileSize

# fileSize

## Functions

### fileSize()

```ts
function fileSize(bytes: number, suffixes: string[]): string
```

Defined in: [fileSize.ts:24](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/fileSize.ts#L24)

将字节数转换为带单位的文件大小字符串

#### Parameters

##### bytes

`number`

要转换的字节数

##### suffixes

`string`[] = `...`

单位数组，默认为 ['b', 'K', 'M', 'G', 'T']

#### Returns

`string`

返回格式化后的文件大小字符串，最多保留两位小数

#### Example

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
