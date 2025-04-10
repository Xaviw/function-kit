[function-kit](index.md) / CanvasPoster

# CanvasPoster

## CanvasPoster

### 构造函数

#### new CanvasPoster()

```ts
new CanvasPoster(options: PosterOptions, componentThis?: any): CanvasPoster
```

**小程序中 node 为字符串时，必须传 width、height，否则为画布默认宽高**

##### 参数

###### options

`PosterOptions`

画布配置

###### componentThis?

`any`

options.node 为字符串，且在小程序组件中使用时必传，否则无法获取到 canvas 节点

##### 返回

[`CanvasPoster`](#canvasposter)

### 方法

#### draw()

```ts
draw(configs: PosterElements): Promise<void>
```

##### 参数

###### configs

`PosterElements`

##### 返回

`Promise`\<`void`\>

#### measure()

```ts
measure(content: PosterTextCommonOptions): Promise<TextMetrics>
```

##### 参数

###### content

`PosterTextCommonOptions`

##### 返回

`Promise`\<`TextMetrics`\>

#### measureHeight()

```ts
measureHeight(content: PosterText, maxWidth?: number): Promise<{
  height: number;
  width: number;
}>
```

##### 参数

###### content

`PosterText`

###### maxWidth?

`number`

##### 返回

`Promise`\<\{
  `height`: `number`;
  `width`: `number`;
 \}\>

***

## saveCanvasAsImage()

```ts
function saveCanvasAsImage(canvas: HTMLCanvasElement, options?: {
  fileName: string;
  quality: number;
  type: string;
}): Promise<unknown>
```

导出 canvas

### 参数

#### canvas

`HTMLCanvasElement`

#### options?

##### fileName?

`string`

##### quality?

`number`

##### type?

`string`

### 返回

`Promise`\<`unknown`\>
