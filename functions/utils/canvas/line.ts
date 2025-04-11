import type { CanvasContext, NormalizedBox, PosterLine } from '../../types/canvas'
import { isArray, isFunction, isNumber } from '../../src/is'
import { settingCanvasProps } from './propStrategies'

interface NormalizedLine extends PosterLine {
  x: number
  y: number
  width: number
  height: number
  points: [number, number][]
}

export const line = {
  // 前置工作、与容器尺寸无关的属性标准化
  prepare(props: PosterLine) {
    if (!isArray(props.points) || !props.points.every(item => isArray(item) && item.length === 2)) {
      console.error(`line points 参数错误，当前为：${props.points}`)
      props.points = []
    }
    return props
  },
  // 容器尺寸相关的属性标准化
  calculate(preparedProps: PosterLine, { width, height }: NormalizedBox): NormalizedLine {
    let { lineWidth } = preparedProps
    lineWidth = isNumber(lineWidth) ? lineWidth : 1

    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity

    const points = preparedProps.points.reduce((p, c) => {
      let [x, y] = c

      if (isFunction(x))
        x = x({ containerWidth: width, containerHeight: height })
      else
        x = Number.parseFloat(x as any)

      if (isFunction(y))
        y = y({ containerWidth: width, containerHeight: height })
      else
        y = Number.parseFloat(y as any)

      if (!Number.isNaN(x) && !Number.isNaN(y)) {
        p.push([x, y])
        minX = Math.min(minX, x)
        minY = Math.min(minY, y)
        maxX = Math.max(maxX, x)
        maxY = Math.max(maxY, y)
      }

      return p
    }, [] as [number, number][])

    if (!points.length) {
      return {
        ...preparedProps,
        points,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      }
    }

    return {
      ...preparedProps,
      points,
      width: maxX - minX + lineWidth,
      height: maxY - minY + lineWidth,
      x: minX - lineWidth / 2,
      y: minY - lineWidth / 2,
    }
  },
  // 绘制
  render(calculatedProps: NormalizedLine, { ctx }: { ctx: CanvasContext }) {
    const {
      points,
      lineCap,
      lineColor,
      lineDash,
      lineDashOffset,
      lineJoin,
      lineWidth,
      miterLimit,
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
    } = calculatedProps

    if (points.length < 2) {
      console.error(`line points 参数错误，当前 points 计算后为：${points}`)
      return
    }

    settingCanvasProps({
      lineCap,
      strokeStyle: lineColor,
      lineDash,
      lineDashOffset,
      lineJoin,
      lineWidth,
      miterLimit,
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
    }, ctx)

    const [first, ...rest] = points
    ctx.beginPath()
    ctx.moveTo(...first)
    rest.forEach(item => ctx.lineTo(...item))
    ctx.stroke()
    ctx.closePath()
  },
}
