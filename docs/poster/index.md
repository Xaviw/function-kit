<script setup>
  import Text from './text.vue'
  import Image from './image.vue'
  import Rect from './rect.vue'
  import Line from './line.vue'
  import Example from './example.vue'
</script>

# Canvas 海报

类 CSS 规则配置式生成 Canvas 海报，支持相对定位、百分比尺寸，提供文字、图片、线条、矩形等配置式元素

## 使用方式

```js
// 渐变色或图案可在外部定义，再应用到配置中
const ctx = canvas.getContext('2d')
const gradient = ctx.createLinearGradient() // 省略详细定义

const poster = new CanvasPoster({
  node, // canvas 节点
  width, // 海报设计图宽度
  height, // 海报设计图高度
  dpr, // 可选的实际像素与物理像素比，默认获取设备像素比
})

poster.draw(
  [
    // 函数式
    ({ ctx, canvas, dpr }) => {
      // 自定义渲染
      // 或设置实例属性（注意理解实例状态的栈结构）
    },
    // 配置式
    {
      // 基础属性
      type, // 元素类型
      id, // 可选的元素 id，用于其他元素相对于本元素定位
      relativeTo, // 可选的相对定位元素 id，默认相对于画布

      // 布局属性
      left: 0,
      top: 0,
      width: ({ containerWidth, containerHeight }) => containerWidth * 0.5,
      height: ({ containerWidth, containerHeight }) => containerHeight * 0.5,

      // 更多属性
      backgroundColor: gradient, // 渐变色示例
    }
  ]
)
```

## 案例

<Example />

:::details 代码

```ts
const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')

  const gradient = ctx!.createLinearGradient(0, 900, 0, 1006)
  gradient.addColorStop(0, '#a55002')
  gradient.addColorStop(1, '#ffb470')

  const poster = new CanvasPoster({
    node: canvas.value!,
    width: 620,
    height: 1006,
  })

  const metrics = poster.measure({
    content: '姓名',
    fontSize: 44,
    fontWeight: 600,
    color: '#5d4d4a',
  })
  const nameWidth = metrics.width
  const nameHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent

  poster.draw([
    {
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/certificate-bg-long.png',
      width: ({ containerWidth }) => containerWidth,
      height: ({ containerHeight }) => containerHeight,
    },
    {
      id: 'a',
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/logo.png',
      top: 47.88,
      left: 47.86,
      height: 31.18,
    },
    {
      relativeTo: 'a',
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/logo.png',
      left: ({ containerWidth }) => containerWidth + 30,
      height: 31.18,
    },
    {
      id: 'b',
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/default_avatar.png',
      left: ({ containerWidth }) => (containerWidth - nameWidth - 60 - 20) / 2,
      top: 236,
      height: 60,
      width: 60,
    },
    {
      relativeTo: 'b',
      type: 'text',
      content: '姓名',
      top: ({ containerHeight }) => (containerHeight - nameHeight) / 2,
      left: ({ containerWidth }) => containerWidth + 20,
      fontSize: 44,
      fontWeight: 600,
      color: '#5d4d4a',
      lineHeight: h => h,
    },
    {
      type: 'text',
      content: 'X月X日参加了',
      top: 322,
      textAlign: 'center',
      fontSize: 32,
      color: '#5b4c49',
    },
    {
      type: 'text',
      content: '某某某某某某组织的某某某某某某活动',
      top: 396,
      textAlign: 'center',
      fontSize: 32,
      color: '#5b4c49',
      left: 72,
      right: 72,
      lineHeight: 48,
    },
    {
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/certificate-personal1.png',
      bottom: 118,
      left: 67,
      right: 67,
      height: 306,
      mode: 'aspectFit',
    },
    {
      type: 'text',
      content: '- 每步志愿路，都在铸就美好未来 -',
      top: 924,
      textAlign: 'center',
      fontSize: 32,
      color: gradient,
    },
  ])
})
```

:::

## 初始化

`CanvasPoster` 初始化时需要传入以下属性组成的对象：

| 属性名        | 说明                             |
| ------------- | -------------------------------- |
| `node`        | Canvas 元素                      |
| `width`       | 海报设计图宽度                   |
| `height`      | 海报设计图高度                   |
| `dpr`（可选） | 绘制像素比，不传会获取设备像素比 |

:::warning 注意
为避免海报变形，请保持 Canvas 元素宽高比与海报设计图宽高比一致
:::

## 文本 text

