import type { CanvasElementRenderFnOptions, CanvasLine } from '../../types/canvas'
import { rotateCanvasElement, settingCanvasProps } from '../../utils/canvas/commonProperty'
import { lineStrategy } from '../../utils/canvas/normalize'

/**
 * 绘制 Canvas 线条
 * @web
 * @miniprogram
 */
export function renderLine(renderOptions: CanvasLine, contextOptions: CanvasElementRenderFnOptions): void {
  const { ctx, width: canvasWidth, height: canvasHeight } = contextOptions

  // 参数标准化
  const { x, y, width, height, points } = lineStrategy(renderOptions, { width: canvasWidth, height: canvasHeight, x: 0, y: 0 })

  if (points.length < 2)
    return

  // 设置 canvas 属性
  settingCanvasProps(renderOptions, contextOptions)

  // 旋转
  if (renderOptions.rotate)
    rotateCanvasElement(renderOptions.rotate, { x, y, width, height }, contextOptions)

  // 绘制
  const [first, ...rest] = points
  ctx.beginPath()
  ctx.moveTo(...first)
  rest.forEach(item => ctx.lineTo(...item))
  ctx.stroke()
  ctx.closePath()
}
