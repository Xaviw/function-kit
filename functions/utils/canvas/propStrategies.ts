import type { CanvasContext } from '../../types/canvas'
import type { Recordable } from '../../types/common'
import { isArray, isNumber, isObject, isString } from '../../src/is'

/**
 * canvas 实例属性绘制策略
 */
const canvasPropsStrategies: Record<string, (val: any, ctx: CanvasContext) => void> = {
  lineWidth(lineWidth, ctx) {
    if (isNumber(lineWidth) && lineWidth >= 0)
      ctx.lineWidth = lineWidth
  },
  lineDash(lineDash, ctx) {
    if (isArray(lineDash) && lineDash.every(isNumber))
      ctx.setLineDash(lineDash)
  },
  lineDashOffset(lineDashOffset, ctx) {
    if (isNumber(lineDashOffset))
      ctx.lineDashOffset = lineDashOffset
  },
  lineCap(lineCap, ctx) {
    if (lineCap && ['butt', 'round', 'square'].includes(lineCap))
      ctx.lineCap = lineCap
  },
  lineJoin(lineJoin, ctx) {
    if (lineJoin && ['round', 'bevel', 'miter'].includes(lineJoin))
      ctx.lineJoin = lineJoin
  },
  miterLimit(miterLimit, ctx) {
    if (isNumber(miterLimit) && miterLimit >= 0)
      ctx.miterLimit = miterLimit
  },
  fillStyle(fillStyle, ctx) {
    if (isString(fillStyle) || isObject(fillStyle))
      ctx.fillStyle = fillStyle as string | CanvasGradient | CanvasPattern
  },
  strokeStyle(strokeStyle, ctx) {
    if (isString(strokeStyle) || isObject(strokeStyle))
      ctx.strokeStyle = strokeStyle as string | CanvasGradient | CanvasPattern
  },
  shadowColor(shadowColor, ctx) {
    if (isString(shadowColor))
      ctx.shadowColor = shadowColor
  },
  shadowBlur(shadowBlur, ctx) {
    if (isNumber(shadowBlur) && shadowBlur >= 0)
      ctx.shadowBlur = shadowBlur
  },
  shadowOffsetX(shadowOffsetX, ctx) {
    if (isNumber(shadowOffsetX))
      ctx.shadowOffsetX = shadowOffsetX
  },
  shadowOffsetY(shadowOffsetY, ctx) {
    if (isNumber(shadowOffsetY))
      ctx.shadowOffsetY = shadowOffsetY
  },
  wordSpacing(wordSpacing, ctx) {
    if (isNumber(wordSpacing))
      ctx.wordSpacing = `${wordSpacing}px`
  },
  letterSpacing(letterSpacing, ctx) {
    if (isNumber(letterSpacing))
      ctx.letterSpacing = `${letterSpacing}px`
  },
  textBaseline(textBaseline, ctx) {
    if (textBaseline && ['alphabetic', 'bottom', 'hanging', 'ideographic', 'middle', 'top'].includes(textBaseline))
      ctx.textBaseline = textBaseline
  },
  filter(filter, ctx) {
    if (isString(filter))
      ctx.filter = filter
  },
}

type CanavsProp = keyof typeof canvasPropsStrategies

type CanvasProps = Partial<Record<CanavsProp, any>> & Recordable

/**
 * 设置 canvas 实例属性
 * @param props 实例属性对象
 */
export function settingCanvasProps(props: CanvasProps, ctx: CanvasContext) {
  Object.entries(props).forEach(([key, value]) => {
    const strategy = canvasPropsStrategies[key]
    strategy && strategy(value, ctx)
  })

  ctx.font = `${props.fontStyle} ${props.fontWeight} ${props.fontSize}px '${props.fontFamily}'`
}
