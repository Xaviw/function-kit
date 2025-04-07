import type { CanvasContext, PosterElementRenderContext, PosterRect } from '../../types/_canvas'
import { radiusPath, renderBorder } from '../../utils/_canvas/help'
import { standardStrategy } from '../../utils/_canvas/normalize'
import { settingCanvasProps } from '../../utils/_canvas/propStrategies'
import { rotateCanvasElement } from './common'

/**
 * 绘制 Canvas 矩形
 * @web
 * @miniprogram
 */
export function renderRect(renderOptions: PosterRect, contextOptions: PosterElementRenderContext): void {
  const { ctx, width: canvasWidth, height: canvasHeight } = contextOptions
  ctx.save()

  // 参数标准化
  const { x, y, width, height } = standardStrategy(renderOptions, { width: canvasWidth, height: canvasHeight, x: 0, y: 0 })

  if (!width || !height)
    return

  const { rotate, borderRadius, backgroundColor } = renderOptions

  // 旋转
  if (rotate)
    rotateCanvasElement(rotate, { x, y, width, height, ctx })

  // canvas 属性设置
  const borderSize = settingCanvasProps(renderOptions, ctx)

  ctx.save()
  const r = radiusPath({ x, y, width, height, borderRadius, ctx, borderSize })

  // 填充
  if (backgroundColor)
    ctx.fill()

  ctx.clip()

  // 绘制 border
  // border 去掉 shadow
  ctx.shadowColor = '#00000000'
  // border 较粗时，外边缘圆角会大于需要的圆角，所以采用裁剪
  renderBorder({ x, y, width, height, r, borderSize, ctx })
  ctx.restore()

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
  ctx: CanvasContext
}

/**
 * canvas 圆角矩形
 * @param options
 * @web
 * @miniprogram
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
