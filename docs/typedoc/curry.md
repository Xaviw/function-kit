[function-kit](index.md) / curry

# curry

## Curried()\<T\>

```ts
type Curried<T> = <A>(...args: A) => Parameters<T> extends [...A, ...(infer R)] ? R extends [] ? ReturnType<T> : Curried<(...args: R) => ReturnType<T>> : never;
```

### 类型参数

#### T

`T` *extends* (...`args`: `any`[]) => `any`

### 类型参数

#### A

`A` *extends* `any`[]

### 参数

#### args

...`A`

### 返回

`Parameters`\<`T`\> *extends* \[`...A`, `...(infer R)`\] ? `R` *extends* \[\] ? `ReturnType`\<`T`\> : [`Curried`](#curried)\<(...`args`: `R`) => `ReturnType`\<`T`\>\> : `never`

***

## curry()

```ts
function curry<T>(fn: T): Curried<T>
```

函数柯里化

### 类型参数

#### T

`T` *extends* (...`args`: `any`[]) => `any`

### 参数

#### fn

`T`

需要进行柯里化的原始函数

### 返回

[`Curried`](#curried)\<`T`\>

柯里化后的函数，可以分批次接收参数直到满足原函数参数数量

### 备注

柯里化后的函数会在接收足够数量参数后立即执行原函数，参数数量由原函数的.length属性决定

### 抛出

如果参数不是函数则抛出异常

### 示例

```ts
const add = curry((a: number, b: number) => a + b);
const addFive = add(5);
addFive(3); // 返回8
```
