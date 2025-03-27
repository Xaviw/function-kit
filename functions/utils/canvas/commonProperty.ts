import type { CanvasElementRenderFnOptions } from '../../types/canvas'
import type { Recordable } from '../../types/common'
import type { NormalizedBox } from './normalize'
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
  fillStyle(fillStyle: string, ctx: CanvasRenderingContext2D) {
    if (isString(fillStyle))
      ctx.fillStyle = fillStyle
  },
  strokeStyle(strokeStyle: string, ctx: CanvasRenderingContext2D) {
    if (isString(strokeStyle))
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
}

/**
 * 绘制元素旋转
 * @param rotate 旋转角度
 * @param sizeProps normalizeElementSize 返回值
 * @param options 上下文相关属性
 */
export function rotateCanvasElement(rotate: number, sizeProps: NormalizedBox, options: CanvasElementRenderFnOptions): void {
  if (isNumber(rotate)) {
    const { x, y, width, height } = sizeProps
    const { ctx } = options
    const centerX = x + width / 2
    const centerY = y + height / 2
    ctx.translate(centerX, centerY)
    ctx.rotate((rotate * Math.PI) / 180)
    ctx.translate(-centerX, -centerY)
  }
}
