[function-kit](index.md) / Lru

# Lru

## Lru

简单 LRU (Least Recently Used) 缓存实现

### 示例

```ts
const cache = new Lru(2)
cache.set('a', 1)
cache.set('b', 2)
cache.get('a') // 1
cache.set('c', 3) // 'b' 会被删除
```

### 构造函数

#### 构造函数

```ts
new Lru(max?: number): Lru;
```

创建一个新的 LRU 缓存实例

##### 参数

###### max?

`number`

缓存的最大容量，默认为 Infinity

##### 返回

[`Lru`](#lru)

### 方法

#### clear()

```ts
clear(): void;
```

清空缓存

##### 返回

`void`

#### get()

```ts
get(key: string | number | symbol): any;
```

获取缓存中指定键的值，并将其移到最近使用的位置

##### 参数

###### key

要获取的键

`string` | `number` | `symbol`

##### 返回

`any`

键对应的值，如果键不存在则返回 null

#### has()

```ts
has(key: string | number | symbol): boolean;
```

检查缓存中是否存在指定的键

##### 参数

###### key

要检查的键

`string` | `number` | `symbol`

##### 返回

`boolean`

如果键存在则返回 true，否则返回 false

#### remove()

```ts
remove(key: string | number | symbol): void;
```

从缓存中移除指定的键值对

##### 参数

###### key

要移除的键

`string` | `number` | `symbol`

##### 返回

`void`

#### set()

```ts
set(key: string | number | symbol, value: any): void;
```

设置缓存中的键值对，如果缓存已满则移除最久未使用的项

##### 参数

###### key

要设置的键

`string` | `number` | `symbol`

###### value

`any`

要设置的值

##### 返回

`void`
