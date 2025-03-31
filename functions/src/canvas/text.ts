import type { PosterElementRenderContext, PosterText } from '../../types/canvas'
import { textStrategy } from '../../utils/canvas/normalize'
import { enhancedDraw } from '../../utils/canvas/text'
import { rotateCanvasElement } from './common'

/**
 * 绘制 Canvas 文字
 * @web
 * @miniprogram
 */
export function renderText(renderOptions: PosterText, contextOptions: PosterElementRenderContext): void {
  const { width: canvasWidth, height: canvasHeight, ctx } = contextOptions

  // 参数标准化
  const { x, y, width, height } = textStrategy(renderOptions, { width: canvasWidth, height: canvasHeight, x: 0, y: 0 }, contextOptions)

  // 旋转
  if (renderOptions.rotate)
    rotateCanvasElement(renderOptions.rotate, { x, y, width, height, ctx })

  // 裁剪区域
  ctx.save()
  ctx.rect(x, y, width, height)
  ctx.clip()

  // 绘制
  enhancedDraw(renderOptions, { maxWidth: width, ctx, x, y })
  ctx.restore()
}
