import type { CanvasContext, ElementBox, PosterText, PosterTextCommonOptions } from '../../types/canvas'
import type { Fn, PartiallyRequired, Recordable } from '../../types/common'
import { isArray, isFunction, isNil, isNumber, isObject, isString } from '../../src/is'
import { mapObject } from '../../src/mapObject'
import { pick } from '../../src/pick'
import { loadFont } from './common'
import { line } from './line'
import { settingCanvasProps } from './propStrategies'

interface NormalizedText extends PosterText {
  x: number
  y: number
  width: number
  height: number
}

export const text = {
  // 前置工作、与容器尺寸无关的属性标准化
  async prepare(props: PosterText) {
    const { fontFamily, fontFamilySrc, content } = props
    const fonts = []

    if (fontFamily && fontFamilySrc)
      fonts.push([fontFamily, fontFamilySrc])

    if (isArray(content)) {
      content.forEach((item) => {
        if (item.fontFamily && item.fontFamilySrc)
          fonts.push([item.fontFamily, item.fontFamilySrc])
      })
    }

    const events: Promise<any>[] = []
    fonts.forEach(([family, src]) => {
      events.push(loadFont(family, src))
    })
    await Promise.allSettled(events)

    return props
  },
  // 容器尺寸相关的属性标准化
  calculate(preparedProps: PosterText, parentContainer: ElementBox, { ctx, maxWidth }: { ctx: CanvasContext, maxWidth: number }): NormalizedText {
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
    else if (!isNil(left)) {
      x = left

      if (!isNil(right)) {
        const x2 = containerWidth - right
        width = Math.abs(x2 - x)
        x = Math.min(x, x2)
      }
    }

    if (elementHeight && elementHeight > 0) {
      height = elementHeight

      if (!isNil(top))
        y = top
      else if (!isNil(bottom))
        y = containerHeight - bottom - height
    }
    else if (!isNil(top)) {
      y = top

      if (!isNil(bottom)) {
        const y2 = containerHeight - bottom
        height = Math.abs(y2 - y)
        y = Math.min(y, y2)
      }
    }

    const { height: fullHeight, width: realWidth } = enhancedMeasure(preparedProps, { maxWidth: width || maxWidth, ctx })

    if (width <= 0) {
      width = maxWidth
    }
    if (height <= 0) {
      height = fullHeight
    }

    if (isNil(left) && !isNil(right)) {
      x = containerWidth - right - width
    }

    if (isNil(top) && !isNil(bottom)) {
      y = containerHeight - bottom - height
    }

    if (preparedProps.textAlign === 'center') {
      x += (width - realWidth) / 2
    }
    else if (preparedProps.textAlign === 'right') {
      x += width - realWidth
    }
    width = realWidth
    height = fullHeight

    return { ...preparedProps, x, y, width, height }
  },
  // 绘制
  render(calculatedProps: NormalizedText, { ctx }: { ctx: CanvasContext }) {
    const { x, y, width } = calculatedProps
    enhancedDraw(calculatedProps, { maxWidth: width, ctx, x, y })
  },
}
type TextProps = Omit<PosterTextCommonOptions, 'content'>
type NormalizeTextProps = PartiallyRequired<TextProps, 'lineHeight' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'textBaseline' | 'fontStyle' | 'textStyle' | 'textDecorationProps' | 'strokeProps'>

/**
 * 绘制全部段落
 */
