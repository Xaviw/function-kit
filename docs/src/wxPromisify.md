[function-kit](index.md) / wxPromisify

# wxPromisify

## wxPromisify()

```ts
function wxPromisify<M>(method: M, options: CallbackifyParams<M>): Promise<CallbackifyResults<M>>
```

**`Miniprogram`**

将微信小程序的回调式异步 API 转换为 Promise 形式

### 类型参数

• **M** *extends* `Fn`

### 参数

#### method

`M`

要转换的异步方法（如 wx.request、wx.login 等）

#### options

`CallbackifyParams`\<`M`\>

方法的配置参数（不包含 success、fail 回调）

### 返回

`Promise`\<`CallbackifyResults`\<`M`\>\>

返回 Promise 对象，resolve 时传入 success 回调的参数，reject 时传入 fail 回调的参数

### 示例

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
