export type CanvasPosterElements = (CanvasElement | CanvasRenderFn)[]

export interface CanvasPosterOptions {
  node: HTMLCanvasElement
  width: number
  height: number
  init?: CanvasRenderFn
}

export interface CanvasElementRenderFnOptions { ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, rpr: number }

export type CanvasElement = CanvasTextElement | CanvasInlineTextElement | CanvasImageElement | CanvasRectElement | CanvasLineElement

interface CanvasRenderFn {
  (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): MaybePromise<void>
}

interface CanvasElementCommonOptions {
  top?: string
  right?: string
  bottom?: string
  left?: string
  rotate?: number
}

interface CanvasTextCommonOptions {
  /**
   * 设置宽度后支持自动换行、多行省略、对其方式
   */
  width?: string
  /**
   * 最大行数，超出...省略显示，需设置 width
   */
  lineClamp?: string
  /**
   * 对齐方式，需设置 width
   */
  textAlign?: 'left' | 'center' | 'right'
  lineHeight?: number | string
  fontSize?: string
  fontFamily?: string
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold'
  color?: string
  fontStyle?: 'normal' | 'italic'
  textDecoration?: 'underline' | 'overline' | 'line-through'
  /**
   * 填充或镂空
   */
  textStyle?: 'fill' | 'stroke'
  textShadow?: string
}

/**
 * 文本
 */
interface CanvasTextElement extends CanvasTextCommonOptions extends CanvasElementCommonOptions {
  type: 'text'
  /**
   * 文本内容、支持换行等控制字符
   */
  content: string
}

/**
 * 内联文本，用于一段文本包含不同的样式时
 */
interface CanvasInlineTextElement extends CanvasElementCommonOptions extends CanvasTextCommonOptions {
  type: 'inlineText'
  contentList: Omit<CanvasTextCommonOptions, 'width' | 'lineClamp' | 'textAlign'>[]
}

/**
 * 图片
 */
interface CanvasImageElement extends CanvasElementCommonOptions {
  type: 'image'
  src: string
  width?: string
  height?: string
  /**
   * 需设置 width、height
   */
  mode?: 'aspectFill' | 'scaleToFill'
  /**
   * box-sizing: content-box
   */
  border?: string
  borderRadius?: string
}

/**
 * 矩形
 */
interface CanvasRectElement extends CanvasElementCommonOptions {
  type: 'rect'
  width: string
  height: string
  backgroundColor?: string
  /**
   * box-sizing: content-box
   */
  border?: string
  borderRadius?: string
}

/**
 * 线
 */
interface CanvasLineElement {
  type: 'line'
  begin: [number, number]
  end: [number, number]
  border?: string
}
