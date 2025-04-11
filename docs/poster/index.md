<script setup>
  import Text from './text.vue'
  import Image from './image.vue'
  import Rect from './rect.vue'
  import Line from './line.vue'
  import Example from './example.vue'
</script>

# Canvas 海报

类 CSS 规则配置式生成 Canvas 海报，支持相对定位、相对尺寸。提供文字、图片、线条、矩形等配置式元素

## 使用方式

```ts
// 渐变色或图案可在外部定义，再应用到配置中
const ctx = canvas.getContext('2d')
const gradient = ctx.createLinearGradient() // 省略详细定义
const gradientItem: PosterText = {
  // 省略具体定义
}

const poster = new CanvasPoster(
  {
    node, // canvas 节点或 selector 字符串
    width, // 可选的海报设计图宽度
    height, // 可选的海报设计图高度
    dpr, // 可选的实际像素与物理像素比，默认获取设备像素比
  },
  this, // 小程序组件中使用时必传
)

poster.draw(
  [
    // 函数式
    ({ ctx, canvas, dpr }) => {
      // 自定义渲染或设置实例属性等（注意理解实例状态的栈结构，使用不当会影响后续渲染）

      // 在函数项中定义绘制需要的属性时，注意需要赋值到对象中
      // 因为 draw 方法是异步的，简单值作为配置属性时赋值还未完成
      gradientItem.color = ctx.createLinearGradient() // 省略详细定义
    },
    // 配置式
    {
      // 基础属性
      type, // 元素类型
      id, // 可选的元素 id，用于其他元素相对于本元素定位以及设置相对尺寸
      relativeTo, // 可选的相对定位元素 id，默认相对于画布

      // 布局属性（line 例外）
      left: 0,
      top: 0,
      width: ({ containerWidth }) => containerWidth * 0.5,
      height: ({ containerHeight }) => containerHeight * 0.5,

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
const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  const poster = new CanvasPoster({
    node: 'canvas',
  })

  const gradientText: PosterText = {
    type: 'text',
    content: '- 每步志愿路，都在铸就美好未来 -',
    top: 924,
    textAlign: 'center',
    fontSize: 32,
  }

  let nameWidth: number
  let nameHeight: number

  poster.draw([
    async ({ ctx, canvas: node }) => {
      canvas.value = node

      const gradient = ctx.createLinearGradient(0, 900, 0, 1006)
      gradient.addColorStop(0, '#a55002')
      gradient.addColorStop(1, '#ffb470')
      gradientText.color = gradient

      const metrics = await poster.measure({
        content: '姓名',
        fontSize: 44,
        fontWeight: 600,
        color: '#5d4d4a',
      })
      nameWidth = metrics.width
      nameHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
    },
    {
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/certificate-bg-long.png',
      width: ({ containerWidth }) => containerWidth - 20,
      height: ({ containerHeight }) => containerHeight - 20,
      top: 10,
      left: 10,
      border: {
        lineColor: '#ffc069',
        lineWidth: 10,
      },
      borderRadius: 40,
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
    gradientText,
  ])
})
```

:::

## 初始化

`CanvasPoster` 初始化时需要传入以下属性组成的对象：

| 属性名   | 说明                                                   |
| -------- | ------------------------------------------------------ |
| \*`node` | Canvas 元素或 selector 字符串                          |
| `width`  | 海报设计图宽度（小程序中使用，且 node 为字符串时必传） |
| `height` | 海报设计图高度（小程序中使用，且 node 为字符串时必传） |
| `dpr`    | 绘制像素比，不传会获取设备像素比                       |

:::warning 注意
为避免海报变形，请保持 Canvas 元素宽高比与海报设计图宽高比一致
:::

## 文本 text

