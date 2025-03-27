import type { CanvasText, CanvasTextCommonOptions } from '../../types/canvas'
import type { PartiallyRequired } from '../../types/common'
import { renderLine } from '../../src/canvas/line'
import { isArray, isNil, isString } from '../../src/is'
import { settingCanvasProps } from './commonProperty'
import { calcSize } from './normalize'

type TextProps = Omit<CanvasTextCommonOptions, 'content'>
type NormalizeTextProps = PartiallyRequired<TextProps, 'fontFamily' | 'fontSize' | 'fontWeight'>

/**
 * 绘制全部段落
 */
export function enhancedDraw(text: CanvasText, options: {
  ctx: CanvasRenderingContext2D
  maxWidth: number
  x: number
  y: number
}) {
  const { ctx, maxWidth, x, y } = options
  ctx.save()
  const baseProps = settingProperty(text, { ctx })
  let contents = isArray(text.content) ? [...text.content] : [{ content: text.content }]
  let yOffset = 0
  while (contents.length) {
    const { top, bottom, content } = measureRowHeight(contents, { ctx, maxWidth, baseProps })

    yOffset += top
    content.forEach((item) => {
      ctx.save()
      settingProperty(item, { ctx, baseProps })
      draw(item, { ctx, baseProps, x: x + item.xOffset, y: y + yOffset })

      if (['overline', 'line-through', 'underline'].includes(item.textDecoration!)) {
        const offsetY = item.textDecoration === 'overline' ? item.overLineY : item.textDecoration === 'line-through' ? item.lineThroughY : item.underLineY
        renderLine({
          type: 'line',
          points: [[x + item.xOffset, y + yOffset + offsetY], [x + item.xOffset + item.width, y + yOffset + offsetY]],
          ...item.textDecorationProps,
          lineColor: item.textDecorationProps?.lineColor || item.color,
        }, {
          ctx,
          width: 100,
          height: 100,
          canvas: null as any,
        })
      }
      ctx.restore()
    })
    yOffset += bottom

    const readyLength = content.length
    const origin = contents[readyLength - 1]
    const last = content[readyLength - 1]
    const lastReady = last.content.length === origin.content.length
    contents = contents.slice(lastReady ? readyLength : readyLength - 1)
    if (!lastReady) {
      contents[0] = { ...contents[0], content: contents[0].content.slice(last.content.length) }
    }
  }
  ctx.restore()
}

/**
 * 测量全部段落总高度
 */
export function enhancedMeasure(text: CanvasText, options: {
  ctx: CanvasRenderingContext2D
  maxWidth: number
}) {
  const { ctx, maxWidth } = options
  ctx.save()
  const baseProps = settingProperty(text, { ctx })
  let contents = isArray(text.content) ? [...text.content] : [{ content: text.content }]
  let height = 0
  while (contents.length) {
    const { top, bottom, content } = measureRowHeight(contents, { ctx, maxWidth, baseProps })
    height += (top + bottom)
    const readyLength = content.length
    const origin = contents[readyLength - 1]
    const last = content[readyLength - 1]
    const lastReady = last.content.length === origin.content.length
    contents = contents.slice(lastReady ? readyLength : readyLength - 1)
    if (!lastReady) {
      contents[0] = { ...contents[0], content: contents[0].content.slice(last.content.length) }
    }
  }
  ctx.restore()
  return height
}

/**
 * 计算文本首行基线上下部分高度（含行高）
 */
