/**
 * poster 绘制项
 */
export type PosterElements = (PosterElement | PosterRenderFunction)[]

/**
 * poster 基础配置
 */
export interface PosterOptions {
  /**
   * canvas 节点
   */
  node: HTMLCanvasElement
  /**
   * 画布宽度
   */
  width: number
  /**
   * 画布高度
   */
  height: number
}

/**
 * poster 配置式绘制项
 */
export type PosterElement = (CanvasText | CanvasImage | CanvasRect | CanvasLine) & {
  /**
   * 用于相对定位
   */
  id?: string
  /**
   * 相对于某个 id 对应的元素进行定位（注意避免循环依赖）
   */
  relativeTo?: string
}

/**
 * poster 函数式绘制项
 */
export interface PosterRenderFunction {
  /**
   * 手动绘制或设置上下文属性，支持异步
   * @param ctx - canvas 上下文
   * @param canvas - canvas 节点
   */
  (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): MaybePromise<void>
}

/**
 * canvas 绘制公共配置
 */
export interface CanvasElementCommonOptions {
  /**
   * 支持数字或百分比（相对于父容器）
   */
  width?: string | number
  /**
   * 支持数字或百分比（相对于父容器）
   */
  height?: string | number
  /**
   * 支持数字或百分比（相对于父容器）
   * 不存在 height 时，根据 top、bottom 计算高度
   * 存在 height 时，优先使用 top 定位
   */
  top?: string | number
  /**
   * 支持数字或百分比（相对于父容器）
   * 不存在 width 时，根据 left、right 计算宽度
   * 存在 width 时，优先使用 left 定位
   */
  right?: string | number
  /**
   * 支持数字或百分比（相对于父容器）
   * 不存在 height 时，根据 top、bottom 计算高度
   * 存在 height 时，优先使用 top 定位
   */
  bottom?: string | number
  /**
   * 支持数字或百分比（相对于父容器）
   * 不存在 width 时，根据 left、right 计算宽度
   * 存在 width 时，优先使用 left 定位
   */
  left?: string | number
  /**
   * 旋转角度，注意旋转不会改变元素盒模型，不会影响子元素相对定位
   */
  rotate?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
  shadowBlur?: number
  shadowColor?: string
}

/**
 * poster 文字元素公共配置
 */
export interface CanvasTextCommonOptions {
  content: string
  /**
   * @default 1.2
   */
  lineHeight?: number
  /**
   * @default 16
   */
  fontSize?: number
  /**
   * @default 'sans-serif'
   */
  fontFamily?: string
  /**
   * @default 'normal'
   */
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold'
  /**
   * @default '#000000'
   */
  color?: string
  letterSpacing?: number
  wordSpacing?: number
  /**
   * @default 'normal'
   */
  fontStyle?: 'normal' | 'italic'
  textDecoration?: 'underline' | 'overline' | 'line-through'
  /**
   * 填充或镂空
   * @default 'fill'
   */
  textStyle?: 'fill' | 'stroke'
}

/**
 * canvas 文本
 */
export interface CanvasText extends CanvasTextCommonOptions, CanvasElementCommonOptions {
  type: 'text'
  /**
   * 文本内容，支持换行等控制字符；为数组时可以分别设置样式
   */
  content: string | CanvasTextCommonOptions[]
  /**
   * 最大行数，超出省略显示
   * 需要能够计算出宽度（存在 left、right 或者 width）
   * height 小于实际高度时，会进行裁剪
   */
  lineClamp?: number
  /**
   * 超出省略时展示的字符
   * @default '...'
   */
  ellipsisContent?: string
  /**
   * 对齐方式，需要能够计算出宽度（存在 left、right 或者 width）
   * @default 'left'
   */
  textAlign?: 'left' | 'center' | 'right'
}

/**
 * canvas 图片
 */
export interface CanvasImage extends CanvasElementCommonOptions {
  type: 'image'
  src: string
  /**
   * 裁剪图片的起点 X 坐标
   * 支持数值或百分比（相对于图片宽度）
   * @default 0
   */
  sourceX?: string | number
  /**
   * 裁剪图片的起点 Y 坐标
   * 支持数值或百分比（相对于图片高度）
   * @default 0
   */
  sourceY?: string | number
  /**
   * 裁剪图片宽度
   * 支持数值或百分比（相对于图片高度）
   * @default '100%'
   */
  sourceWidth?: string | number
  /**
   * 裁剪图片高度
   * 支持数值或百分比（相对于图片高度）
   * @default '100%'
   */
  sourceHeight?: string | number
  /**
   * 需能够计算出高度（存在 top、bottom 或者 height）·
   */
  mode?: 'aspectFill' | 'scaleToFill'
  /**
   * box-sizing: content-box
   * borderStyle 为 dashed 时，此值不适合设置较大
   */
  borderSize?: number
  /**
   * @default 'solid'
   */
  borderStyle?: 'solid' | 'dashed'
  /**
   * @default '#000000'
   */
  borderColor?: string
  /**
   * 支持数字或百分比（相对于自身）
   */
  borderRadius?: number | string
  borderDash?: number[]
  borderDashOffset?: number
}

/**
 * canvas 矩形
 */
export interface CanvasRect extends CanvasElementCommonOptions {
  type: 'rect'
  backgroundColor?: string
  /**
   * box-sizing: content-box
   * borderStyle 为 dashed 时，此值不适合设置较大
   * @default 1
   */
  borderSize?: number
  /**
   * @default 'solid'
   */
  borderStyle?: 'solid' | 'dashed'
  /**
   * @default '#000000'
   */
  borderColor?: string
  /**
   * 支持数字或百分比（相对于自身）
   */
  borderRadius?: number | string
  borderDash?: number[]
  borderDashOffset?: number
}

/**
 * canvas 直线（元素矩形盒子的左上角到右下角）
 */
export interface CanvasLine extends Omit<CanvasElementCommonOptions, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height'> {
  type: 'line'
  /**
   * 线条顶点，可以为 2 个或多个
   * 支持数字或百分比
   */
  points: [number | string, number | string][]
  /**
   * @default 1
   */
  lineWidth?: number
  lineColor?: string
  lineDash?: number[]
  lineDashOffset?: number
  /**
   * @default 'butt'
   */
  lineCap?: CanvasLineCap
  /**
   * @default 'miter'
   */
  lineJoin?: CanvasLineJoin
  /**
   * @default 10
   */
  miterLimit?: number
}

/**
 * canvas 绘制方法参数
 */
export interface CanvasElementRenderFnOptions {
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  /**
   * 设计图宽度（未乘以 dpr）
   */
  width: number
  /**
   * 设计图高度（未乘以 dpr）
   */
  height: number
}
