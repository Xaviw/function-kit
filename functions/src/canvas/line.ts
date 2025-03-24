import type { CanvasElementRenderFnOptions, CanvasLine } from '../../types/canvas'
import { rotateCanvasElement, settingCanvasProps } from '../../utils/canvas/instancePropertyStrategies'
import { lineStrategy } from '../../utils/canvas/normalize'

/**
 * 绘制 Canvas 线条
 * @web
 * @miniprogram
 */
export function renderLine(renderOptions: CanvasLine, contextOptions: CanvasElementRenderFnOptions): void {
  const { ctx, width: canvasWidth, height: canvasHeight } = contextOptions

  const { x, y, width, height, points } = lineStrategy(renderOptions, { width: canvasWidth, height: canvasHeight, x: 0, y: 0 })

  if (!width || !height || points.length < 2)
    return

  settingCanvasProps(renderOptions, contextOptions)

  if (renderOptions.rotate)
    rotateCanvasElement(renderOptions.rotate, { x, y, width, height }, contextOptions)

  const [first, ...rest] = points

  ctx.beginPath()
  ctx.moveTo(...first)
  rest.forEach(item => ctx.lineTo(...item))
  ctx.stroke()
  ctx.closePath()
}
