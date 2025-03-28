import type { Recordable } from '../../types/common'
import { isArray, isNumber, isString } from '../../src/is'

/**
 * canvas 实例属性绘制策略
 */
const canvasPropsStrategies: Record<string, (val: any, ctx: CanvasRenderingContext2D) => void> = {
  lineWidth(lineWidth: number, ctx: CanvasRenderingContext2D) {
    if (isNumber(lineWidth))
      ctx.lineWidth = lineWidth
  },
  lineDash(lineDash: number[], ctx: CanvasRenderingContext2D) {
    if (isArray(lineDash) && lineDash.every(isNumber))
      ctx.setLineDash(lineDash)
  },
  lineDashOffset(lineDashOffset: number, ctx: CanvasRenderingContext2D) {
    if (isNumber(lineDashOffset))
      ctx.lineDashOffset = lineDashOffset
  },
  lineCap(lineCap: CanvasLineCap, ctx: CanvasRenderingContext2D) {
    if (lineCap && ['butt', 'round', 'square'].includes(lineCap))
      ctx.lineCap = lineCap
  },
  lineJoin(lineJoin: CanvasLineJoin, ctx: CanvasRenderingContext2D) {
    if (lineJoin && ['round', 'bevel', 'miter'].includes(lineJoin))
      ctx.lineJoin = lineJoin
  },
  miterLimit(miterLimit: number, ctx: CanvasRenderingContext2D) {
    if (isNumber(miterLimit))
      ctx.miterLimit = miterLimit
  },
  fillStyle(fillStyle: string | CanvasGradient | CanvasPattern, ctx: CanvasRenderingContext2D) {
    if (fillStyle)
      ctx.fillStyle = fillStyle
  },
  strokeStyle(strokeStyle: string | CanvasGradient | CanvasPattern, ctx: CanvasRenderingContext2D) {
    if (strokeStyle)
      ctx.strokeStyle = strokeStyle
  },
  shadowColor(shadowColor: string, ctx: CanvasRenderingContext2D) {
    if (isString(shadowColor))
      ctx.shadowColor = shadowColor
  },
  shadowBlur(shadowBlur: number, ctx: CanvasRenderingContext2D) {
    if (isNumber(shadowBlur))
      ctx.shadowBlur = shadowBlur
  },
  shadowOffsetX(shadowOffsetX: number, ctx: CanvasRenderingContext2D) {
    if (isNumber(shadowOffsetX))
      ctx.shadowOffsetX = shadowOffsetX
  },
  shadowOffsetY(shadowOffsetY: number, ctx: CanvasRenderingContext2D) {
    if (isNumber(shadowOffsetY))
      ctx.shadowOffsetY = shadowOffsetY
  },
  wordSpacing(wordSpacing: number, ctx: CanvasRenderingContext2D) {
    if (isNumber(wordSpacing))
      ctx.wordSpacing = `${wordSpacing}px`
  },
  letterSpacing(letterSpacing: number, ctx: CanvasRenderingContext2D) {
    if (isNumber(letterSpacing))
      ctx.letterSpacing = `${letterSpacing}px`
  },
  textBaseLine(textBaseLine: CanvasTextBaseline, ctx: CanvasRenderingContext2D) {
    if (isString(textBaseLine))
      ctx.textBaseline = textBaseLine
  },
}

canvasPropsStrategies.color = canvasPropsStrategies.backgroundColor = canvasPropsStrategies.fillStyle

canvasPropsStrategies.color = canvasPropsStrategies.lineColor = canvasPropsStrategies.strokeStyle

canvasPropsStrategies.borderColor = canvasPropsStrategies.lineColor = canvasPropsStrategies.strokeStyle

canvasPropsStrategies.borderDash = canvasPropsStrategies.lineDash

canvasPropsStrategies.borderDashOffset = canvasPropsStrategies.lineDashOffset

/**
 * 设置 canvas 实例属性
 * @param props 实例属性对象
 */
export function settingCanvasProps(props: Recordable, ctx: CanvasRenderingContext2D) {
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      canvasPropsStrategies[key]?.(props[key], ctx)
    }
  }

  const borderSize = Math.max(Number.parseFloat(props.borderSize) || 0, 0)
  if (borderSize) {
    if (props.borderStyle === 'dashed' && !props.borderDash)
      ctx.setLineDash([borderSize * 2, borderSize])
    else if (props.borderStyle === 'solid' && props.borderDash)
      ctx.setLineDash([])
  }

  return borderSize
}
