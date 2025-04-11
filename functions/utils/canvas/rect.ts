import type { CanvasContext, NormalizedBox, PosterRect } from '../../types/canvas'
import { isFunction, isNil, isNumber, isObject, isString } from '../../src/is'
import { mapObject } from '../../src/mapObject'
import { pick } from '../../src/pick'
import { roundRect } from './common'
import { settingCanvasProps } from './propStrategies'

interface NormalizedRect extends PosterRect {
  x: number
  y: number
  width: number
  height: number
  borderRadius: number
}

export const rect = {
  // 前置工作、与容器尺寸无关的属性标准化
  prepare(props: PosterRect) {
    return props
  },
  // 容器尺寸相关的属性标准化
  calculate(preparedProps: PosterRect, parentContainer: NormalizedBox): NormalizedRect {
    const { width: containerWidth, height: containerHeight } = parentContainer

    const sizeProps = pick(
      preparedProps,
      ['top', 'right', 'bottom', 'left', 'width', 'height'],
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
            ? value({ containerWidth, containerHeight })
            : undefined
        return [key, newValue]
      },
    )

    let x = 0
    let y = 0
    let width = 0
    let height = 0

    if (elementWidth && elementWidth > 0) {
      width = elementWidth

      if (!isNil(left))
        x = left
      else if (!isNil(right))
        x = containerWidth - right - width
    }
    else {
      const x1 = left || 0
      const x2 = containerWidth - (right || 0)
      width = Math.abs(x2 - x1)
      x = Math.min(x1, x2)
    }

    if (elementHeight && elementHeight > 0) {
      height = elementHeight

      if (!isNil(top))
        y = top
      else if (!isNil(bottom))
        y = containerHeight - bottom - height
    }
    else {
      const y1 = top || 0
      const y2 = containerHeight - (bottom || 0)
      height = Math.abs(y2 - y1)
      y = Math.min(y1, y2)
    }

    let { borderRadius } = preparedProps
    borderRadius
      = isNumber(borderRadius) && borderRadius >= 0
        ? borderRadius
        : isFunction(borderRadius)
          ? borderRadius({
              containerHeight: parentContainer.height,
              containerWidth: parentContainer.width,
              selfHeight: height,
              selfWidth: width,
            })
          : 0

    return {
      ...preparedProps,
      x,
      y,
      width,
      height,
      borderRadius,
    }
  },
  // 绘制
  render(calculatedProps: NormalizedRect, { ctx }: { ctx: CanvasContext }) {
    const {
      x,
      y,
      width,
      height,
      backgroundColor,
      border,
      borderRadius,
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
    } = calculatedProps

    let { lineWidth } = border || {}
    lineWidth = isNumber(lineWidth) ? lineWidth : 0

    ctx.save()

    settingCanvasProps({
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      fillStyle: backgroundColor,
    }, ctx)

    roundRect({
      x: x - lineWidth / 2,
      y: y - lineWidth / 2,
      w: width + lineWidth,
      h: height + lineWidth,
      r: borderRadius,
      ctx,
    })

    if (isString(backgroundColor) || isObject(backgroundColor))
      ctx.fill()

    ctx.restore()

    if (border && lineWidth) {
      ctx.clip()
      settingCanvasProps({ ...border, strokeStyle: border.lineColor }, ctx)
      ctx.stroke()
    }
  },
}
