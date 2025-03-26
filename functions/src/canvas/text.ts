import type { CanvasElementRenderFnOptions, CanvasText } from '../../types/canvas'
import { rotateCanvasElement, settingCanvasProps } from '../../utils/canvas/commonProperty'
import { textStrategy } from '../../utils/canvas/normalize'
import { measureHeight } from '../../utils/canvas/text'

/**
 * 绘制 Canvas 文字
 * @web
 * @miniprogram
 */
export function renderText(renderOptions: CanvasText, contextOptions: CanvasElementRenderFnOptions): void {
  const { width: canvasWidth, height: canvasHeight, ctx } = contextOptions

  // 参数标准化
  const { x, y, width, height } = textStrategy(renderOptions, { width: canvasWidth, height: canvasHeight, x: 0, y: 0 }, contextOptions)

  // 设置 canvas 属性
  settingCanvasProps(renderOptions, contextOptions)

  // 旋转
  if (renderOptions.rotate)
    rotateCanvasElement(renderOptions.rotate, { x, y, width, height }, contextOptions)

  // 裁剪区域
  ctx.save()
  ctx.rect(x, y, width, height)
  ctx.clip()

  // 绘制
  measureHeight(renderOptions, { maxWidth: width, ctx, x, y })
  ctx.restore()
}