| 属性名                | 说明                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| `type`                | 元素类型，固定为 'text'                                                                                    |
| `content`             | 文本内容，支持字符串或对象数组，设置为数组时支持大部分同名样式属性                                         |
| `lineClamp`           | 最大行数，超出省略显示。height 小于内容高度时，会进行裁剪                                                  |
| `ellipsisContent`     | 超出省略时展示的字符，默认为 '...'                                                                         |
| `textAlign`           | 容器内的对齐方式，默认为 'left'，支持 'left'、'center'、'right'                                            |
| `width`               | 宽度，支持数字或返回数字的函数                                                                             |
| `height`              | 高度，支持数字或返回数字的函数                                                                             |
| `top`                 | 上边距，支持数字或返回数字的函数                                                                           |
| `right`               | 右边距，支持数字或返回数字的函数                                                                           |
| `bottom`              | 下边距，支持数字或返回数字的函数                                                                           |
| `left`                | 左边距，支持数字或返回数字的函数                                                                           |
| `rotate`              | 旋转角度，旋转不会改变元素盒模型，不会影响子元素相对定位                                                   |
| `lineHeight`          | 行高，数值或参数为字体高度返回数值的函数，默认为 1.2 倍行高                                                |
| `fontSize`            | 字体大小，默认值为 16                                                                                      |
| `fontFamily`          | 字体，默认值为 'sans-serif'                                                                                |
| `fontFamilySrc`       | 字体源文件地址                                                                                             |
| `fontWeight`          | 字体粗细，默认值为 'normal'，支持 100-900 或 'normal'/'bold'                                               |
| `color`               | 文本颜色，支持纯色、渐变或图案                                                                             |
| `textBaseLine`        | 基线位置，默认值为 'alphabetic'                                                                            |
| `letterSpacing`       | 字母间距                                                                                                   |
| `wordSpacing`         | 单词间距                                                                                                   |
| `fontStyle`           | 字体样式，默认值为 'normal'，支持 'normal' 或 'italic'                                                     |
| `textDecoration`      | 文本装饰线，支持 'underline'、'overline'、'line-through'                                                   |
| `textDecorationProps` | 文本装饰线的属性，包括 lineCap、lineColor、lineDash、lineDashOffset、lineJoin、lineWidth、miterLimit       |
| `textStyle`           | 文本样式，默认值为 'fill'，支持 'fill' 或 'stroke'                                                         |
| `strokeProps`         | 仅当 textStyle 为 'stroke' 时生效，包括 lineCap、lineDash、lineDashOffset、lineJoin、lineWidth、miterLimit |
| `backgroundColor`     | 文字底色，支持纯色、渐变或图案                                                                             |
| `shadowOffsetX`       | 阴影水平偏移量                                                                                             |
| `shadowOffsetY`       | 阴影垂直偏移量                                                                                             |
| `shadowBlur`          | 阴影模糊半径                                                                                               |
| `shadowColor`         | 阴影颜色                                                                                                   |

<Text />

::: tip 提示
Canvas 中使用自定义字体时需要确保字体加载完成再绘制，否则渲染会回退到使用默认字体

使用 `fontFamilySrc` 属性时，会在浏览器环境通过 [FontFace](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Font_Loading_API) API、小程序环境中可以通过 [wx.loadFontFace](https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html) API 加载字体
:::

::: details 代码

