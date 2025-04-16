[function-kit](index.md) / omit

# omit

## omit()

```ts
function omit<T, TKeys>(obj: T, keys: TKeys[]): Omit<T, TKeys>;
```

从对象中排除指定的属性，返回新对象

### 类型参数

#### T

`T` *extends* `Recordable`

#### TKeys

`TKeys` *extends* `string` \| `number` \| `symbol`

### 参数

#### obj

`T`

源对象

#### keys

`TKeys`[]

要排除的属性键数组

### 返回

`Omit`\<`T`, `TKeys`\>

排除指定属性后的新对象

### 示例

```ts
const user = { name: 'Tom', age: 18, gender: 'male' };
const result = omit(user, ['age', 'gender']);
// result: { name: 'Tom' }
```
