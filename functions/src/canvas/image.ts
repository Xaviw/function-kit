import type { CanvasElementRenderFnOptions, CanvasImage } from '../../types/canvas'
import { downloadImage } from '../../utils/canvas/downloadImage'
import { rotateCanvasElement, settingCanvasProps } from '../../utils/canvas/instancePropertyStrategies'
import { calcSize, standardStrategy } from '../../utils/canvas/normalize'
import { isString } from '../is'
import { roundRect } from './rect'

/**
 * 绘制 Canvas 图片
 * @web
 * @miniprogram
 */
export async function renderImage(renderOptions: CanvasImage, contextOptions: CanvasElementRenderFnOptions): Promise<void> {
  const { ctx, width: canvasWidth, height: canvasHeight } = contextOptions

  const { x, y, width, height } = standardStrategy(renderOptions, { width: canvasWidth, height: canvasHeight, x: 0, y: 0 })

  if (!width || !height)
    return

  let { rotate, borderRadius, borderSize, borderStyle, src, mode, sourceX, sourceY, sourceWidth, sourceHeight } = renderOptions

  const { image, width: imageWidth, height: imageHeight } = await downloadImage(src)

  borderSize = Math.max(Number.parseFloat(borderSize as any) || 0, 0)

  let r = Number.parseFloat(borderRadius as any) || 0
  if (isString(borderRadius) && borderRadius.endsWith('%'))
    r = r * width / 100

  if (borderSize && borderStyle === 'dashed') {
    ctx.setLineDash([borderSize * 2, borderSize])
  }

  settingCanvasProps(renderOptions, contextOptions)

  if (borderSize && borderStyle !== 'dashed') {
    ctx.setLineDash([])
  }

  if (rotate)
    rotateCanvasElement(rotate, { x, y, width, height }, contextOptions)

  ctx.save()
  roundRect({
    x: x - borderSize,
    y: y - borderSize,
    w: width + 2 * borderSize,
    h: height + 2 * borderSize,
    r,
    ctx,
  })
  ctx.strokeStyle = '#ff0000'
  ctx.stroke()
  ctx.clip()

  sourceX = Number.parseFloat(sourceX as any) || 0
  sourceY = Number.parseFloat(sourceY as any) || 0
  sourceWidth = calcSize(sourceWidth, imageWidth) || imageWidth
  sourceHeight = calcSize(sourceHeight, imageHeight) || imageHeight

  sourceWidth = mode === 'aspectFill' && sourceHeight < sourceWidth ? width * sourceWidth / width : sourceWidth
  sourceHeight = mode === 'aspectFill' && sourceWidth < sourceHeight ? height * sourceHeight / width : sourceHeight
  ctx.drawImage(image, sourceX - borderSize, sourceY - borderSize, sourceWidth + 2 * borderSize, sourceHeight + 2 * borderSize, x - borderSize, y - borderSize, width + 2 * borderSize, height + 2 * borderSize)
  ctx.restore()

  if (borderSize) {
    ctx.save()
    roundRect({
      x: x - borderSize,
      y: y - borderSize,
      w: width + 2 * borderSize,
      h: height + 2 * borderSize,
      r,
      ctx,
    })
    ctx.clip()
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
    ctx.restore()
  }
}
