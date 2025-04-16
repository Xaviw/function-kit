[function-kit](index.md) / mapObject

# mapObject

## MapObjectIterator\<T\>

```ts
type MapObjectIterator<T> = Fn<[keyof T, T[keyof T]], [Key, any]>;
```

### 类型参数

#### T

`T` *extends* `Recordable`

***

## mapObject()

```ts
function mapObject<T>(obj: T, iterator: MapObjectIterator<T>): Recordable;
```

遍历对象的每个键值并返回一个新对象，类似数组的 map 方法

### 类型参数

#### T

`T` *extends* `Recordable`

### 参数

#### obj

`T`

要遍历的对象

#### iterator

[`MapObjectIterator`](#mapobjectiterator)\<`T`\>

遍历函数，接收属性名和属性值作为参数，返回新的属性名和属性值元组

### 返回

`Recordable`

返回一个新对象，包含遍历函数处理后的结果

### 抛出

当 iterator 不是函数时抛出类型错误

### 示例

```ts
mapObject({ a: 1, b: 2 }, (key, val) => [key, val * 2]) // { a: 2, b: 4 }
mapObject({ x: 'hello', y: 'world' }, (key, val) => [key.toUpperCase(), `${key}_${val}`])
// { X: 'x_hello', Y: 'y_world' }
mapObject({}, (key, val) => [key, val]) // {}
```
