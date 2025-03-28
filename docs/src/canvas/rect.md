[function-kit](index.md) / canvas/rect

# canvas/rect

## CanvasRoundRectOptions

canvas 圆角矩形参数

### 属性

#### ctx

```ts
ctx: CanvasRenderingContext2D;
```

canvas 绘制上下文

#### h

```ts
h: number;
```

高度

#### r

```ts
r: number;
```

圆角半径

#### w

```ts
w: number;
```

宽度

#### x

```ts
x: number;
```

左上角 x

#### y

```ts
y: number;
```

左上角 y

***

## renderRect()

```ts
function renderRect(renderOptions: PosterRect, contextOptions: PosterElementRenderContext): void
```

**`Web`** **`Miniprogram`**

绘制 Canvas 矩形

### 参数

#### renderOptions

`PosterRect`

#### contextOptions

`PosterElementRenderContext`

### 返回

`void`

***

## roundRect()

```ts
function roundRect(options: CanvasRoundRectOptions): void
```

**`Web`** **`Miniprogram`**

canvas 圆角矩形

### 参数

#### options

[`CanvasRoundRectOptions`](#canvasroundrectoptions)

### 返回

`void`
