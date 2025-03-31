<script setup>
  import Text from './text.vue'
</script>

# Canvas 海报

类 CSS 规则配置式生成 Canvas 海报，支持相对定位、百分比尺寸，提供文字、图片、线条、矩形等配置式元素

## 使用方式

```js
// 渐变色或图案可在外部定义，再应用到配置中
const ctx = canvas.getContext('2d')
const gradient = ctx.createLinearGradient() // 省略详细定义

canvasPoster(
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
      width: '50%',
      height: '50%',

      // 更多属性
      backgroundColor: gradient, // 渐变色示例
    }
  ],
  {
    node, // canvas 节点
    width, // 海报设计图宽度
    height, // 海报设计图高度
    dpr, // 可选的实际像素与物理像素比，默认获取设备像素比
  }
)
```

## 文本 text

| 属性名                  | 说明                                                                 |
|------------------------|--------------------------------------------------------------------|
| `width`                | 宽度，支持数字或百分比（相对于父容器宽度）                                         |
| `height`               | 高度，支持数字或百分比（相对于父容器高度）                                         |
| `top`                  | 上边距，支持数字或百分比（相对于父容器高度）。不存在 `height` 时，根据 `top` 和 `bottom` 计算高度 |
| `right`                | 右边距，支持数字或百分比（相对于父容器宽度）。不存在 `width` 时，根据 `left` 和 `right` 计算宽度  |
| `bottom`               | 下边距，支持数字或百分比（相对于父容器高度）。不存在 `height` 时，根据 `top` 和 `bottom` 计算高度 |
| `left`                 | 左边距，支持数字或百分比（相对于父容器宽度）。不存在 `width` 时，根据 `left` 和 `right` 计算宽度  |
| `rotate`               | 旋转角度，注意旋转不会改变元素盒模型，不会影响子元素相对定位                                 |
| `shadowOffsetX`        | 阴影水平偏移量                                                             |
| `shadowOffsetY`        | 阴影垂直偏移量                                                             |
| `shadowBlur`           | 阴影模糊半径                                                              |
| `shadowColor`          | 阴影颜色                                                                |
| `content`              | 文本内容，支持字符串或对象数组，设置为数组时支持大部分同名样式属性|
| `lineHeight`           | 行高，数值或百分比（相对于文字高度），默认值为 `'120%'`                              |
| `fontSize`             | 字体大小，默认值为 `16`                                                 |
| `fontFamily`           | 字体，默认值为 `'sans-serif'`                                          |
| `fontWeight`           | 字体粗细，默认值为 `'normal'`                                       |
| `color`                | 文本颜色                                                              |
| `textBaseLine`         | 基线位置，默认值为 `'alphabetic'`                                      |
| `letterSpacing`        | 字母间距                                                              |
| `wordSpacing`          | 单词间距                                                              |
| `fontStyle`            | 字体样式，默认值为 `'normal'`                                          |
| `textDecoration`       | 文本装饰线，支持 `'underline'`、`'overline'`、`'line-through'`                |
| `textDecorationProps`  | 文本装饰线的属性，包括 `lineCap`、`lineColor` 等                              |
| `textStyle`            | 文本样式，默认值为 `'fill'`，支持 `'fill'` 或 `'stroke'`                      |
| `strokeProps`          | 仅当 `textStyle` 为 `'stroke'` 时生效，包括 `lineCap`、`lineDash` 等              |
| `backgroundColor`      | 文字底色                                                              |
| `lineClamp`            | 最大行数，超出省略显示。`height` 小于内容高度时，会进行裁剪                           |
| `ellipsisContent`      | 超出省略时展示的字符，默认值为 `'...'`                                      |
| `textAlign`            | 容器内的对齐方式，默认值为 `'left'`，支持 `'left'`、`'center'`、`'right'`            |

<Text />

::: tip 提示
Canvas 中使用自定义字体时需要确保字体加载完成再绘制，否则渲染会回退到使用默认字体

示例的代码中演示了在浏览器环境通过 canvasPoster 的自定义渲染函数配合 [FontFace](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Font_Loading_API) API 确保字体加载完成

小程序环境中可以通过 [wx.loadFontFace](https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html) API 实现同样的效果
:::

::: details 代码
```ts
import { onMounted, useTemplateRef } from 'vue'
import { canvasPoster } from '../../functions/src/canvas/poster'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

const Hanalei = new FontFace('Hanalei', 'url(https://fonts.gstatic.font.im/s/hanaleifill/v22/fC1mPYtObGbfyQznIaQzPQi8UAjAhFqtag.woff2)')
document.fonts.add(Hanalei)

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(0, 0, 280, 0)
  gradient.addColorStop(0, '#cf1322')
  gradient.addColorStop(1, '#389e0d')

  canvasPoster([
    () => {
      // 放在字体使用前，确保字体加载完成
      return Hanalei.load()
    },
    {
      type: 'text',
      content: '测试 test 1234 !@#$',
      color: gradient,
      fontSize: 22,
      fontStyle: 'italic',
      fontFamily: 'Hanalei',
      letterSpacing: 6,
      shadowBlur: 2,
      shadowColor: '#00000033',
      shadowOffsetX: 6,
      shadowOffsetY: 6,
      textDecoration: 'underline',
      textStyle: 'stroke',
      wordSpacing: 6,
      backgroundColor: '#5cdbd348',
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
          },
        },
        {
          content: 'overline',
          textDecoration: 'overline',
          textDecorationProps: {
            lineColor: '#0000ff',
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
      fontFamily: 'Hanalei Fill',
      left: '120%',
      width: 220,
      content: '自定义超出省略内容，自定义超出省略内容，自定义超出省略内容，自定义超出省略内容',
      lineClamp: 3,
      ellipsisContent: '~~~',
    },
  ], {
    node: canvas.value!,
    width: 688,
    height: 300,
  })
})
```
:::
