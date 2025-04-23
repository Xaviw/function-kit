import type { Fn, Recordable } from './common'

export type Canvas = HTMLCanvasElement

export type CanvasContext = CanvasRenderingContext2D

/**
 * 根据定位、尺寸属性计算标准盒子属性
 */
interface ElementBox {
  x: number
  y: number
  width: number
  height: number
}

/**
 * poster 基础配置
 */
export interface PosterOptions {
  /**
   * canvas 元素，或选择器字符串
   */
  node: Canvas | string
  /**
   * canvas 元素的 css 宽度，用于在事件系统中定位元素
   *
   * 小程序中不支持从元素本身获取 css 宽高，所以 node 为元素节点时，需要显式定义
   */
  nodeWidth?: number
  /**
   * canvas 元素的 css 高度，用于在事件系统中定位元素
   *
   * 小程序中不支持从元素本身获取 css 宽高，所以 node 为元素节点时，需要显式定义
   */
  nodeHeight?: number
  /**
   * 海报设计图宽度
   *
   * 小程序中不支持从元素本身获取 css 宽高，所以 node 为元素节点时，需要显式定义
   *
   * **注意：**[小程序 Canvas 文档](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html#Bug-Tip)中对画布的最大宽高说明为 1365，过大的宽高存在页面崩溃的可能
   */
  width?: number
  /**
   * 海报设计图高度
   *
   * 小程序中不支持从元素本身获取 css 宽高，所以 node 为元素节点时，需要显式定义
   *
   * **注意：**[小程序 Canvas 文档](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html#Bug-Tip)中对画布的最大宽高说明为 1365，过大的宽高存在页面崩溃的可能
   */
  height?: number
  /**
   * 调试选项，开启后会在元素盒模型上绘制边框，用于判断相对定位以及事件作用范围
   */
  debug?: boolean | {
    lineWidth?: number
    lineColor?: string
  }
  /**
   * 画布实际像素相对于设计图像素的倍数，默认会自动获取设备 drp
   *
   * **注意：**[小程序 Canvas 文档](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html#Bug-Tip)中对画布的最大宽高说明为 1365，过大的宽高存在页面崩溃的可能
   */
  dpr?: number
}

/**
 * poster 实例属性
 */
interface PosterInstanceOptions extends Required<PosterOptions> {
  node: Canvas
  ctx: CanvasContext
}

/**
 * poster 配置式绘制项
 */
export type PosterElement = PosterText | PosterImage | PosterRect | PosterLine

/**
 * poster 函数式绘制项
 */
export interface PosterRenderFunction {
  (options: PosterInstanceOptions): MaybePromise<void>
}

/**
 * 支持数字；或参数为父容器宽度、高度的对象，返回值为数字的函数
 * @example
 * ```ts
 * 10
 * ({ containerWidth, containerHeight }) => containerWidth * 0.5 + containerHeight * 0.5
 * ```
 */
type NumberWithContainer = number | Fn<[{ containerWidth: number, containerHeight: number }], number>

/**
 * poster 绘制公共配置
 */
export interface PosterElementCommonOptions {
  /**
   * 用于相对定位
   */
  id?: string
  /**
   * 相对于某个 id 对应的元素进行定位（注意避免循环依赖）
   */
  relativeTo?: string
  /**
   * 点击事件（不精确！！！仅根据元素盒模型与配置顺序确定是否被点击，支持旋转判断，未支持圆角判断）
   */
  onClick?: (params: {
    /** 点击事件 */
    event: MouseEvent
    /** 示例属性 */
    instanceOptions: PosterInstanceOptions
    /** 点击项原始配置 */
    itemConfig: Recordable
  }) => void
  width?: NumberWithContainer
  height?: NumberWithContainer
  top?: NumberWithContainer
  right?: NumberWithContainer
  bottom?: NumberWithContainer
  left?: NumberWithContainer
  /**
   * 透明度，取值范围 0 - 1
   * @default 1
   */
  globalAlpha?: number
  /**
   * 旋转角度，注意子元素相对定位还是根据未选择的盒模型进行
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
export interface PosterTextCommonOptions extends Pick<PosterElementCommonOptions, 'shadowBlur' | 'shadowColor' | 'shadowOffsetX' | 'shadowOffsetY'> {
  content: string
  /**
   * 数值或参数为字体高度，返回值为数值的函数
   * @default
   * (h: number) => 1.2 * h
   */
  lineHeight?: number | Fn<[number], number>
  /**
   * @default 16
   */
  fontSize?: number
  /**
   * @default 'sans-serif'
   */
  fontFamily?: string
  fontFamilySrc?: string
  /**
   * @default 'normal'
   */
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold'
  color?: string | CanvasGradient | CanvasPattern
  /**
   * 基线位置为起点 Y 坐标加基线上方文字高度（含上方的lineHeight）
   * @default 'alphabetic'
   */
  textBaseline?: CanvasTextBaseline
  letterSpacing?: number
  wordSpacing?: number
  /**
   * @default 'normal'
   */
  fontStyle?: 'normal' | 'italic'
  textDecoration?: 'underline' | 'overline' | 'line-through'
  textDecorationProps?: Pick<PosterLine, 'lineCap' | 'lineColor' | 'lineDash' | 'lineDashOffset' | 'lineJoin' | 'lineWidth' | 'miterLimit'>
  /**
   * 填充或镂空
   * @default 'fill'
   */
  textStyle?: 'fill' | 'stroke'
  /**
   * 仅 text=stroke 时生效
   */
  strokeProps?: Pick<PosterLine, 'lineCap' | 'lineDash' | 'lineDashOffset' | 'lineJoin' | 'lineWidth' | 'miterLimit'>
  /**
   * 文字底色
   */
  backgroundColor?: string | CanvasGradient | CanvasPattern
}

