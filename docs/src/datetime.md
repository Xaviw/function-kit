[function-kit](index.md) / datetime

# datetime

## Functions

### isLeapYear()

```ts
function isLeapYear(year: number): boolean
```

Defined in: [datetime.ts:19](https://github.com/Xaviw/function-kit/blob/98b9f91b74d378f39744fe7ad3262547892c04f0/src/datetime.ts#L19)

判断年份是否是闰年

#### Parameters

##### year

`number`

要判断的年份

#### Returns

`boolean`

如果是闰年返回 true，否则返回 false

#### Example

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
