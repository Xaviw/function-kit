import type { PosterElementRenderContext, PosterLine } from '../../types/canvas'
import { rotateCanvasElement } from '../../src/canvas/common'
import { lineStrategy } from '../../utils/canvas/normalize'
import { settingCanvasProps } from '../../utils/canvas/propStrategies'

/**
 * 绘制 canvas 线条
 * @web
 * @miniprogram
 */
export function renderLine(configs: Omit<PosterLine, 'type'>, options: PosterElementRenderContext): void {
  const { ctx, width: canvasWidth, height: canvasHeight } = options

  ctx.save()

  // 参数标准化
  const { x, y, width, height, points } = lineStrategy({ type: 'line', ...configs }, { width: canvasWidth, height: canvasHeight, x: 0, y: 0 })

  if (points.length < 2)
    return

  // 设置 canvas 属性
  settingCanvasProps(configs, ctx)

  // 旋转
  if (configs.rotate)
    rotateCanvasElement(configs.rotate, { x, y, width, height, ctx })

  // 绘制
  const [first, ...rest] = points
  ctx.beginPath()
  ctx.moveTo(...first)
  rest.forEach(item => ctx.lineTo(...item))
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}
