[function-kit](../index.md) / canvas/image

# canvas/image

## renderImage()

```ts
function renderImage(renderOptions: Omit<PosterImage, "type">, contextOptions: PosterElementRenderContext & {
  canvas: HTMLCanvasElement;
}): Promise<void>
```

**`Web`** **`Miniprogram`**

绘制 Canvas 图片

### 参数

#### renderOptions

`Omit`\<`PosterImage`, `"type"`\>

#### contextOptions

`PosterElementRenderContext` & \{
  `canvas`: `HTMLCanvasElement`;
 \}

### 返回

`Promise`\<`void`\>