function enhancedDraw(text: PosterText, options: {
  ctx: CanvasContext
  maxWidth: number
  x: number
  y: number
}) {
  let { content, textAlign, lineClamp, ellipsisContent } = text
  lineClamp = isNumber(lineClamp) && lineClamp > 0 ? lineClamp : Infinity
  ellipsisContent = isString(ellipsisContent) ? ellipsisContent : '...'

  const { ctx, maxWidth, x, y } = options
  ctx.save()
  const baseProps = settingProperty(text, { ctx })
  let contents = isArray(content) ? [...content] : [{ content }]
  let yOffset = 0
  let rowNum = 1

  while (contents.length) {
    const { top, bottom, content } = measureRowHeight(contents, { ctx, maxWidth, baseProps, suffix: rowNum === lineClamp ? ellipsisContent : '' })

    const readyLength = content.length
    const origin = contents[readyLength - 1]
    const last = content[readyLength - 1]
    const lastReady = last.content.length === origin.content.length

    yOffset += top

    // 最后一行
    let alignOffset = 0
    if (content.length === contents.length && lastReady) {
      const rowWidth = content.reduce((p, c) => p + c.width, 0)
      if (textAlign === 'center')
        alignOffset = (maxWidth - rowWidth) / 2
      if (textAlign === 'right')
        alignOffset = maxWidth - rowWidth
    }

    content.forEach((item) => {
      const { backgroundColor, overLineY, xOffset, width, underLineY, textDecorationProps, textDecoration, color, lineThroughY } = item

      if (backgroundColor) {
        ctx.save()
        ctx.fillStyle = backgroundColor
        ctx.fillRect(
          x + xOffset + alignOffset,
          y + yOffset + overLineY,
          width,
          Math.abs(overLineY) + Math.abs(underLineY),
        )
        ctx.restore()
      }

      ctx.save()
      settingProperty(item, { ctx, baseProps })
      draw(item, { ctx, baseProps, x: x + xOffset + alignOffset, y: y + yOffset })

      if (['overline', 'line-through', 'underline'].includes(textDecoration!)) {
        const offsetY = textDecoration === 'overline' ? overLineY : textDecoration === 'line-through' ? lineThroughY : underLineY
        const halfLine = textDecorationProps.lineWidth && textDecorationProps.lineWidth > 0 ? textDecorationProps.lineWidth / 2 : 0.5
        const halfLineOffset = textDecoration === 'overline' ? -halfLine : textDecoration === 'underline' ? halfLine : 0
        line.render(
          {
            ...textDecorationProps,
            points: [[x + xOffset + alignOffset, y + yOffset + offsetY + halfLineOffset], [x + xOffset + alignOffset + width, y + yOffset + offsetY + halfLineOffset]],
            lineColor: textDecorationProps.lineColor || color,
          } as any,
          { ctx },
        )
      }
      ctx.restore()
    })

    if (rowNum === lineClamp) {
      contents = []
    }
    else {
      yOffset += bottom
      contents = contents.slice(lastReady ? readyLength : readyLength - 1)
      if (!lastReady) {
        contents[0] = { ...contents[0], content: contents[0].content.slice(last.content.length) }
      }
    }

    rowNum++
  }
  ctx.restore()
}

/**
 * 测量全部段落总高度，最大宽度，以及不换行的总宽度
 */
export function enhancedMeasure(text: PosterText, options: {
  ctx: CanvasContext
  maxWidth: number
}) {
  let { lineClamp, content } = text
  lineClamp = isNumber(lineClamp) && lineClamp > 0 ? lineClamp : Infinity
  const { ctx, maxWidth } = options
  ctx.save()
  const baseProps = settingProperty(text, { ctx })
  let contents = isArray(content) ? [...content] : [{ content }]
  let height = 0
  let width = 0
  let rowNum = 1
  let paragraphWidth = 0
  while (contents.length) {
    const { top, bottom, content } = measureRowHeight(contents, { ctx, maxWidth, baseProps })
    height += (top + bottom)
    const rowWidth = content.reduce((p, c) => p + c.width, 0)
    width += rowWidth
    if (rowWidth > paragraphWidth)
      paragraphWidth = rowWidth
    if (rowNum < lineClamp) {
      rowNum++
      const readyLength = content.length
      const origin = contents[readyLength - 1]
      const last = content[readyLength - 1]
      const lastReady = last.content.length === origin.content.length
      contents = contents.slice(lastReady ? readyLength : readyLength - 1)
      if (!lastReady) {
        contents[0] = { ...contents[0], content: contents[0].content.slice(last.content.length) }
      }
    }
    else {
      contents = []
    }
  }
  ctx.restore()
  return { fullWidth: width, height, width: width > maxWidth ? maxWidth : width }
}

/**
 * 计算文本首行基线上下部分高度（含行高）
 */
