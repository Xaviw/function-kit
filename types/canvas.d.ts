export type CanvasPosterElements = (CanvasElement | CanvasRenderFn)[]

export interface CanvasPosterOptions {
  node: HTMLCanvasElement
  width: number
  height: number
  /**
   * 这里初始化上下文属性会被 save，后续绘制每一项会 restore 到此状态
   * （自定义绘制函数中再次 save 的情况除外）
   */
  init?: CanvasRenderFn
}

export interface CanvasElementRenderFnOptions { ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, rpr: number }

export type CanvasElement = CanvasTextElement | CanvasImageElement | CanvasRectElement | CanvasLineElement

export interface CanvasRenderFn {
  (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): MaybePromise<void>
}

export interface CanvasElementCommonOptions {
  top?: string
  right?: string
  bottom?: string
  left?: string
  rotate?: number
}

export interface CanvasTextCommonOptions {
  content: string
  /**
   * @default 1.2
   */
  lineHeight?: number | string
  /**
   * @default '16px'
   */
  fontSize?: string
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
   * @example '1px 1px 1px #ffffff'
   */
  textShadow?: string
}

/**
 * 文本
 */
export interface CanvasTextElement extends CanvasTextCommonOptions, CanvasElementCommonOptions {
  type: 'text'
  /**
   * 文本内容、支持换行等控制字符
   */
  content: string | CanvasTextCommonOptions[]
  /**
   * 设置宽度后支持自动换行、多行省略、对其方式
   */
  width?: string
  /**
   * 最大行数，超出...省略显示，需设置 width
   */
  lineClamp?: number
  /**
   * 对齐方式，需设置 width
   * @default 'left'
   */
  textAlign?: 'left' | 'center' | 'right'
}

/**
 * 图片
 */
export interface CanvasImageElement extends CanvasElementCommonOptions {
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
export interface CanvasRectElement extends CanvasElementCommonOptions {
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
export interface CanvasLineElement {
  type: 'line'
  begin: [number, number]
  end: [number, number]
  border?: string
}
