import type { CanvasElementRenderFnOptions, CanvasLine } from '../../types/canvas'
import { rotateCanvasElement, settingCanvasProps } from '../../utils/canvas/instancePropertyStrategies'
import { lineStrategy } from '../../utils/canvas/normalize'

/**
 * 绘制 Canvas 线条
 * @web
 * @miniprogram
 */
export function renderLine(renderOptions: CanvasLine, contextOptions: CanvasElementRenderFnOptions): void {
  const { x1, y1, width, height, points } = lineStrategy(renderOptions, contextOptions)

  if (!width || !height)
    return

  settingCanvasProps(renderOptions, contextOptions)

  if (renderOptions.rotate)
    rotateCanvasElement(renderOptions.rotate, { x1, y1, width, height }, contextOptions)

  const [first, ...rest] = points

  const { ctx } = contextOptions

  ctx.beginPath()
  ctx.moveTo(...first)
  rest.forEach(item => ctx.lineTo(...item))
  ctx.stroke()
  ctx.closePath()
}
