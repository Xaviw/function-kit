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

## 文本 - text

<Text />
