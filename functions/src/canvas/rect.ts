import type { CanvasElementRenderFnOptions, CanvasRect } from '../../types/canvas'
import { rotateCanvasElement, settingCanvasProps } from '../../utils/canvas/instancePropertyStrategies'
import { standardStrategy } from '../../utils/canvas/normalize'
import { isString } from '../is'

/**
 * 绘制 Canvas 矩形
 * @web
 * @miniprogram
 */
export function renderRect(renderOptions: CanvasRect, contextOptions: CanvasElementRenderFnOptions): void {
  const { ctx, width: canvasWidth, height: canvasHeight } = contextOptions

  // 参数标准化
  const { x, y, width, height } = standardStrategy(renderOptions, { width: canvasWidth, height: canvasHeight, x: 0, y: 0 })

  if (!width || !height)
    return

  let { rotate, borderRadius, borderSize, backgroundColor, borderStyle } = renderOptions

  // canvas 属性设置
  borderSize = Math.max(Number.parseFloat(borderSize as any) || 0, 0)
  // 默认的 dashed
  if (borderSize && borderStyle === 'dashed') {
    ctx.setLineDash([borderSize * 2, borderSize])
  }
  // 配置可能会覆盖默认 dashed
  settingCanvasProps(renderOptions, contextOptions)
  // 避免未设置为虚线又设置了虚线参数的情况
  if (borderSize && borderStyle !== 'dashed') {
    ctx.setLineDash([])
  }

  // 旋转
  if (rotate)
    rotateCanvasElement(rotate, { x, y, width, height }, contextOptions)

  // 圆角半径标准化
  let r = Number.parseFloat(borderRadius as any) || 0
  if (isString(borderRadius) && borderRadius.endsWith('%'))
    r = r * width / 100

  ctx.save()
  // border 在 content-box 外，路径需要加上 border
  roundRect({
    x: x - borderSize,
    y: y - borderSize,
    w: width + 2 * borderSize,
    h: height + 2 * borderSize,
    r,
    ctx,
  })
  // 根据圆角矩形路径裁剪
  ctx.clip()
  // 填充
  if (isString(backgroundColor))
    ctx.fill()
  // 绘制 border
  // border 较粗时，外边缘圆角会大于需要的圆角，所以这里采用裁剪
  if (borderSize) {
    ctx.lineWidth = borderSize * 2
    roundRect({
      x: x - borderSize,
      y: y - borderSize,
      w: width + 2 * borderSize,
      h: height + 2 * borderSize,
      r,
      ctx,
    })
    ctx.stroke()
  }
  ctx.restore()
}

/**
 * canvas 圆角矩形参数
 */
export interface CanvasRoundRectOptions {
  /** 左上角 x */
  x: number
  /** 左上角 y */
  y: number
  /** 宽度 */
  w: number
  /** 高度 */
  h: number
  /** 圆角半径 */
  r: number
  /** canvas 绘制上下文 */
  ctx: CanvasRenderingContext2D
}

/**
 * canvas 圆角矩形
 * @param options
 */
export function roundRect(options: CanvasRoundRectOptions) {
  let { x, y, w, h, r, ctx } = options

  const min_size = Math.min(w, h)
  if (r > min_size / 2)
    r = min_size / 2

  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