| 属性名                | 说明                                                                                                                                                 | 默认值                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| \*`type`              | 固定为 `text`                                                                                                                                        | -                        |
| \*`content`           | 文本内容，支持空格，不支持其他控制字符；为数组时可以分别设置样式                                                                                     | -                        |
| `width`               | 宽度，支持数值或基于容器尺寸的函数                                                                                                                   | -                        |
| `height`              | 高度，支持数值或基于容器尺寸的函数                                                                                                                   | -                        |
| `top`                 | 顶部偏移，支持数值或基于容器尺寸的函数                                                                                                               | -                        |
| `right`               | 右侧偏移，支持数值或基于容器尺寸的函数                                                                                                               | -                        |
| `bottom`              | 底部偏移，支持数值或基于容器尺寸的函数                                                                                                               | -                        |
| `left`                | 左侧偏移，支持数值或基于容器尺寸的函数                                                                                                               | -                        |
| `rotate`              | 旋转角度，不会改变元素盒模型，不影响子元素相对定位                                                                                                   | -                        |
| `id`                  | 用于相对定位的标识符                                                                                                                                 | -                        |
| `relativeTo`          | 相对于某个 id 对应的元素进行定位（注意避免循环依赖）                                                                                                 | -                        |
| `fontSize`            | 文字大小                                                                                                                                             | `16`                     |
| `fontFamily`          | 字体                                                                                                                                                 | `'sans-serif'`           |
| `fontFamilySrc`       | 字体资源地址                                                                                                                                         | -                        |
| `fontWeight`          | 字体粗细，可选值：`100`、`200`、`300`、`400`、`500`、`600`、`700`、`800`、`900`、`'normal'`、`'bold'`                                                | `'normal'`               |
| `fontStyle`           | 字体样式，可选值：`'normal'`、`'italic'`                                                                                                             | `'normal'`               |
| `color`               | 文字颜色，支持渐变和图案                                                                                                                             | -                        |
| `lineHeight`          | 文本行高，支持数值或接收文本高度返回数值的函数                                                                                                       | `(h: number) => 1.2 * h` |
| `textAlign`           | 容器内的对齐方式，可选值：`'left'`、`'center'`、`'right'`                                                                                            | `'left'`                 |
| `textBaseline`        | 基线位置为起点 Y 坐标加基线上方文字高度（含上方的lineHeight），可选值：`'top'`、`'hanging'`、`'middle'`、`'alphabetic'`、`'ideographic'`、`'bottom'` | `'alphabetic'`           |
| `letterSpacing`       | 字母间距                                                                                                                                             | -                        |
| `wordSpacing`         | 词间距                                                                                                                                               | -                        |
| `lineClamp`           | 最大行数，超出省略显示                                                                                                                               | -                        |
| `ellipsisContent`     | 超出省略时展示的字符                                                                                                                                 | `'...'`                  |
| `textDecoration`      | 文本装饰线，可选值：`'underline'`、`'overline'`、`'line-through'`                                                                                    | -                        |
| `textDecorationProps` | 文本装饰线属性，可包含：`'lineCap'`、`'lineColor'`、`'lineDash'`、`'lineDashOffset'`、`'lineJoin'`、`'lineWidth'`、`'miterLimit'`                    | -                        |
| `textStyle`           | 填充或镂空，可选值：`'fill'`、`'stroke'`                                                                                                             | `'fill'`                 |
| `strokeProps`         | 仅 textStyle='stroke' 时生效的线条属性，可包含：`'lineCap'`、`'lineDash'`、`'lineDashOffset'`、`'lineJoin'`、`'lineWidth'`、`'miterLimit'`           | -                        |
| `backgroundColor`     | 文字底色                                                                                                                                             | -                        |
| `shadowOffsetX`       | 阴影 X 轴偏移                                                                                                                                        | -                        |
| `shadowOffsetY`       | 阴影 Y 轴偏移                                                                                                                                        | -                        |
| `shadowBlur`          | 阴影模糊程度                                                                                                                                         | -                        |
| `shadowColor`         | 阴影颜色                                                                                                                                             | -                        |

<Text />

::: tip 提示
Canvas 中使用自定义字体时需要确保字体加载完成再绘制，否则渲染会回退到使用默认字体

`fontFamilySrc` 属性会在浏览器环境通过 [FontFace](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Font_Loading_API) API、小程序环境中可以通过 [wx.loadFontFace](https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html) API 完成加载字体

**text 元素没有显式定义宽度时，即使有相对定位的元素，最大宽度还是从起点到画布右边界**
:::

