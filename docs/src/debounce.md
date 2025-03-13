[function-kit](index.md) / debounce

# debounce

## Functions

### debounce()

```ts
function debounce<F>(
   fn: F, 
   waitMilliseconds?: number, 
immediate?: boolean): CancelableFunction<F>
```

Defined in: [debounce.ts:29](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/debounce.ts#L29)

创建一个防抖函数，用于限制函数的执行频率

#### Type Parameters

• **F** *extends* `Fn`

#### Parameters

##### fn

`F`

要防抖的函数

##### waitMilliseconds?

`number`

等待时间，单位为毫秒，默认为 300

##### immediate?

`boolean` = `true`

是否立即执行，默认为 true。true 时首次调用立即执行，false 时等待结束后执行

#### Returns

`CancelableFunction`\<`F`\>

返回防抖后的函数，该函数包含 cancel 方法用于取消等待中的执行

#### Throws

当第一个参数不是函数时抛出类型错误

#### Example

```ts
// 立即执行模式
const debouncedFn = debounce(console.log, 1000)
debouncedFn('a') // 立即输出 'a'
debouncedFn('b') // 被忽略

// 延迟执行模式
const delayedFn = debounce(console.log, 1000, false)
delayedFn('a') // 1秒后输出 'a'
delayedFn('b') // 重置定时器，1秒后输出 'b'

// 取消防抖
const fn = debounce(() => {}, 1000)
fn()
fn.cancel() // 取消等待中的执行
```
