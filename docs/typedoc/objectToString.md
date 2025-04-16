[function-kit](index.md) / objectToString

# objectToString

## objectToString()

```ts
function objectToString(val: any): string;
```

获取值的内部 [[Class]] 属性，等同于 Object.prototype.toString.call

### 参数

#### val

`any`

要获取类型的值

### 返回

`string`

返回形如 '[object Type]' 的字符串

### 示例

```ts
objectToString([]) // '[object Array]'
objectToString({}) // '[object Object]'
objectToString(null) // '[object Null]'
objectToString(new Date()) // '[object Date]'
```
