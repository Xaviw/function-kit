[function-kit](index.md) / mapObject

# mapObject

## MapObjectIterator\<T, Res\>

```ts
type MapObjectIterator<T, Res> = Fn<[T[keyof T], keyof T], Res>;
```

### 类型参数

• **T** *extends* `Recordable`

• **Res**

***

## MapObjectResult\<T, Res\>

```ts
type MapObjectResult<T, Res> = { -readonly [key in keyof T]: Res };
```

### 类型参数

• **T** *extends* `Recordable`

• **Res**

***

## mapObject()

```ts
function mapObject<T, Res>(obj: T, iterator: MapObjectIterator<T, Res>): MapObjectResult<T, Res>
```

遍历对象的每个属性并返回一个新对象，类似数组的 map 方法

### 类型参数

• **T** *extends* `Recordable`

• **Res** = `any`

### 参数

#### obj

`T`

要遍历的对象

#### iterator

[`MapObjectIterator`](mapObject.md#mapobjectiteratort-res)\<`T`, `Res`\>

遍历函数，接收属性值和属性名作为参数

### 返回

[`MapObjectResult`](mapObject.md#mapobjectresultt-res)\<`T`, `Res`\>

返回一个新对象，包含遍历函数处理后的结果

### 抛出

当 iterator 不是函数时抛出类型错误

### 示例

```ts
mapObject({ a: 1, b: 2 }, val => val * 2) // { a: 2, b: 4 }
mapObject({ x: 'hello', y: 'world' }, (val, key) => `${key}_${val}`)
// { x: 'x_hello', y: 'y_world' }
mapObject({}, val => val) // {}
```
