[function-kit](index.md) / wxPromisify

# wxPromisify

## Functions

### wxPromisify()

```ts
function wxPromisify<M>(method: M, options: CallbackifyParams<M>): Promise<CallbackifyResults<M>>
```

Defined in: [wxPromisify.ts:23](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/wxPromisify.ts#L23)

**`Miniprogram`**

将微信小程序的回调式异步 API 转换为 Promise 形式

#### Type Parameters

• **M** *extends* `Fn`

#### Parameters

##### method

`M`

要转换的异步方法（如 wx.request、wx.login 等）

##### options

`CallbackifyParams`\<`M`\>

方法的配置参数（不包含 success、fail 回调）

#### Returns

`Promise`\<`CallbackifyResults`\<`M`\>\>

返回 Promise 对象，resolve 时传入 success 回调的参数，reject 时传入 fail 回调的参数

#### Example

```ts
// 转换 wx.login 接口
const res = await wxPromisify(wx.login, {})
console.log(res.code)

// 转换 wx.request 接口
const res = await wxPromisify(wx.request, {
  url: 'https://api.example.com/data',
  method: 'GET'
})
console.log(res.data)
```
