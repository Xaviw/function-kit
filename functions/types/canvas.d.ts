/**
 * poster 绘制项
 */
export type PosterElements = (CanvasElements | CanvasRenderFn)[]

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
export type CanvasElements = CanvasTextElement | CanvasImageElement | CanvasRectElement | CanvasLineElement

/**
 * poster 函数式绘制项
 */
export interface CanvasRenderFn {
  /**
   * 手动绘制，支持异步
   * @param ctx - canvas 上下文
   * @param canvas - canvas 节点
   */
  (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): MaybePromise<void>
}

/**
 * poster 配置式绘制项公共配置
 */
export interface CanvasElementCommonOptions {
  /**
   * 用于相对定位
   */
  id?: string
  /**
   * 相对于某个 id 对应的元素进行定位（需要注意配置顺序）
   */
  relativeTo?: string
  top?: number
  right?: number
  bottom?: number
  left?: number
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
  /**
   * 上下左右、[上下左右]、[上下、左右]、[上、左右、下]、[上, 右, 下, 左]
   */
  padding?: number | number[]
  backgroundColor?: string
  borderRadius?: number
  borderSize?: number
  /**
   * @default 'solid'
   */
  borderStyle?: 'solid' | 'dashed'
  /**
   * @default '#000000'
   */
  borderColor?: string
}

/**
 * poster 文本
 */
export interface CanvasTextElement extends CanvasTextCommonOptions, CanvasElementCommonOptions {
  type: 'text'
  /**
   * 文本内容，支持换行等控制字符；为数组时可以分别设置样式
   */
  content: string | CanvasTextCommonOptions[]
  /**
   * 设置宽度后支持自动换行、多行省略、对齐方式
   */
  width?: number
  /**
   * 最大行数，超出省略显示，需设置 width
   */
  lineClamp?: number
  /**
   * 超出省略时展示的字符
   * @default '...'
   */
  ellipsisContent?: string
  /**
   * 对齐方式，需设置 width
   * @default 'left'
   */
  textAlign?: 'left' | 'center' | 'right'
}

/**
 * poster 图片
 */
export interface CanvasImageElement extends CanvasElementCommonOptions {
  type: 'image'
  src: string
  width?: number
  height?: number
  /**
   * 需设置 width、height
   */
  mode?: 'aspectFill' | 'scaleToFill'
  /**
   * box-sizing: content-box
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
  borderRadius?: number
}

/**
 * poster 矩形
 */
export interface CanvasRectElement extends CanvasElementCommonOptions {
  type: 'rect'
  width: number
  height: number
  backgroundColor?: string
  /**
   * box-sizing: content-box
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
  borderRadius?: number
}

/**
 * 线
 */
export interface CanvasLineElement extends Omit<CanvasElementCommonOptions, 'top' | 'right' | 'bottom' | 'left'> {
  type: 'line'
  /**
   * 起点
   */
  begin: [number, number]
  /**
   * 终点
   */
  end: [number, number]
  /**
   * @default 1
   */
  lineWidth?: number
  lineDash?: number[]
  lineDashOffset?: number
  /**
   * @default 'butt'
   */
  lineCap?: 'butt' | 'round' | 'square'
  /**
   * @default 'miter'
   */
  lineJoin?: 'round' | 'bevel' | 'miter'
  /**
   * @default 10
   */
  miterLimit?: number
  backgroundColor?: string
}

export interface CanvasElementRenderFnOptions { ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, width: number, height: number }