```ts
const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(0, 0, 280, 0)
  gradient.addColorStop(0, '#cf1322')
  gradient.addColorStop(1, '#389e0d')
  const poster = new CanvasPoster({
    node: canvas.value!,
    width: 688,
    height: 300,
  })

  poster.draw([
    {
      type: 'text',
      content: 'FontFamily 1234 !@#$',
      color: gradient,
      fontSize: 26,
      fontStyle: 'italic',
      fontFamily: 'Hanalei',
      fontFamilySrc: 'https://fonts.gstatic.font.im/s/hanaleifill/v22/fC1mPYtObGbfyQznIaQzPQi8UAjAhFqtag.woff2',
      letterSpacing: 6,
      shadowBlur: 2,
      shadowColor: '#00000033',
      shadowOffsetX: 6,
      shadowOffsetY: 6,
      textDecoration: 'underline',
      textStyle: 'stroke',
      wordSpacing: 6,
      backgroundColor: '#5cdbd348',
      lineHeight: h => h,
    },
    {
      type: 'text',
      top: 30,
      fontSize: 22,
      content: [
        {
          content: 'textBaseLine: top ',
          textBaseLine: 'top',
        },
        {
          content: 'hanging ',
          textBaseLine: 'hanging',
        },
        {
          content: 'middle ',
          textBaseLine: 'middle',
        },
        {
          content: 'alphabetic ',
          textBaseLine: 'alphabetic',
        },
        {
          content: 'ideographic ',
          textBaseLine: 'ideographic',
        },
        {
          content: 'bottom',
          textBaseLine: 'bottom',
        },
      ],
    },
    {
      type: 'text',
      top: 95,
      fontSize: 22,
      content: [
        {
          content: 'textDecoration: underline',
          textDecoration: 'underline',
          textDecorationProps: {
            lineColor: '#ff0000',
            lineWidth: 5,
            lineDash: [15, 5],
          },
        },
        {
          content: ' line-through ',
          textDecoration: 'line-through',
          textDecorationProps: {
            lineColor: '#00ff00',
            lineWidth: 5,
          },
        },
        {
          content: 'overline',
          textDecoration: 'overline',
          textDecorationProps: {
            lineColor: '#0000ff',
            lineWidth: 5,
          },
        },
      ],
    },
    {
      type: 'text',
      top: 145,
      fontSize: 22,
      content: 'textAlign: left',
      textAlign: 'left',
      backgroundColor: '#ff000044',
    },
    {
      type: 'text',
      top: 145,
      fontSize: 22,
      content: 'center',
      textAlign: 'center',
      backgroundColor: '#00ff0044',
    },
    {
      type: 'text',
      top: 145,
      fontSize: 22,
      content: 'right',
      textAlign: 'right',
      backgroundColor: '#0000ff44',
    },
    {
      id: 'a',
      type: 'text',
      fontSize: 22,
      top: 190,
      width: 220,
      content: '内容超出指定行数后省略显示，内容超出指定行数后省略显示，内容超出指定行数后省略显示',
      lineClamp: 3,
    },
    {
      relativeTo: 'a',
      type: 'text',
      fontSize: 22,
      left: ({ containerWidth }) => containerWidth * 1.2,
      width: 220,
      content: '自定义超出省略内容，自定义超出省略内容，自定义超出省略内容，自定义超出省略内容',
      lineClamp: 3,
      ellipsisContent: '~~~',
    },
  ])
})
```

:::

## 图片 image

| 属性名          | 说明                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------- |
| `src`           | 图片链接或 base64                                                                            |
| `sourceX`       | 裁剪图片的起点 X 坐标，支持数值或百分比（相对于图片宽度），默认 0                            |
| `sourceY`       | 裁剪图片的起点 Y 坐标，支持数值或百分比（相对于图片高度），默认 0                            |
| `sourceWidth`   | 裁剪图片宽度，支持数值或百分比（相对于图片宽度），默认值为图片宽度                           |
| `sourceHeight`  | 裁剪图片高度，支持数值或百分比（相对于图片高度），默认值为图片高度                           |
| `mode`          | 图片缩放模式，默认 'scaleToFill'，支持 'scaleToFill'、'aspectFit'、'aspectFill'              |
| `flipX`         | 沿 x 轴翻转                                                                                  |
| `flipY`         | 沿 y 轴翻转                                                                                  |
| `width`         | 支持数字或参数为父容器宽度、高度，自身宽度、高度的函数                                       |
| `height`        | 支持数字或参数为父容器宽度、高度，自身宽度、高度的函数                                       |
| `top`           | 支持数字或参数为父容器宽度、高度，自身宽度、高度的函数                                       |
| `right`         | 支持数字或参数为父容器宽度、高度，自身宽度、高度的函数                                       |
| `bottom`        | 支持数字或参数为父容器宽度、高度，自身宽度、高度的函数                                       |
| `left`          | 支持数字或参数为父容器宽度、高度，自身宽度、高度的函数                                       |
| `rotate`        | 旋转角度，旋转不会改变元素盒模型，不会影响子元素相对定位                                     |
| `shadowOffsetX` | 阴影水平偏移量                                                                               |
| `shadowOffsetY` | 阴影垂直偏移量                                                                               |
| `shadowBlur`    | 阴影模糊半径                                                                                 |
| `shadowColor`   | 阴影颜色                                                                                     |
| `border`        | 边框配置，包括 lineCap、lineColor、lineDash、lineDashOffset、lineJoin、lineWidth、miterLimit |
| `borderRadius`  | 圆角大小，支持数值或以自身宽、高对象为参数，返回数值的函数                                   |

