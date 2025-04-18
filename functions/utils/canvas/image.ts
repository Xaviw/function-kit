import type { Canvas, CanvasContext, ElementBox, PosterImage } from '../../types/canvas'
import { isFunction, isNil, isNumber, isString } from '../../src/is'
import { mapObject } from '../../src/mapObject'
import { pick } from '../../src/pick'
import { downloadImage, roundRect } from './common'
import { settingCanvasProps } from './propStrategies'

interface PreparedImage extends PosterImage {
  image: CanvasImageSource | undefined
  imageWidth: number
  imageHeight: number
  shadowOffsetX: number
  shadowOffsetY: number
  shadowBlur: number
  shadowColor: string
}

interface NormalizedImage extends PreparedImage {
  x: number
  y: number
  width: number
  height: number
  sourceX: number
  sourceY: number
  sourceWidth: number
  sourceHeight: number
  imgX: number
  imgY: number
  imgWidth: number
  imgHeight: number
  borderRadius: number
}

export const image = {
  // 前置工作、与容器尺寸无关的属性标准化
  async prepare(props: PosterImage, { node }: { node: Canvas }): Promise<PreparedImage> {
    const { src } = props

    let image
    let imageWidth = 0
    let imageHeight = 0

    if (!isString(src)) {
      console.error(`图片链接错误，当前为：${src}`)
    }
    else {
      try {
        const img = await downloadImage(src, node)
        image = img.image
        imageWidth = img.width
        imageHeight = img.height
      }
      catch {
        console.error(`${src} 图片加载失败`)
      }
    }

    return {
      ...props,
      image,
      imageWidth,
      imageHeight,
      shadowBlur: isNumber(props.shadowBlur) ? props.shadowBlur : 0,
      shadowColor: isString(props.shadowColor) ? props.shadowColor : '#00000000',
      shadowOffsetX: isNumber(props.shadowOffsetX) ? props.shadowOffsetX : 0,
      shadowOffsetY: isNumber(props.shadowOffsetY) ? props.shadowOffsetY : 0,
    }
  },
  // 容器尺寸相关的属性标准化
  calculate(preparedProps: PreparedImage, parentContainer: ElementBox): NormalizedImage {
    const { width: containerWidth, height: containerHeight } = parentContainer

    let {
      imageWidth,
      imageHeight,
      borderRadius,
      mode,
    } = preparedProps

    const sizeProps = pick(
      preparedProps,
      ['width', 'height', 'top', 'right', 'bottom', 'left'],
    )
    const {
      top,
      right,
      bottom,
      left,
      width: elementWidth,
      height: elementHeight,
    } = mapObject(
      sizeProps,
      (key, value) => {
        const newValue = isNumber(value)
          ? value
          : isFunction(value)
            ? value({
                containerWidth,
                containerHeight,
                selfWidth: imageWidth,
                selfHeight: imageHeight,
              })
            : undefined
        return [key, newValue]
      },
    )

    let {
      sourceHeight,
      sourceWidth,
      sourceX,
      sourceY,
    } = mapObject(
      {
        sourceHeight: preparedProps.sourceHeight,
        sourceWidth: preparedProps.sourceWidth,
        sourceX: preparedProps.sourceX,
        sourceY: preparedProps.sourceY,
      },
      (key, value) => {
        const newValue = isNumber(value)
          ? value
          : isFunction(value)
            ? value({
                containerWidth,
                containerHeight,
                selfWidth: imageWidth,
                selfHeight: imageHeight,
              })
            : key === 'sourceHeight'
              ? imageHeight
              : key === 'sourceWidth'
                ? imageWidth
                : 0
        return [key, newValue]
      },
    ) as Record<'sourceX' | 'sourceY' | 'sourceWidth' | 'sourceHeight', number>

    let x = 0
    let y = 0
    let width = 0
    let height = 0
    const imageRatio = sourceWidth / sourceHeight

    if (elementWidth && elementWidth > 0) {
      width = elementWidth

      if (!isNil(left))
        x = left
      else if (!isNil(right))
        x = containerWidth - right - width
    }
    else if (!isNil(left)) {
      x = left

      if (!isNil(right)) {
        const x2 = containerWidth - right
        width = Math.abs(x2 - x)
        x = Math.min(x, x2)
      }
    }

    if (elementHeight && elementHeight > 0) {
      height = elementHeight

      if (!isNil(top))
        y = top
      else if (!isNil(bottom))
        y = containerHeight - bottom - height
    }
    else if (!isNil(top)) {
      y = top

      if (!isNil(bottom)) {
        const y2 = containerHeight - bottom
        height = Math.abs(y2 - y)
        y = Math.min(y, y2)
      }
    }

    let imgX = x
    let imgY = y
    let imgWidth = width
    let imgHeight = height

    if (width > 0 && height > 0) {
      // 默认的 scaleToFill 无需处理
      if (mode === 'aspectFill') {
        const ratio = width / height
        if (imageRatio < 1) {
          // 高为长边，裁剪
          sourceHeight = sourceWidth / ratio
        }
        else {
          // 宽为长边，裁剪
          sourceWidth = sourceHeight * ratio
        }
      }
      else if (mode === 'aspectFit') {
        if (imageRatio < 1) {
          // 高为长边，撑满；宽按比例缩小，左右留白
          const newWidth = height * imageRatio
          const offsetX = (width - newWidth) / 2
          imgX += offsetX
          imgWidth = newWidth
        }
        else {
          // 宽为长边，撑满；高按比例缩小，上下留白
          const newHeight = width / imageRatio
          const offsetY = (height - newHeight) / 2
          imgY += offsetY
          imgHeight = newHeight
        }
      }
    }
    else if (width > 0) {
      const ratio = width / sourceWidth
      height = imgHeight = sourceHeight * ratio
    }
    else if (height > 0) {
      const ratio = height / sourceHeight
      width = imgWidth = sourceWidth * ratio
    }
    else {
      width = imgWidth = sourceWidth
      height = imgHeight = sourceHeight
    }

    if (isNil(left) && !isNil(right)) {
      const newX = containerWidth - right - width
      imgX += newX - x
      x = newX
    }

    if (isNil(top) && !isNil(bottom)) {
      const newY = containerHeight - bottom - height
      imgY += newY - y
      y = newY
    }

    borderRadius
      = isNumber(borderRadius) && borderRadius >= 0
        ? borderRadius
        : isFunction(borderRadius)
          ? borderRadius({
              containerHeight: parentContainer.height,
              containerWidth: parentContainer.width,
              selfHeight: imageHeight,
              selfWidth: imageWidth,
            })
          : 0

    return {
      ...preparedProps,
      sourceHeight,
      sourceWidth,
      sourceX,
      sourceY,
      x,
      y,
      width,
      height,
      borderRadius,
      imgX,
      imgY,
      imgWidth,
      imgHeight,
    }
  },
  // 绘制
  render(calculatedProps: NormalizedImage, { ctx, width: posterWidth, height: posterHeight }: { ctx: CanvasContext, width: number, height: number }) {
    let {
      x,
      y,
      width,
      height,
      border,
      borderRadius,
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      image,
      sourceHeight,
      sourceWidth,
      sourceX,
      sourceY,
      flipX,
      flipY,
      imgX,
      imgY,
      imgWidth,
      imgHeight,
    } = calculatedProps

    if (!image)
      return

    // 翻转
    ctx.translate(flipX ? posterWidth : 0, flipY ? posterHeight : 0)
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1)
    if (flipX) {
      x = posterWidth - x - width
      imgX = posterWidth - imgX - imgWidth
    }
    if (flipY) {
      y = posterHeight - y - height
      imgY = posterHeight - imgY - imgHeight
    }

    let { lineWidth } = border || {}
    lineWidth = isNumber(lineWidth) ? lineWidth : 0

    // 有边框或圆角时需要裁剪图片，并模拟阴影
    if (borderRadius || (border && lineWidth)) {
      ctx.save()
      roundRect({
        x: x - lineWidth / 2 + shadowOffsetX,
        y: y - lineWidth / 2 + shadowOffsetY,
        w: width + lineWidth,
        h: height + lineWidth,
        r: borderRadius,
        ctx,
      })
      settingCanvasProps({
        filter: `blur(${shadowBlur}px)`,
        fillStyle: shadowColor,
      }, ctx)
      ctx.fill()
      ctx.restore()

      roundRect({
        x: x - lineWidth / 2,
        y: y - lineWidth / 2,
        w: width + lineWidth,
        h: height + lineWidth,
        r: borderRadius,
        ctx,
      })
      ctx.clip()
    }
    // 无边框或圆角时，保留图片阴影
    else {
      settingCanvasProps({
        shadowBlur,
        shadowColor,
        shadowOffsetX,
        shadowOffsetY,
      }, ctx)
    }

    // 绘制图片
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, imgX, imgY, imgWidth, imgHeight)

    // 绘制边框
    if (border && lineWidth) {
      settingCanvasProps({
        ...border,
        strokeStyle: border.lineColor,
        shadowColor: '#00000000',
      }, ctx)
      ctx.stroke()
    }
  },
}
