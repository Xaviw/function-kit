import type { Canvas, CanvasContext, NormalizedBox, PosterImage } from '../../types/canvas'
import { isFunction, isNil, isNumber, isString } from '../../src/is'
import { mapObject } from '../../src/mapObject'
import { pick } from '../../src/pick'
import { roundRect } from './common'
import { downloadImage } from './downloadImage'
import { settingCanvasProps } from './propStrategies'

interface PreparedImage extends PosterImage {
  image: CanvasImageSource
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
  borderRadius: number
  borderOffsetX: number
  borderOffsetY: number
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
      shadowBlur: isNumber(props.shadowBlur) ? props.shadowBlur : 0,
      shadowColor: isString(props.shadowColor) ? props.shadowColor : '#00000000',
      shadowOffsetX: isNumber(props.shadowOffsetX) ? props.shadowOffsetX : 0,
      shadowOffsetY: isNumber(props.shadowOffsetY) ? props.shadowOffsetY : 0,
    }
  },
  // 容器尺寸相关的属性标准化
  calculate(preparedProps: PreparedImage, parentContainer: NormalizedBox): NormalizedImage {
    const { width: containerWidth, height: containerHeight } = parentContainer

    let {
      imageWidth,
      imageHeight,
      borderRadius,
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
      pick(
        preparedProps,
        ['width', 'height', 'top', 'right', 'bottom', 'left'],
      ),
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

    if (elementWidth) {
      width = elementWidth
      const ratio = width / sourceWidth

      if (!elementHeight) {
        height = sourceHeight * ratio
      }
    }

    if (elementHeight) {
      height = elementHeight
      const ratio = height / sourceHeight

      if (!elementWidth) {
        width = sourceWidth * ratio
      }
    }

    if (!elementWidth && !elementHeight) {
      width = sourceWidth
      height = sourceHeight
    }

    if (!isNil(left))
      x = left
    else if (!isNil(right))
      x = containerWidth - right - width

    if (!isNil(top))
      y = top
    else if (!isNil(bottom))
      y = containerHeight - bottom - height

    let borderOffsetX = 0
    let borderOffsetY = 0

    if (elementWidth && elementHeight) {
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
          borderOffsetX = (width - newWidth) / 2
          x += borderOffsetX
          width = newWidth
        }
        else {
          // 宽为长边，撑满；高按比例缩小，上下留白
          const newHeight = width / imageRatio
          borderOffsetY = (height - newHeight) / 2
          y += borderOffsetY
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
      borderOffsetX,
      borderOffsetY,
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
      borderOffsetX,
      borderOffsetY,
    } = calculatedProps

    // 翻转
    ctx.translate(flipX ? posterWidth : 0, flipY ? posterHeight : 0)
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1)
    if (flipX)
      x = posterWidth - x - width
    if (flipY)
      y = posterHeight - y - height

    let { lineWidth } = border || {}
    lineWidth = isNumber(lineWidth) ? lineWidth : 0

    // 有边框或圆角时需要裁剪图片，并模拟阴影
    if (borderRadius || (border && lineWidth)) {
      ctx.save()
      roundRect({
        x: x - lineWidth / 2 - borderOffsetX + shadowOffsetX,
        y: y - lineWidth / 2 - borderOffsetY + shadowOffsetY,
        w: width + lineWidth + 2 * borderOffsetX,
        h: height + lineWidth + 2 * borderOffsetY,
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
        x: x - lineWidth / 2 - borderOffsetX,
        y: y - lineWidth / 2 - borderOffsetY,
        w: width + lineWidth + 2 * borderOffsetX,
        h: height + lineWidth + 2 * borderOffsetY,
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
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height)

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
