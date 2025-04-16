[function-kit](index.md) / search

# search

## FuzzySearchOptions

### 属性

#### caseSensitive?

```ts
optional caseSensitive: boolean;
```

是否区分大小写，默认为 true

#### fuzzy?

```ts
optional fuzzy: boolean;
```

是否启用模糊搜索，默认为 false（仅当搜索值和目标值都是字符串时生效）

#### key?

```ts
optional key: string;
```

当数组项为对象时，指定要搜索的属性路径，支持嵌套路径（如 'user.name'）

***

## search()

```ts
function search<T>(
   target: any, 
   sources: T[], 
   options?: FuzzySearchOptions): T[];
```

在数组中搜索满足条件的项

### 类型参数

#### T

`T`

### 参数

#### target

`any`

要搜索的值，当为字符串时支持模糊匹配

#### sources

`T`[]

要搜索的源数组

#### options?

[`FuzzySearchOptions`](#fuzzysearchoptions)

搜索选项配置

### 返回

`T`[]

返回所有匹配项组成的数组

### 示例

```ts
// 简单值搜索
search(1, [1, 2, 3]) // [1]

// 对象数组搜索
search('John', [{ name: 'John' }, { name: 'Jane' }], { key: 'name' }) // [{ name: 'John' }]

// 模糊搜索
search('jo', [{ name: 'John' }, { name: 'Jane' }], {
  key: 'name',
  fuzzy: true,
  caseSensitive: false
}) // [{ name: 'John' }]
```
