[function-kit](index.md) / throttle

# throttle

## throttle()

```ts
function throttle<F>(
   fn: F, 
   waitMilliseconds?: number, 
immediate?: boolean): CancelableFunction<F>;
```

创建一个节流函数，限制函数在一定时间内只能执行一次

### 类型参数

#### F

`F` *extends* `Fn`

### 参数

#### fn

`F`

要节流的函数

#### waitMilliseconds?

`number`

等待时间（毫秒），默认为 300

#### immediate?

`boolean` = `true`

是否立即执行，默认为 true。若为 false 则等待时间结束后才执行

### 返回

`CancelableFunction`\<`F`\>

返回节流后的函数，该函数包含 cancel 方法用于取消等待中的定时器

### 抛出

当第一个参数不是函数时抛出类型错误

### 示例

```ts
// 立即执行模式
const fn1 = throttle(console.log, 1000)
fn1('a') // 立即输出 'a'
fn1('b') // 被忽略

// 延迟执行模式
const fn2 = throttle(console.log, 1000, false)
fn2('a') // 被忽略
fn2('b') // 1秒后输出 'b'

// 立即执行时调用 cancel
const fn3 = throttle(console.log, 1000)
fn3('a') // 立即输出 'a'
fn3.cancel() // 取消运行中的等待
fn3('b') // 立即输出 'b'

// 非立即执行时调用 cancel
const fn4 = throttle(console.log, 1000, false)
fn4('a') // 被忽略
fn4.cancel() // 取消运行中的等待
```
