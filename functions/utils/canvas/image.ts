import type { Canvas, CanvasContext, NormalizedBox, PosterImage } from '../../types/canvas'
import { isFunction, isNil, isNumber, isString } from '../../src/is'
import { mapObject } from '../../src/mapObject'
import { roundRect } from './common'
import { downloadImage } from './downloadImage'
import { settingCanvasProps } from './propStrategies'

interface PreparedImage extends PosterImage {
  image: CanvasImageSource
  imageWidth: number
  imageHeight: number
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
  borderRadius: number
}

export const image = {
  // 前置工作、与容器尺寸无关的属性标准化
  async prepare(props: PosterImage, { canvas }: { canvas: Canvas }): Promise<PreparedImage> {
    const { src } = props

    if (!isString(src))
      console.error(`图片链接错误，当前为：${src}`)

    const { image, width, height } = await downloadImage(src, canvas)

    return {
      ...props,
      image,
      imageWidth: width,
      imageHeight: height,
    }
  },
  // 容器尺寸相关的属性标准化
  calculate(preparedProps: PreparedImage, parentContainer: NormalizedBox): NormalizedImage {
    const { width: containerWidth, height: containerHeight } = parentContainer

    let {
      width: configWidth,
      height: configHeight,
      top: configTop,
      right: configRight,
      bottom: configBottom,
      left: configLeft,
      imageWidth,
      imageHeight,
      borderRadius,
      sourceHeight: configSourceHeight,
      sourceWidth: configSourceWidth,
      sourceX: configSourceX,
      sourceY: configSourceY,
      mode,
    } = preparedProps

    const {
      top,
      right,
      bottom,
      left,
      width: elementWidth,
      height: elementHeight,
    } = mapObject(
      { width: configWidth, height: configHeight, top: configTop, right: configRight, bottom: configBottom, left: configLeft },
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
    ) as Record<'width' | 'height' | 'top' | 'right' | 'bottom' | 'left', number | undefined>

    const {
      sourceHeight,
      sourceWidth,
      sourceX,
      sourceY,
    } = mapObject(
      { sourceHeight: configSourceHeight, sourceWidth: configSourceWidth, sourceX: configSourceX, sourceY: configSourceY },
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
              ? configHeight
              : key === 'sourceWidth'
                ? configWidth
                : 0
        return [key, newValue]
      },
    ) as Record<'sourceX' | 'sourceY' | 'sourceWidth' | 'sourceHeight', number>

    let x = 0
    let y = 0
    let width = 0
    let height = 0
    const imageRatio = sourceWidth / sourceHeight

    if (elementWidth) {
      width = elementWidth

      if (!isNil(left))
        x = left
      else if (!isNil(right))
        x = containerWidth - right - width

      if (!elementHeight) {
        height = sourceWidth / imageRatio
      }
    }

    if (elementHeight) {
      height = elementHeight

      if (!isNil(top))
        y = top
      else if (!isNil(bottom))
        y = containerHeight - bottom - height

      if (!elementWidth) {
        width = sourceHeight * imageRatio
      }
    }

    if (!elementWidth && !elementHeight) {
      width = sourceWidth
      height = sourceHeight

      if (!isNil(left))
        x = left
      else if (!isNil(right))
        x = containerWidth - right - width

      if (!isNil(top))
        y = top
      else if (!isNil(bottom))
        y = containerHeight - bottom - height
    }

    if (elementWidth && elementHeight) {
      const containerRatio = width / height
      // 默认的 scaleToFill 无需处理
      if (mode === 'aspectFill') {
        if (containerRatio > imageRatio) {
        // 宽度填满，高度裁剪
          height = sourceWidth / containerRatio
        }
        else {
        // 高度填满，宽度裁剪
          width = sourceHeight * containerRatio
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
    } = calculatedProps

    // 翻转
    ctx.translate(flipX ? posterWidth : 0, flipY ? posterHeight : 0)
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1)
    if (flipX)
      x = posterWidth - x - width
    if (flipY)
      y = posterHeight - y - height

    // 绘制阴影
    settingCanvasProps({
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      fillStyle: '#00000000',
    }, ctx)

    let { lineWidth } = border || {}
    lineWidth = isNumber(lineWidth) ? lineWidth : 0

    roundRect({
      x: x - lineWidth / 2,
      y: y - lineWidth / 2,
      w: width + lineWidth,
      h: height + lineWidth,
      r: borderRadius,
      ctx,
    })

    ctx.fill()

    // 裁剪图片和阴影
    ctx.save()
    ctx.clip()

    // 绘制图片
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height)

    // 绘制边框
    if (border && lineWidth) {
      settingCanvasProps({ ...border, strokeStyle: border.lineColor }, ctx)
      ctx.stroke()
    }

    ctx.restore()
  },
}