<Image />

:::warning 注意
包含透明元素的图片阴影会以实际像素为准，但如果同时应用了 border 或者 borderRadius 则只有 border 形成形状的阴影（模拟实现），因为 canvas 中的 shadow 无法与裁剪较好的共存
:::

:::details 代码

```ts
const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(200, 0, 600, 0)
  gradient.addColorStop(0, '#cf1322')
  gradient.addColorStop(1, '#389e0d')
  const poster = new CanvasPoster({
    node: canvas.value!,
    width: 688,
    height: 300,
  })

  poster.draw([
    {
      id: 'a',
      type: 'image',
      src: '/logo.png',
      width: 94,
      height: 150,
      shadowBlur: 2,
      shadowColor: '#00000022',
      shadowOffsetX: 20,
      shadowOffsetY: 20,
    },
    {
      relativeTo: 'a',
      type: 'image',
      src: '/logo.png',
      left: ({ containerWidth }) => containerWidth,
      width: 94,
      height: 150,
      flipX: true,
      shadowBlur: 2,
      shadowColor: '#00000022',
      shadowOffsetX: 20,
      shadowOffsetY: 20,
    },
    {
      relativeTo: 'a',
      type: 'image',
      src: '/logo.png',
      top: ({ containerHeight }) => containerHeight,
      width: 94,
      height: 150,
      flipY: true,
    },
    {
      relativeTo: 'a',
      type: 'image',
      src: '/logo.png',
      top: ({ containerHeight }) => containerHeight,
      left: ({ containerWidth }) => containerWidth,
      width: 94,
      height: 150,
      flipX: true,
      flipY: true,
    },
    {
      type: 'image',
      src: '/logo.png',
      top: 103,
      left: 200,
      width: 94,
      height: 94,
      rotate: 90,
      mode: 'scaleToFill',
      border: {
        lineColor: gradient,
        lineDash: [5, 5],
        lineWidth: 5,
      },
      borderRadius: ({ selfWidth }) => selfWidth,
      shadowBlur: 2,
      shadowColor: '#00000022',
      shadowOffsetX: 20,
      shadowOffsetY: 20,
    },
    {
      type: 'image',
      src: '/logo.png',
      top: 103,
      left: 315,
      width: 94,
      height: 94,
      rotate: 180,
      mode: 'aspectFit',
      border: {
        lineColor: gradient,
        lineDash: [5, 5],
        lineWidth: 5,
      },
      borderRadius: ({ selfWidth }) => selfWidth,
      shadowBlur: 2,
      shadowColor: '#00000022',
      shadowOffsetX: 20,
      shadowOffsetY: 20,
    },
    {
      type: 'image',
      src: '/logo.png',
      top: 103,
      left: 430,
      width: 94,
      height: 94,
      rotate: 225,
      mode: 'aspectFill',
      border: {
        lineColor: gradient,
        lineWidth: 5,
      },
      borderRadius: ({ selfWidth }) => selfWidth,
    },
    {
      type: 'image',
      src: '/logo.png',
      top: 103,
      left: 545,
      width: 94,
      height: 94,
      sourceX: 0,
      border: {
        lineColor: gradient,
        lineWidth: 2,
      },
      borderRadius: ({ selfWidth }) => selfWidth,
      sourceY: ({ selfWidth, selfHeight }) => selfHeight - selfWidth,
      sourceWidth: ({ selfWidth }) => selfWidth,
      sourceHeight: ({ selfWidth }) => selfWidth,
    },
  ])
})
```

:::

## 矩形 Rect

| 属性名            | 说明                                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `type`            | 元素类型，固定为 'rect'                                                                      |
| `backgroundColor` | 背景颜色，支持纯色、渐变或图案                                                               |
| `width`           | 宽度，支持数字或返回数字的函数                                                               |
| `height`          | 高度，支持数字或返回数字的函数                                                               |
| `top`             | 上边距，支持数字或返回数字的函数                                                             |
| `right`           | 右边距，支持数字或返回数字的函数                                                             |
| `bottom`          | 下边距，支持数字或返回数字的函数                                                             |
| `left`            | 左边距，支持数字或返回数字的函数                                                             |
| `rotate`          | 旋转角度，旋转不会改变元素盒模型，不会影响子元素相对定位                                     |
| `shadowOffsetX`   | 阴影水平偏移量                                                                               |
| `shadowOffsetY`   | 阴影垂直偏移量                                                                               |
| `shadowBlur`      | 阴影模糊半径                                                                                 |
| `shadowColor`     | 阴影颜色                                                                                     |
| `border`          | 边框配置，包括 lineCap、lineColor、lineDash、lineDashOffset、lineJoin、lineWidth、miterLimit |
| `borderRadius`    | 边框圆角，支持数值或函数                                                                     |

