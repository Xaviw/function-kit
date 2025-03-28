import type { CanvasContext } from '../../types/canvas'
import type { Recordable } from '../../types/common'
import { isArray, isNumber, isString } from '../../src/is'

/**
 * canvas 实例属性绘制策略
 */
const canvasPropsStrategies: Record<string, (val: any, ctx: CanvasContext) => void> = {
  lineWidth(lineWidth: number, ctx: CanvasContext) {
    if (isNumber(lineWidth))
      ctx.lineWidth = lineWidth
  },
  lineDash(lineDash: number[], ctx: CanvasContext) {
    if (isArray(lineDash) && lineDash.every(isNumber))
      ctx.setLineDash(lineDash)
  },
  lineDashOffset(lineDashOffset: number, ctx: CanvasContext) {
    if (isNumber(lineDashOffset))
      ctx.lineDashOffset = lineDashOffset
  },
  lineCap(lineCap: CanvasLineCap, ctx: CanvasContext) {
    if (lineCap && ['butt', 'round', 'square'].includes(lineCap))
      ctx.lineCap = lineCap
  },
  lineJoin(lineJoin: CanvasLineJoin, ctx: CanvasContext) {
    if (lineJoin && ['round', 'bevel', 'miter'].includes(lineJoin))
      ctx.lineJoin = lineJoin
  },
  miterLimit(miterLimit: number, ctx: CanvasContext) {
    if (isNumber(miterLimit))
      ctx.miterLimit = miterLimit
  },
  fillStyle(fillStyle: string | CanvasGradient | CanvasPattern, ctx: CanvasContext) {
    if (fillStyle)
      ctx.fillStyle = fillStyle
  },
  strokeStyle(strokeStyle: string | CanvasGradient | CanvasPattern, ctx: CanvasContext) {
    if (strokeStyle)
      ctx.strokeStyle = strokeStyle
  },
  shadowColor(shadowColor: string, ctx: CanvasContext) {
    if (isString(shadowColor))
      ctx.shadowColor = shadowColor
  },
  shadowBlur(shadowBlur: number, ctx: CanvasContext) {
    if (isNumber(shadowBlur))
      ctx.shadowBlur = shadowBlur
  },
  shadowOffsetX(shadowOffsetX: number, ctx: CanvasContext) {
    if (isNumber(shadowOffsetX))
      ctx.shadowOffsetX = shadowOffsetX
  },
  shadowOffsetY(shadowOffsetY: number, ctx: CanvasContext) {
    if (isNumber(shadowOffsetY))
      ctx.shadowOffsetY = shadowOffsetY
  },
  wordSpacing(wordSpacing: number, ctx: CanvasContext) {
    if (isNumber(wordSpacing))
      ctx.wordSpacing = `${wordSpacing}px`
  },
  letterSpacing(letterSpacing: number, ctx: CanvasContext) {
    if (isNumber(letterSpacing))
      ctx.letterSpacing = `${letterSpacing}px`
  },
  textBaseLine(textBaseLine: CanvasTextBaseline, ctx: CanvasContext) {
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
export function settingCanvasProps(props: Recordable, ctx: CanvasContext) {
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