function measureRowHeight(contents: PosterTextCommonOptions[], options: {
  ctx: CanvasContext
  maxWidth: number
  baseProps?: NormalizeTextProps
  suffix?: string
}) {
  const { ctx, maxWidth, baseProps } = options
  const top: number[] = []
  const bottom: number[] = []
  const renderable: (NormalizeTextProps & { content: string, overLineY: number, lineThroughY: number, underLineY: number, xOffset: number, width: number })[] = []
  let row = ''
  let xOffset = 0

  // 每一段
  for (let pi = 0; pi < contents.length; pi++) {
    const p = contents[pi]
    ctx.save()
    const props = settingProperty(p, { ctx, baseProps })
    const suffix = isString(options.suffix) ? options.suffix : ''
    const suffixWidth = isString(options.suffix) ? measure({ ...props, content: options.suffix }, { ctx }).width : 0
    let lastWidth: number

    // 每个字
    for (let i = 0; i < p.content.length; i++) {
      row += p.content[i]
      const { width, fontBoundingBoxAscent, fontBoundingBoxDescent } = measure({ ...p, content: row + suffix }, { ctx, baseProps })
      lastWidth = width
      const isEnd = i === p.content.length - 1

      // 满一行或一段结束
      if (width + xOffset > maxWidth || isEnd) {
        // 文本高度
        const height = fontBoundingBoxAscent + fontBoundingBoxDescent
        // 行高在文字上下平分
        let { lineHeight } = props
        lineHeight = isNumber(lineHeight)
          ? lineHeight
          : isFunction(lineHeight)
            ? lineHeight(height)
            : height * 1.2
        const halfLineHeight = Math.max((lineHeight - height) / 2, 0)
        // 存储每一段文本的基线上下高度
        top.push(fontBoundingBoxAscent + halfLineHeight)
        bottom.push(fontBoundingBoxDescent + halfLineHeight)

        const baseLine = props.textBaseline
        const overLineY = -fontBoundingBoxAscent
        let lineThroughY = -(height / 2) + fontBoundingBoxDescent
        const underLineY = fontBoundingBoxDescent

        if (['top', 'hanging'].includes(baseLine)) {
          lineThroughY = height / 2 - fontBoundingBoxAscent
        }
        else if (baseLine === 'middle') {
          lineThroughY = 0
        }

        renderable.push({
          ...props,
          content: isEnd ? row : row.slice(0, -1) + suffix,
          overLineY,
          lineThroughY,
          underLineY,
          xOffset,
          width: isEnd ? width - suffixWidth : lastWidth,
        })

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
          row = ''
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
function draw(content: PosterTextCommonOptions, options: {
  ctx: CanvasContext
  baseProps?: NormalizeTextProps
  x: number
  y: number
}): void {
  const { ctx, baseProps, x, y } = options
  ctx.save()
  const props = settingProperty(content, { ctx, baseProps })
  const draw = (props.textStyle === 'stroke' ? ctx.strokeText : ctx.fillText).bind(ctx)
  if (!isNil(x) && !isNil(y)) {
    draw(content.content, x, y)
  }
  ctx.restore()
}

/**
 * 测量文本
 */
export function measure(content: PosterTextCommonOptions, options: {
  ctx: CanvasContext
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
function settingProperty(properties: Omit<TextProps, 'fontFamilySrc'>, options: {
  ctx: CanvasContext
  baseProps?: NormalizeTextProps
}): NormalizeTextProps {
  const props: Recordable = { ...properties }
  const { ctx, baseProps = {} as NormalizeTextProps } = options

  const strategies: Record<keyof Omit<TextProps, 'fontFamilySrc'>, [Fn] | [Fn, any]> = {
    lineHeight: [
      (v: any) => isNumber(v) || isFunction(v),
      '120%',
    ],
    fontSize: [
      isNumber,
      'normal',
    ],
    fontFamily: [
      isString,
      'sans-serif',
    ],
    fontWeight: [
      (v: any) => [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold'].includes(v),
      'normal',
    ],
    color: [
      (v: any) => isString(v) || isObject(v),
    ],
    textBaseline: [
      (v: any) => ['alphabetic', 'bottom', 'hanging', 'ideographic', 'middle', 'top'].includes(v),
      'alphabetic',
    ],
    letterSpacing: [
      isNumber,
    ],
    wordSpacing: [
      isNumber,
    ],
    fontStyle: [
      (v: any) => ['italic', 'normal'].includes(v),
      'normal',
    ],
    textDecoration: [
      (v: any) => ['underline', 'overline', 'line-through'].includes(v),
    ],
    textDecorationProps: [
      isObject,
      {},
    ],
    textStyle: [
      (v: any) => ['fill', 'stroke'].includes(v),
      'fill',
    ],
    strokeProps: [
      isObject,
      {},
    ],
    backgroundColor: [
      (v: any) => isString(v) || isObject(v),
    ],
    shadowBlur: [
      isNumber,
    ],
    shadowColor: [isString],
    shadowOffsetX: [
      (v: any) => isNumber(v) || (isString(v) && v.endsWith('%')),
    ],
    shadowOffsetY: [
      (v: any) => isNumber(v) || (isString(v) && v.endsWith('%')),
    ],
  }

  Object.entries(strategies).forEach(([key, value]) => {
    if (!value[0](props[key])) {
      props[key] = (baseProps as Recordable)[key] || value[1]
    }
  })

  // 设置 canvas 属性
  settingCanvasProps({
    ...props,
    ...props.strokeProps,
    fillStyle: props.color,
    strokeStyle: props.color,
  }, ctx)

  return props as NormalizeTextProps
}
