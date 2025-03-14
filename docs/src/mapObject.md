[function-kit](index.md) / mapObject

# mapObject

## Type Aliases

### MapObjectIterator\<T, Res\>

```ts
type MapObjectIterator<T, Res> = Fn<[T[keyof T], keyof T], Res>;
```

Defined in: [mapObject.ts:4](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/mapObject.ts#L4)

#### Type Parameters

• **T** *extends* `Recordable`

• **Res**

***

### MapObjectResult\<T, Res\>

```ts
type MapObjectResult<T, Res> = { -readonly [key in keyof T]: Res };
```

Defined in: [mapObject.ts:6](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/mapObject.ts#L6)

#### Type Parameters

• **T** *extends* `Recordable`

• **Res**

## Functions

### mapObject()

```ts
function mapObject<T, Res>(obj: T, iterator: MapObjectIterator<T, Res>): MapObjectResult<T, Res>
```

Defined in: [mapObject.ts:24](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/mapObject.ts#L24)

遍历对象的每个属性并返回一个新对象，类似数组的 map 方法

#### Type Parameters

• **T** *extends* `Recordable`

• **Res** = `any`

#### Parameters

##### obj

`T`

要遍历的对象

##### iterator

[`MapObjectIterator`](mapObject.md#mapobjectiteratort-res)\<`T`, `Res`\>

遍历函数，接收属性值和属性名作为参数

#### Returns

[`MapObjectResult`](mapObject.md#mapobjectresultt-res)\<`T`, `Res`\>

返回一个新对象，包含遍历函数处理后的结果

#### Throws

当 iterator 不是函数时抛出类型错误

#### Example

```ts
mapObject({ a: 1, b: 2 }, val => val * 2) // { a: 2, b: 4 }
mapObject({ x: 'hello', y: 'world' }, (val, key) => `${key}_${val}`)
// { x: 'x_hello', y: 'y_world' }
mapObject({}, val => val) // {}
```
