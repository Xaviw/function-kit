[function-kit](index.md) / search

# search

## Functions

### search()

```ts
function search<T>(
   target: any, 
   sources: T[], 
   options?: FuzzySearchOptions): T[]
```

Defined in: [search.ts:36](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/search.ts#L36)

在数组中搜索满足条件的项

#### Type Parameters

• **T**

#### Parameters

##### target

`any`

要搜索的值，当为字符串时支持模糊匹配

##### sources

`T`[]

要搜索的源数组

##### options?

`FuzzySearchOptions`

搜索选项配置

#### Returns

`T`[]

返回所有匹配项组成的数组

#### Example

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
