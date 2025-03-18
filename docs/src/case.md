[function-kit](index.md) / case

# case

## camelCase()

```ts
function camelCase(str: string): string
```

将字符串转换为小驼峰命名格式

### 参数

#### str

`string`

要转换的字符串

### 返回

`string`

驼峰命名格式的字符串

### 示例

```ts
camelCase('hello-world') // => 'helloWorld'
camelCase('HelloWorld') // => 'helloWorld'
```

***

## kebabCase()

```ts
function kebabCase(str: string): string
```

将字符串转换为短横线命名格式

### 参数

#### str

`string`

要转换的字符串

### 返回

`string`

短横线命名格式的字符串

### 示例

```ts
kebabCase('helloWorld') // => 'hello-world'
kebabCase('HelloWorld') // => 'hello-world'
```

***

## pascalCase()

```ts
function pascalCase(str: string): string
```

将字符串转换为大驼峰命名格式

### 参数

#### str

`string`

要转换的字符串

### 返回

`string`

大驼峰命名格式的字符串

### 示例

```ts
pascalCase('hello-world') // => 'HelloWorld'
pascalCase('helloWorld') // => 'HelloWorld'
```

***

## snakeCase()

```ts
function snakeCase(str: string): string
```

将字符串转换为下划线命名格式

### 参数

#### str

`string`

要转换的字符串

### 返回

`string`

下划线命名格式的字符串

### 示例

```ts
snakeCase('helloWorld') // => 'hello_world'
snakeCase('HelloWorld') // => 'hello_world'
```

***

## splitCase()

```ts
function splitCase(str: string): string[]
```

将字符串按照常见的命名规则分割为单词数组

### 参数

#### str

`string`

要分割的字符串

### 返回

`string`[]

分割后的单词数组

### 示例

```ts
splitCase('helloWorld') // => ['hello', 'world']
splitCase('hello-world') // => ['hello', 'world']
splitCase('hello_world') // => ['hello', 'world']
splitCase('hello.world') // => ['hello', 'world']
splitCase('hello world') // => ['hello', 'world']
```

***

## upperFirst()

```ts
function upperFirst(str: string): string
```

将字符串的第一个字符转换为大写

### 参数

#### str

`string`

要转换的字符串

### 返回

`string`

首字母大写的字符串

### 示例

```ts
upperFirst('hello') // => 'Hello'
```

***

## upperSnakeCase()

```ts
function upperSnakeCase(str: string): string
```

将字符串转换为大写下划线命名格式

### 参数

#### str

`string`

要转换的字符串

### 返回

`string`

大写下划线命名格式的字符串

### 示例

```ts
upperSnakeCase('helloWorld') // => 'HELLO_WORLD'
upperSnakeCase('HelloWorld') // => 'HELLO_WORLD'
```
