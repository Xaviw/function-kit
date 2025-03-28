import type { Canvas, PosterElementRenderContext, PosterImage } from '../../types/canvas'
import type { NormalizedBox } from '../../utils/canvas/normalize'
import { downloadImage } from '../../utils/canvas/downloadImage'
import { radiusClipPath, renderBorder } from '../../utils/canvas/help'
import { calcSize, standardStrategy } from '../../utils/canvas/normalize'
import { settingCanvasProps } from '../../utils/canvas/propStrategies'
import { rotateCanvasElement } from './common'

/**
 * 绘制 Canvas 图片
 * @web
 * @miniprogram
 */
export async function renderImage(renderOptions: Omit<PosterImage, 'type'>, contextOptions: PosterElementRenderContext & { canvas: Canvas }): Promise<void> {
  const { ctx, canvas, width: canvasWidth, height: canvasHeight } = contextOptions
  ctx.save()

  // 参数标准化
  const { x, y, width, height } = standardStrategy(renderOptions, { width: canvasWidth, height: canvasHeight, x: 0, y: 0 })

  const { rotate, borderRadius, src, flipX, flipY } = renderOptions

  // 获取图片
  let image: CanvasImageSource
  let imageWidth: number
  let imageHeight: number
  try {
    const res = await downloadImage(src, canvas)
    image = res.image
    imageWidth = res.width
    imageHeight = res.height
  }
  catch (err) {
    console.warn(`图片加载失败：`, err)
    ctx.restore()
    return
  }

  // 旋转
  if (rotate)
    rotateCanvasElement(rotate, { x, y, width, height, ctx })

  // canvas 属性设置
  const borderSize = settingCanvasProps(renderOptions, ctx)

  ctx.save()
  const r = radiusClipPath({ x, y, width, height, borderRadius, ctx, borderSize })

  // 翻转
  ctx.save()
  const drawProps = calcDrawProps({ ...renderOptions, x, y, width, height, imageWidth, imageHeight })
  ctx.translate(flipX ? canvasWidth : 0, flipY ? canvasHeight : 0)
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1)
  if (flipX || flipY) {
    const [dx, dy, dWidth, dHeight] = drawProps.slice(4)
    drawProps[4] = flipX ? canvasWidth - dx - dWidth : dx
    drawProps[5] = flipY ? canvasHeight - dy - dHeight : dy
  }

  // 绘制图片
  ctx.drawImage(image, ...drawProps)
  ctx.restore()

  // 绘制边框
  // border 较粗时，外边缘圆角会大于需要的圆角，所以采用裁剪
  renderBorder({ x, y, width, height, r, borderSize, ctx })
  ctx.restore()

  ctx.restore()
}

/**
 * 计算 drawImage 参数
 */
function calcDrawProps(options: NormalizedBox & Pick<PosterImage, 'sourceX' | 'sourceY' | 'sourceWidth' | 'sourceHeight' | 'mode' | 'flipX' | 'flipY'> & { imageWidth: number, imageHeight: number }): [number, number, number, number, number, number, number, number] {
  let {
    x,
    y,
    width,
    height,
    imageWidth,
    imageHeight,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    mode,
  } = options

  sourceX = calcSize(sourceX, imageWidth) || 0
  sourceY = calcSize(sourceY, imageHeight) || 0
  sourceWidth = calcSize(sourceWidth, imageWidth) || imageWidth
  sourceHeight = calcSize(sourceHeight, imageHeight) || imageHeight

  // 默认的 scaleToFill 无需处理
  if (width && height) {
    const imageRatio = sourceWidth / sourceHeight
    const containerRatio = width / height
    if (mode === 'aspectFill') {
      if (containerRatio > imageRatio) {
        // 宽度填满，高度裁剪
        const newHeight = sourceWidth / containerRatio
        sourceY += (sourceHeight - newHeight) / 2
        sourceHeight = newHeight
      }
      else {
        // 高度填满，宽度裁剪
        const newWidth = sourceHeight * containerRatio
        sourceX += (sourceWidth - newWidth) / 2
        sourceWidth = newWidth
      }
    }
    else if (mode === 'aspectFit') {
      if (containerRatio > imageRatio) {
        // 高度填满，宽度留白
        const newWidth = height * imageRatio
        x += (width - newWidth) / 2
        width = newWidth
      }
      else {
        // 宽度填满，高度留白
        const newHeight = width / imageRatio
        y += (height - newHeight) / 2
        height = newHeight
      }
    }
  }
  // 宽高仅设置了一个的时候，根据图片比例设置另一个
  else if (width || height) {
    if (width)
      height = sourceHeight * sourceWidth / width
    if (height)
      width = sourceWidth * sourceHeight / height
  }
  // 未设置宽高时使用图片宽高
  else {
    width = sourceWidth
    height = sourceHeight
  }

  return [sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height]
}
