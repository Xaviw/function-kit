[function-kit](index.md) / mime

# mime

## getExtensionsFromMime()

```ts
function getExtensionsFromMime(mime: string): undefined | string[];
```

根据 MIME 类型获取对应的文件扩展名列表

### 参数

#### mime

`string`

MIME 类型字符串

### 返回

`undefined` \| `string`[]

返回扩展名数组（不含点号），如果未找到则返回 undefined

### 示例

```ts
getExtensionsFromMime('image/jpeg') // ['jpeg', 'jpg']
getExtensionsFromMime('audio/mp3') // ['mp3']
getExtensionsFromMime('unknown/type') // undefined
```

***

## getMimeFromExtension()

```ts
function getMimeFromExtension(ext: string): undefined | string;
```

根据文件扩展名获取对应的 MIME 类型

### 参数

#### ext

`string`

文件扩展名（不含点号）

### 返回

`undefined` \| `string`

返回对应的 MIME 类型，如果未找到则返回 undefined

### 示例

```ts
getMimeFromExtension('jpg') // 'image/jpeg'
getMimeFromExtension('mp4') // 'video/mp4'
getMimeFromExtension('unknown') // undefined
```