<Rect />

:::details 代码

```ts
const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(244, 0, 444, 0)
  gradient.addColorStop(0, '#cf1322')
  gradient.addColorStop(1, '#389e0d')
  const poster = new CanvasPoster({
    node: canvas.value!,
    width: 688,
    height: 300,
  })

  poster.draw([
    {
      id: 'a',
      type: 'rect',
      width: 200,
      height: 200,
      left: ({ containerWidth }) => containerWidth * 0.5 - 100,
      top: ({ containerHeight }) => containerHeight * 0.5 - 100,
      backgroundColor: gradient,
      border: {
        lineWidth: 5,
        lineDash: [5, 5],
        lineColor: '#0000ff',
      },
      borderRadius: ({ selfWidth }) => selfWidth * 0.5,
      shadowBlur: 5,
      shadowColor: '#0000ff33',
      shadowOffsetX: 10,
      shadowOffsetY: 10,
    },
    {
      relativeTo: 'a',
      type: 'rect',
      left: ({ containerWidth }) => containerWidth * 0.2,
      top: ({ containerHeight }) => containerHeight * 0.2,
      width: ({ containerWidth }) => containerWidth * 0.6,
      height: ({ containerHeight }) => containerHeight * 0.6,
      rotate: 45,
      backgroundColor: '#0000ff',
      border: {
        lineWidth: 3,
        lineColor: '#ff0000',
      },
    },
  ])
})
```

:::

## 线条 Line

| 属性名           | 说明                                                     |
| ---------------- | -------------------------------------------------------- |
| `type`           | 元素类型，固定为 'line'                                  |
| `points`         | 线条顶点，可以为 2 个或多个                              |
| `lineWidth`      | 线条宽度，默认为 1                                       |
| `lineColor`      | 线条颜色，支持纯色、渐变或图案                           |
| `lineDash`       | 虚线样式                                                 |
| `lineDashOffset` | 虚线偏移量                                               |
| `lineCap`        | 线条端点样式，默认为 'butt'                              |
| `lineJoin`       | 线条连接处样式，默认为 'miter'                           |
| `miterLimit`     | 斜接限制比例，默认为 10                                  |
| `width`          | 宽度，支持数字或返回数字的函数                           |
| `height`         | 高度，支持数字或返回数字的函数                           |
| `top`            | 上边距，支持数字或返回数字的函数                         |
| `right`          | 右边距，支持数字或返回数字的函数                         |
| `bottom`         | 下边距，支持数字或返回数字的函数                         |
| `left`           | 左边距，支持数字或返回数字的函数                         |
| `rotate`         | 旋转角度，旋转不会改变元素盒模型，不会影响子元素相对定位 |
| `shadowOffsetX`  | 阴影水平偏移量                                           |
| `shadowOffsetY`  | 阴影垂直偏移量                                           |
| `shadowBlur`     | 阴影模糊半径                                             |
| `shadowColor`    | 阴影颜色                                                 |

<Line />

:::details 代码

```ts
const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(244, 0, 444, 0)
  gradient.addColorStop(0, '#cf1322')
  gradient.addColorStop(1, '#389e0d')
  const poster = new CanvasPoster({
    node: canvas.value!,
    width: 688,
    height: 300,
  })

  poster.draw([
    {
      id: 'a',
      type: 'line',
      points: [
        [244, 50],
        [444, 50],
        [244, 250],
        [444, 250],
      ],
      lineWidth: 5,
      lineColor: gradient,
      lineDash: [10, 10],
      lineDashOffset: 2,
      lineCap: 'round',
      lineJoin: 'round',
      miterLimit: 5,
      rotate: 15,
      shadowBlur: 5,
      shadowColor: '#0000ff33',
      shadowOffsetX: 10,
      shadowOffsetY: 10,
    },
    {
      relativeTo: 'a',
      type: 'line',
      points: [
        [({ containerWidth }) => containerWidth * -0.5, ({ containerHeight }) => containerHeight * 0.5],
        [({ containerWidth }) => containerWidth * 1.5, ({ containerHeight }) => containerHeight * 0.5],
      ],
      lineWidth: 5,
    },
  ])
})
```

:::