`CanvasPoster` 实例对象上还提供了 `measure` 方法，用于接收单个文本段配置对象后（`content` 属性为数组时可接收的对象），返回文本的 [TextMetrics](https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics) 对象（不会换行）

以及 `measureHeight` 方法，用于接收与完整配置一致的配置对象及可选的最大宽度（默认为画布宽度）后，返回文本换行后的总高度和全部文本累计的总宽度

:::warning 注意
实测小程序真机中（未大规模测试），canvas measure 方法返回的对象只有 `width`、`fontBoundingBoxAscent`、`fontBoundingBoxDescent` 属性，且 `fontBoundingBoxAscent`、`fontBoundingBoxDescent` 不会随着 `textBaseline` 属性变化

所以在小程序中使用 text 时慎用 `textBaseline` 属性
:::

::: details 代码

```ts
const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(0, 0, 500, 0)
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
      content: [
        {
          content: '测试',
          fontFamily: 'ZCOOL KuaiLe',
          fontFamilySrc: 'https://fonts.gstatic.com/s/zcoolkuaile/v19/tssqApdaRQokwFjFJjvM6h2Wo-Tpo2MpsrpYU3EJjXfOiTrBdUtGm0PGsPHkbHZzpr3G.116.woff2',
        },
        {
          content: ' Font Family',
          fontFamily: 'Underdog',
          fontFamilySrc: 'https://gstatic.loli.net/s/underdog/v23/CHygV-jCElj7diMroWSlWV8.woff2',
          textStyle: 'stroke',
        },
      ],
      color: gradient,
      fontSize: 26,
      fontStyle: 'italic',
      letterSpacing: 4,
      shadowBlur: 2,
      shadowColor: '#00000033',
      shadowOffsetX: 6,
      shadowOffsetY: 6,
      textDecoration: 'underline',
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
          content: 'textBaseline: top ',
          textBaseline: 'top',
        },
        {
          content: 'hanging ',
          textBaseline: 'hanging',
        },
        {
          content: 'middle ',
          textBaseline: 'middle',
        },
        {
          content: 'alphabetic ',
          textBaseline: 'alphabetic',
        },
        {
          content: 'ideographic ',
          textBaseline: 'ideographic',
        },
        {
          content: 'bottom',
          textBaseline: 'bottom',
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

| 属性名          | 说明                                                                                                                        | 默认值                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| \*`type`        | 固定为 `image`                                                                                                              | -                                  |
| \*`src`         | 图片链接或 base64                                                                                                           | -                                  |
| `width`         | 宽度，支持数值或基于容器尺寸和自身尺寸的函数                                                                                | -                                  |
| `height`        | 高度，支持数值或基于容器尺寸和自身尺寸的函数                                                                                | -                                  |
| `top`           | 顶部偏移，支持数值或基于容器尺寸和自身尺寸的函数                                                                            | -                                  |
| `right`         | 右侧偏移，支持数值或基于容器尺寸和自身尺寸的函数                                                                            | -                                  |
| `bottom`        | 底部偏移，支持数值或基于容器尺寸和自身尺寸的函数                                                                            | -                                  |
| `left`          | 左侧偏移，支持数值或基于容器尺寸和自身尺寸的函数                                                                            | -                                  |
| `sourceX`       | 裁剪图片的起点 X 坐标                                                                                                       | `0`                                |
| `sourceY`       | 裁剪图片的起点 Y 坐标                                                                                                       | `0`                                |
| `sourceWidth`   | 裁剪图片宽度                                                                                                                | `({ imageWidth }) => imageWidth`   |
| `sourceHeight`  | 裁剪图片高度，支持数值或相对于图片高度的百分比                                                                              | `({ imageHeight }) => imageHeight` |
| `mode`          | 图片缩放模式，仅容器有固定宽高时生效，可选值：`'scaleToFill'`、`'aspectFill'`、`'aspectFit'`                                | `'scaleToFill'`                    |
| `flipX`         | 沿 x 轴翻转                                                                                                                 | -                                  |
| `flipY`         | 沿 y 轴翻转                                                                                                                 | -                                  |
| `rotate`        | 旋转角度，不会改变元素盒模型，不影响子元素相对定位                                                                          | -                                  |
| `border`        | 边框属性，可包含：`'lineCap'`、`'lineColor'`、`'lineDash'`、`'lineDashOffset'`、`'lineJoin'`、`'lineWidth'`、`'miterLimit'` | -                                  |
| `borderRadius`  | 圆角大小，支持数值或基于容器尺寸和自身尺寸的函数                                                                            | -                                  |
| `shadowOffsetX` | 阴影 X 轴偏移                                                                                                               | -                                  |
| `shadowOffsetY` | 阴影 Y 轴偏移                                                                                                               | -                                  |
| `shadowBlur`    | 阴影模糊程度                                                                                                                | -                                  |
| `shadowColor`   | 阴影颜色                                                                                                                    | -                                  |
| `id`            | 用于相对定位的标识符                                                                                                        | -                                  |
| `relativeTo`    | 相对于某个 id 对应的元素进行定位（注意避免循环依赖）                                                                        | -                                  |

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

| 属性名            | 说明                                                                                                                        | 默认值 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- | ------ |
| \*`type`          | 固定为 `rect`                                                                                                               | -      |
| `backgroundColor` | 背景颜色，支持渐变和图案                                                                                                    | -      |
| `border`          | 边框属性，可包含：`'lineCap'`、`'lineColor'`、`'lineDash'`、`'lineDashOffset'`、`'lineJoin'`、`'lineWidth'`、`'miterLimit'` | -      |
| `borderRadius`    | 圆角大小，支持数值或基于容器尺寸和自身尺寸的函数                                                                            | -      |
| `width`           | 宽度，支持数值或基于容器尺寸的函数                                                                                          | -      |
| `height`          | 高度，支持数值或基于容器尺寸的函数                                                                                          | -      |
| `top`             | 顶部偏移，支持数值或基于容器尺寸的函数                                                                                      | -      |
| `right`           | 右侧偏移，支持数值或基于容器尺寸的函数                                                                                      | -      |
| `bottom`          | 底部偏移，支持数值或基于容器尺寸的函数                                                                                      | -      |
| `left`            | 左侧偏移，支持数值或基于容器尺寸的函数                                                                                      | -      |
| `rotate`          | 旋转角度，不会改变元素盒模型，不影响子元素相对定位                                                                          | -      |
| `shadowOffsetX`   | 阴影 X 轴偏移                                                                                                               | -      |
| `shadowOffsetY`   | 阴影 Y 轴偏移                                                                                                               | -      |
| `shadowBlur`      | 阴影模糊程度                                                                                                                | -      |
| `shadowColor`     | 阴影颜色                                                                                                                    | -      |
| `id`              | 用于相对定位的标识符                                                                                                        | -      |
| `relativeTo`      | 相对于某个 id 对应的元素进行定位（注意避免循环依赖）                                                                        | -      |

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

| 属性名           | 说明                                                  | 默认值    |
| ---------------- | ----------------------------------------------------- | --------- |
| \*`type`         | 固定为 `line`                                         | -         |
| \*`points`       | 线条顶点，可以为 2 个或多个                           | -         |
| `lineWidth`      | 线条宽度                                              | `1`       |
| `lineColor`      | 线条颜色，支持渐变和图案                              | -         |
| `lineDash`       | 虚线样式                                              | -         |
| `lineDashOffset` | 虚线偏移量                                            | -         |
| `lineCap`        | 线条端点样式，可选值：`'butt'`、`'round'`、`'square'` | `'butt'`  |
| `lineJoin`       | 线条连接样式，可选值：`'miter'`、`'round'`、`'bevel'` | `'miter'` |
| `miterLimit`     | 斜接长度限制比例                                      | `10`      |
| `rotate`         | 旋转角度，不会改变元素盒模型，不影响子元素相对定位    | -         |
| `shadowOffsetX`  | 阴影 X 轴偏移                                         | -         |
| `shadowOffsetY`  | 阴影 Y 轴偏移                                         | -         |
| `shadowBlur`     | 阴影模糊程度                                          | -         |
| `shadowColor`    | 阴影颜色                                              | -         |
| `id`             | 用于相对定位的标识符                                  | -         |
| `relativeTo`     | 相对于某个 id 对应的元素进行定位（注意避免循环依赖）  | -         |

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
