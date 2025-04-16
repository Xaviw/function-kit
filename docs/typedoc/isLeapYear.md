[function-kit](index.md) / isLeapYear

# isLeapYear

## isLeapYear()

```ts
function isLeapYear(year: number): boolean;
```

判断年份是否是闰年

### 参数

#### year

`number`

要判断的年份

### 返回

`boolean`

如果是闰年返回 true，否则返回 false

### 示例

```ts
// 世纪闰年
isLeapYear(2000) // true
isLeapYear(1900) // false

// 普通闰年
isLeapYear(2008) // true
isLeapYear(2023) // false

// 非法输入
isLeapYear(NaN) // false
```
