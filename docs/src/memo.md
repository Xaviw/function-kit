[function-kit](index.md) / memo

# memo

## MemoOptions\<Args\>

memo 函数配置选项

### 类型参数

#### Args

`Args` *extends* `any`[]

### 属性

#### expires?

```ts
optional expires: number;
```

缓存有效时长，单位毫秒，默认永不过期

#### key?

```ts
optional key: Fn<Args, string | number | symbol>;
```

调用传参映射到缓存 key 的方法，默认 JSON.stringify(argumentsArray)

#### lruMax?

```ts
optional lruMax: number;
```

使用 LRU 缓存算法，最多缓存多少个 key，默认不限制

***

## memo()

```ts
function memo<Args, R>(fn: Fn<Args, R>, options?: MemoOptions<Args>): Fn<Args, R>
```

创建一个带有缓存功能的记忆化函数

### 类型参数

#### Args

`Args` *extends* `any`[]

#### R

`R`

### 参数

#### fn

`Fn`\<`Args`, `R`\>

需要被记忆化的原函数

#### options?

[`MemoOptions`](#memooptions)\<`Args`\>

记忆化配置选项

### 返回

`Fn`\<`Args`, `R`\>

返回一个带有缓存功能的新函数

### 示例

```ts
// 基本用法
const cachedFn = memo(expensiveFunction);

// 使用自定义缓存键生成函数
const cachedFn = memo(userFetch, {
  key: (userId) => `user-${userId}`,
  expires: 60000 // 1分钟过期
});

// 使用LRU缓存限制最大缓存数量
const cachedFn = memo(heavyComputation, {
  lruMax: 100
});
```
