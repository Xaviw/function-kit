import type { CanvasElementRenderFnOptions, CanvasText } from '../../types/canvas'
import { rotateCanvasElement, settingCanvasProps } from '../../utils/canvas/instancePropertyStrategies'
import { textStrategy } from '../../utils/canvas/normalize'

/**
 * 绘制 Canvas 文字
 * @web
 * @miniprogram
 */
export function renderText(renderOptions: CanvasText, contextOptions: CanvasElementRenderFnOptions): void {
  const { width: canvasWidth, height: canvasHeight } = contextOptions

  // 参数标准化
  const { x, y, width, height } = textStrategy(renderOptions, { width: canvasWidth, height: canvasHeight, x: 0, y: 0 })

  // 设置 canvas 属性
  settingCanvasProps(renderOptions, contextOptions)

  // 旋转
  if (renderOptions.rotate)
    rotateCanvasElement(renderOptions.rotate, { x, y, width, height }, contextOptions)
}
