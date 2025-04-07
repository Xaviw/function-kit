import type { CanvasContext } from '../../types/_canvas'
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
  textBaseLine(textBaseLine, ctx) {
    if (textBaseLine && ['alphabetic', 'bottom', 'hanging', 'ideographic', 'middle', 'top'].includes(textBaseLine))
      ctx.textBaseline = textBaseLine
  },
}

type CanavsProp = keyof typeof canvasPropsStrategies

type CanvasProps = Partial<Record<CanavsProp, any>> & Recordable

/**
 * 设置 canvas 实例属性
 * @param props 实例属性对象
 */
export function settingCanvasProps(props: CanvasProps, ctx: CanvasContext) {
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key) && canvasPropsStrategies[key]) {
      canvasPropsStrategies[key](props[key], ctx)
    }
  }

  const borderSize = Math.max(Number.parseFloat(props.borderSize) || 0, 0)
  if (borderSize) {
    if (props.borderStyle === 'dashed' && !props.borderDash)
      ctx.setLineDash([borderSize * 2, borderSize])
    else if (props.borderStyle === 'solid' && props.borderDash)
      ctx.setLineDash([])
  }

  if (props.fontStyle && props.fontWeight && props.fontSize && props.fontFamily
  )
    ctx.font = `${props.fontStyle} ${props.fontWeight} ${props.fontSize}px '${props.fontFamily}'`

  return borderSize
}