/**
 * poster 文本
 */
export interface PosterText extends PosterTextCommonOptions, PosterElementCommonOptions {
  type: 'text'
  /**
   * 文本内容，支持空格，不支持其他控制字符；为数组时可以分别设置样式
   */
  content: string | PosterTextCommonOptions[]
  /**
   * 最大行数，超出省略显示
   */
  lineClamp?: number
  /**
   * 超出省略时展示的字符
   * @default '...'
   */
  ellipsisContent?: string
  /**
   * 容器内的对齐方式
   * @default 'left'
   */
  textAlign?: 'left' | 'center' | 'right'
}

/**
 * 支持数值或参数以容器宽、高，自身宽、高为参数，返回值为数值的函数
 * @example
 * ```ts
 * 10
 * ({ containerWidth, containerHeight, selfWidth, selfHeight }) => 10
 * ```
 */
type NumberWithContainerAndSelf = number | Fn<[{ containerWidth: number, containerHeight: number, selfWidth: number, selfHeight: number }], number>

/**
 * poster 图片
 */
export interface PosterImage extends Omit<PosterElementCommonOptions, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height'>, Pick<PosterRect, 'border' | 'borderRadius'> {
  type: 'image'
  /**
   * 图片链接或 base64
   */
  src: string
  width?: NumberWithContainerAndSelf
  height?: NumberWithContainerAndSelf
  top?: NumberWithContainerAndSelf
  right?: NumberWithContainerAndSelf
  bottom?: NumberWithContainerAndSelf
  left?: NumberWithContainerAndSelf
  /**
   * 裁剪图片的起点 X 坐标
   * @default 0
   */
  sourceX?: NumberWithContainerAndSelf
  /**
   * 裁剪图片的起点 Y 坐标
   * @default 0
   */
  sourceY?: NumberWithContainerAndSelf
  /**
   * 裁剪图片宽度
   * @default
   * ({ imageWidth }) => imageWidth
   */
  sourceWidth?: NumberWithContainerAndSelf
  /**
   * 裁剪图片高度
   * 支持数值或百分比（相对于图片高度）
   * @default
   * ({ imageHeight }) => imageHeight
   */
  sourceHeight?: NumberWithContainerAndSelf
  /**
   * 仅容器有固定宽高时生效
   * @remarks
   * - scaleToFill: 不保持比例拉伸填充
   * - aspectFit: 保持比例缩放，保证长边能完全显示
   * - aspectFill: 保持比例缩放，保证短边能完全显示
   * @default 'scaleToFill'
   */
  mode?: 'scaleToFill' | 'aspectFill' | 'aspectFit'
  /**
   * 沿 x 轴翻转
   */
  flipX?: boolean
  /**
   * 沿 y 轴翻转
   */
  flipY?: boolean
}

/**
 * poster 矩形
 */
export interface PosterRect extends PosterElementCommonOptions {
  type: 'rect'
  border?: Pick<PosterLine, 'lineCap' | 'lineColor' | 'lineDash' | 'lineDashOffset' | 'lineJoin' | 'lineWidth' | 'miterLimit'>
  backgroundColor?: string | CanvasGradient | CanvasPattern
  /**
   * 圆角大小
   * 支持数值或以容器宽、高，自身宽、高对象为参数，返回数值的函数
   */
  borderRadius?: NumberWithContainerAndSelf
}

/**
 * poster 直线
 */
export interface PosterLine extends Omit<PosterElementCommonOptions, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height'> {
  type: 'line'
  /**
   * 线条顶点，可以为 2 个或多个
   */
  points: [NumberWithContainer, NumberWithContainer][]
  /**
   * 是否自动闭合路径
   * @default false
   */
  closePath?: boolean
  /**
   * line 中仅 closePath 为 true 时生效
   */
  backgroundColor?: string | CanvasGradient | CanvasPattern
  /**
   * @default 1
   */
  lineWidth?: number
  lineColor?: string | CanvasGradient | CanvasPattern
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
 * poster 绘制方法参数
 */
export interface PosterElementRenderContext {
  ctx: CanvasContext
  /**
   * 画布宽度（用于计算百分比值）
   */
  width: number
  /**
   * 画布高度（用于计算百分比值）
   */
  height: number
}
