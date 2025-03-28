import type { CanvasContext } from '../../types/canvas'
import type { NormalizedBox } from '../../utils/canvas/normalize'
import { isNumber } from '../is'

/**
 * 绘制元素旋转
 * @param rotate - 旋转角度
 * @param options
 * @param options.x - 旋转容器左上角 x
 * @param options.y - 旋转容器左上角 y
 * @param options.width - 旋转容器宽度
 * @param options.height - 旋转容器高度
 * @web
 * @miniprogram
 */
export function rotateCanvasElement(rotate: number, options: NormalizedBox & { ctx: CanvasContext }): void {
  if (isNumber(rotate)) {
    const { x, y, width, height, ctx } = options
    const centerX = x + width / 2
    const centerY = y + height / 2
    ctx.translate(centerX, centerY)
    ctx.rotate((rotate * Math.PI) / 180)
    ctx.translate(-centerX, -centerY)
  }
}
