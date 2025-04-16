[function-kit](index.md) / tryit

# tryit

## TryitReturn\<Return\>

```ts
type TryitReturn<Return> = Return extends Promise<any> ? Promise<[Error, undefined] | [undefined, Awaited<Return>]> : [Error, undefined] | [undefined, Return];
```

### 类型参数

#### Return

`Return`

***

## tryit()

```ts
function tryit<Args, Return>(func: (...args: Args) => Return): (...args: Args) => TryitReturn<Return>;
```

包装一个函数，使其返回值转换为 [error, result] 的形式，用于优雅地处理错误

### 类型参数

#### Args

`Args` *extends* `any`[]

#### Return

`Return`

### 参数

#### func

(...`args`: `Args`) => `Return`

需要被包装的函数

### 返回

返回一个新函数，该函数返回 [error, result] 形式的结果

```ts
(...args: Args): TryitReturn<Return>;
```

#### 参数

##### args

...`Args`

#### 返回

[`TryitReturn`](#tryitreturn)\<`Return`\>

### 示例

```ts
const [err, result] = tryit(JSON.parse)('{"name": "test"}')
if (err) {
  console.error('解析失败:', err)
} else {
  console.log('解析结果:', result)
}

// 异步函数示例
const [err, user] = await tryit(fetchUser)(123)
if (err) {
  console.error('获取用户失败:', err)
} else {
  console.log('用户信息:', user)
}
```
