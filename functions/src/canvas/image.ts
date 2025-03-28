import type { CanvasElementRenderFnOptions, CanvasImage } from '../../types/canvas'
import type { NormalizedBox } from '../../utils/canvas/normalize'
import { rotateCanvasElement, settingCanvasProps } from '../../utils/canvas/commonProperty'
import { downloadImage } from '../../utils/canvas/downloadImage'
import { calcSize, standardStrategy } from '../../utils/canvas/normalize'
import { isString } from '../is'
import { roundRect } from './rect'

/**
 * 绘制 Canvas 图片
 * @web
 * @miniprogram
 */
export async function renderImage(renderOptions: Omit<CanvasImage, 'type'>, contextOptions: CanvasElementRenderFnOptions): Promise<void> {
  const { ctx, width: canvasWidth, height: canvasHeight } = contextOptions
  ctx.save()

  // 参数标准化
  const { x, y, width, height } = standardStrategy(renderOptions, { width: canvasWidth, height: canvasHeight, x: 0, y: 0 })

  let { rotate, borderRadius, borderSize, borderStyle, src, flipX, flipY } = renderOptions

  // 获取图片
  let image: CanvasImageSource
  let imageWidth: number
  let imageHeight: number
  try {
    const res = await downloadImage(src)
    image = res.image
    imageWidth = res.width
    imageHeight = res.height
  }
  catch (err) {
    console.warn(`图片加载失败：`, err)
    return
  }

  // 旋转
  if (rotate)
    rotateCanvasElement(rotate, { x, y, width, height }, contextOptions)

  // canvas 属性设置
  borderSize = Math.max(Number.parseFloat(borderSize as any) || 0, 0)
  // 默认的 dashed
  if (borderSize && borderStyle === 'dashed') {
    ctx.setLineDash([borderSize * 2, borderSize])
  }
  // 配置可能会覆盖默认 dashed
  settingCanvasProps(renderOptions, ctx)
  // 避免未设置为虚线又设置了虚线参数的情况
  if (borderSize && borderStyle !== 'dashed') {
    ctx.setLineDash([])
  }

  // 圆角半径标准化
  let r = Number.parseFloat(borderRadius as any) || 0
  if (isString(borderRadius) && borderRadius.endsWith('%'))
    r = r * width / 100

  // 圆角裁剪路径
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

  // 翻转
  ctx.translate(flipX ? canvasWidth : 0, flipY ? canvasHeight : 0)
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1)
  const drawProps = calcDrawProps({ ...renderOptions, x, y, width, height, imageWidth, imageHeight })
  if (flipX || flipY) {
    const [dx, dy, dWidth, dHeight] = drawProps.slice(4)
    drawProps[4] = flipX ? canvasWidth - dx - dWidth : dx
    drawProps[5] = flipY ? canvasHeight - dy - dHeight : dy
  }

  // 绘制图片
  ctx.drawImage(image, ...drawProps)
  ctx.restore()

  // 绘制边框
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
  ctx.restore()
}

/**
 * 计算 drawImage 参数
 */
function calcDrawProps(options: NormalizedBox & Pick<CanvasImage, 'sourceX' | 'sourceY' | 'sourceWidth' | 'sourceHeight' | 'mode' | 'flipX' | 'flipY'> & { imageWidth: number, imageHeight: number }): [number, number, number, number, number, number, number, number] {
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
