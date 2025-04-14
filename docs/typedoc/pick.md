[function-kit](index.md) / pick

# pick

## pick()

```ts
function pick<T, K>(obj: T, keys: readonly K[]): Pick<T, K>
```

从对象中提取指定的属性，创建一个新的对象

### 类型参数

#### T

`T` *extends* `object`

#### K

`K` *extends* `string` \| `number` \| `symbol`

### 参数

#### obj

`T`

源对象

#### keys

readonly `K`[]

要提取的属性键数组

### 返回

`Pick`\<`T`, `K`\>

包含指定属性的新对象

### 示例

```ts
const user = { name: 'John', age: 30, email: 'john@example.com' };
const picked = pick(user, ['name', 'age']);
// 结果: { name: 'John', age: 30 }
```