function measureRowHeight(contents: CanvasTextCommonOptions[], options: {
  ctx: CanvasRenderingContext2D
  maxWidth: number
  baseProps?: NormalizeTextProps
}) {
  const { ctx, maxWidth, baseProps } = options
  const top: number[] = []
  const bottom: number[] = []
  const renderable: (CanvasTextCommonOptions & { overLineY: number, lineThroughY: number, underLineY: number, xOffset: number, width: number })[] = []
  let line = ''
  let xOffset = 0

  // 每一段
  for (let pi = 0; pi < contents.length; pi++) {
    const p = contents[pi]
    ctx.save()
    settingProperty(p, { ctx, baseProps })

    // 每个字
    for (let i = 0; i < p.content.length; i++) {
      line += p.content[i]
      const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } = measure({ ...p, content: line }, { ctx, baseProps })
      const isEnd = i === p.content.length - 1

      // 满一行或一段结束
      if (width + xOffset > maxWidth || isEnd) {
        // 文本高度
        const height = actualBoundingBoxAscent + actualBoundingBoxDescent
        // 默认百分比行高
        const baseLineHeight = isString(baseProps?.lineHeight) && baseProps.lineHeight.endsWith('%') ? baseProps.lineHeight : '120%'
        // 行高在基线上下平分
        const halfLineHeight = ((calcSize(p.lineHeight, height) || calcSize(baseLineHeight, height)) - height) / 2
        // 存储每一段文本的基线上下高度
        top.push(actualBoundingBoxAscent + halfLineHeight)
        bottom.push(actualBoundingBoxDescent + halfLineHeight)

        const baseLine = p.textBaseLine || baseProps?.textBaseLine || 'alphabetic'
        const overLineY = -actualBoundingBoxAscent
        let lineThroughY = -(height / 2) + actualBoundingBoxDescent
        const underLineY = actualBoundingBoxDescent

        if (['top', 'hanging'].includes(baseLine)) {
          lineThroughY = height / 2 - actualBoundingBoxAscent
        }
        else if (baseLine === 'middle') {
          lineThroughY = 0
        }

        renderable.push({ ...p, content: isEnd ? line : line.slice(0, -1), overLineY, lineThroughY, underLineY, xOffset, width })

        // 满一行
        if (width + xOffset > maxWidth) {
          ctx.restore()
          return {
            top: Math.max(...top),
            bottom: Math.max(...bottom),
            content: renderable,
          }
        }
        // 一段结束
        if (isEnd) {
          xOffset += width
          line = ''
        }
      }
    }

    ctx.restore()
  }

  return {
    top: Math.max(...top),
    bottom: Math.max(...bottom),
    content: renderable,
  }
}

/**
 * 绘制文本
 */
function draw(content: CanvasTextCommonOptions, options: {
  ctx: CanvasRenderingContext2D
  baseProps?: NormalizeTextProps
  x: number
  y: number
}): void {
  const { ctx, baseProps, x, y } = options
  ctx.save()
  settingProperty(content, { ctx, baseProps })
  const draw = (content.textStyle === 'stroke' ? ctx.strokeText : ctx.fillText).bind(ctx)
  if (!isNil(x) && !isNil(y)) {
    draw(content.content, x, y)
  }
  ctx.restore()
}

/**
 * 测量文本
 */
function measure(content: CanvasTextCommonOptions, options: {
  ctx: CanvasRenderingContext2D
  baseProps?: NormalizeTextProps
}): TextMetrics {
  const { ctx, baseProps } = options
  ctx.save()
  settingProperty(content, { ctx, baseProps })
  const metrics = ctx.measureText(content.content)
  ctx.restore()
  return metrics
}

/**
 * 设置字体相关属性，并返回标准化后的 baseProps 所需属性
 */
function settingProperty(props: TextProps, options: {
  ctx: CanvasRenderingContext2D
  baseProps?: NormalizeTextProps
}): NormalizeTextProps {
  let {
    fontStyle,
    fontFamily,
    fontSize,
    fontWeight,
    strokeProps,
    color,
  } = props
  let { ctx, baseProps } = options

  baseProps = baseProps || {} as NormalizeTextProps

  fontStyle = fontStyle === 'italic' ? 'italic' : 'normal'

  fontSize = Number.parseFloat(fontSize as any) || baseProps.fontSize || 16

  fontFamily = isString(fontFamily) ? fontFamily : baseProps.fontFamily || 'sans-serif'

  fontWeight = fontWeight && [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold'].includes(fontWeight) ? fontWeight : baseProps.fontWeight || 'normal'

  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`

  // 设置 canvas 属性
  settingCanvasProps({
    ...props,
    ...strokeProps,
    fillStyle: color,
    strokeStyle: color,
  }, ctx)

  return {
    ...props,
    fontStyle,
    fontSize,
    fontFamily,
    fontWeight,
  }
}
