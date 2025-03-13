[function-kit](index.md) / throttle

# throttle

## Functions

### throttle()

```ts
function throttle<F>(
   fn: F, 
   waitMilliseconds?: number, 
immediate?: boolean): CancelableFunction<F>
```

Defined in: [throttle.ts:25](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/throttle.ts#L25)

创建一个节流函数，限制函数在一定时间内只能执行一次

#### Type Parameters

• **F** *extends* `Fn`

#### Parameters

##### fn

`F`

要节流的函数

##### waitMilliseconds?

`number`

等待时间（毫秒），默认为 300

##### immediate?

`boolean` = `true`

是否立即执行，默认为 true。若为 false 则等待时间结束后才执行

#### Returns

`CancelableFunction`\<`F`\>

返回节流后的函数，该函数包含 cancel 方法用于取消等待中的定时器

#### Throws

当第一个参数不是函数时抛出类型错误

#### Example

```ts
// 基础用法
const throttled = throttle(() => console.log('scroll'), 1000)
window.addEventListener('scroll', throttled)

// 取消节流
const fn = throttle(() => {}, 1000)
fn.cancel()

// 延迟执行
const delayed = throttle(() => console.log('delayed'), 1000, false)
```
