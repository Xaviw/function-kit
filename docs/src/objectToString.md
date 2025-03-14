[function-kit](index.md) / objectToString

# objectToString

## Functions

### objectToString()

```ts
function objectToString(val: any): string
```

Defined in: [objectToString.ts:13](https://github.com/Xaviw/function-kit/blob/84d58cf5bffabbabf64b9123683e107f26af04ae/src/objectToString.ts#L13)

获取值的内部 [[Class]] 属性，等同于 Object.prototype.toString.call

#### Parameters

##### val

`any`

要获取类型的值

#### Returns

`string`

返回形如 '[object Type]' 的字符串

#### Example

```ts
objectToString([]) // '[object Array]'
objectToString({}) // '[object Object]'
objectToString(null) // '[object Null]'
objectToString(new Date()) // '[object Date]'
```
