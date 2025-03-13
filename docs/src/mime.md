[function-kit](index.md) / mime

# mime

## Functions

### getExtensionsFromMime()

```ts
function getExtensionsFromMime(mime: string): undefined | string[]
```

Defined in: [mime.ts:133](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/mime.ts#L133)

根据 MIME 类型获取对应的文件扩展名列表

#### Parameters

##### mime

`string`

MIME 类型字符串

#### Returns

`undefined` \| `string`[]

返回扩展名数组，如果未找到则返回 undefined

#### Example

```ts
getExtensionsFromMime('image/jpeg') // ['jpeg', 'jpg']
getExtensionsFromMime('audio/mp3') // ['mp3']
getExtensionsFromMime('unknown/type') // undefined
```

***

### getMimeFromExtension()

```ts
function getMimeFromExtension(ext: string): undefined | string
```

Defined in: [mime.ts:112](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/mime.ts#L112)

根据文件扩展名获取对应的 MIME 类型

#### Parameters

##### ext

`string`

文件扩展名（不含点号）

#### Returns

`undefined` \| `string`

返回对应的 MIME 类型，如果未找到则返回 undefined

#### Example

```ts
getMimeFromExtension('jpg') // 'image/jpeg'
getMimeFromExtension('mp4') // 'video/mp4'
getMimeFromExtension('unknown') // undefined
```
