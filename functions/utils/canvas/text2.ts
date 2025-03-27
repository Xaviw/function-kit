import type { CanvasText, CanvasTextCommonOptions } from '../../types/canvas'
import type { PartiallyRequired } from '../../types/common'
import { isArray, isNil, isString } from '../../src/is'
import { settingCanvasProps } from './commonProperty'
import { calcSize } from './normalize'

type TextProps = Omit<CanvasTextCommonOptions, 'content'>
type NormalizeTextProps = PartiallyRequired<TextProps, 'fontFamily' | 'fontSize' | 'fontWeight'> & { lineHeight: number, percentLineHeight?: string }

export function measureOrRender(text: CanvasText, options: { maxWidth: number, ctx: CanvasRenderingContext2D, x?: number, y?: number }): number {
  const { maxWidth, ctx, x, y } = options
  const baseProps = normalizeProps(ctx, text)

  let {
    content,
    ellipsisContent,
    lineClamp,
    textAlign,
  } = text
  ellipsisContent = isString(ellipsisContent) ? ellipsisContent : '...'

  content = isString(content) ? [{ content }] : content
  if (!isArray(content))
    return 0

  const isRender = !isNil(x) && !isNil(y)

  const totalHeight: number[] = []
  let rowHeights: number[] = []
  let rowX = 0
  let firstLineHeight: number

  for (let ci = 0; ci < content.length; ci++) {
    ctx.save()
    const item = content[ci]
    const { lineHeight } = normalizeProps(ctx, item, baseProps)
    if (ci === 0)
      firstLineHeight = lineHeight
    rowHeights.push(lineHeight)

    const textArr = item.content.split('')
    let line = ''
    const ellipsisWidth = ctx.measureText(ellipsisContent).width

    const draw = (item.textStyle === 'stroke' ? ctx.strokeText : ctx.fillText).bind(ctx)

    for (let i = 0; i < textArr.length; i++) {
      const text = line + textArr[i]
      const width = ctx.measureText(text).width
      const isEllipsis = lineClamp && totalHeight.length === lineClamp - 1 && rowX + width + ellipsisWidth > maxWidth
      const currentY = firstLineHeight! + y! + totalHeight.reduce((p, c) => p += c, 0)
      if ((rowX + width > maxWidth || isEllipsis) && i > 0) {
        if (isRender) {
          draw(line, x + rowX, currentY)
          if (isEllipsis) {
            const thisWidth = ctx.measureText(textArr[i]).width
            draw(ellipsisContent, x + rowX + width - thisWidth, currentY)
          }
        }

        totalHeight.push(Math.max(...rowHeights))
        if (isEllipsis)
          return totalHeight.reduce((p, c) => p += c, 0)
        rowX = 0
        rowHeights = rowHeights.slice(-1)
        if (i === textArr.length - 1) {
          i--
          line = ''
        }
        else {
          line = textArr[i]
        }
      }
      else {
        if (isRender && i === textArr.length - 1) {
          let start = x + rowX
          const restWidth = calcRestWidth(content.slice(ci + 1), baseProps, ctx)
          const isEnd = width + restWidth < maxWidth
          if (isEnd) {
            if (textAlign === 'center')
              start = x + (maxWidth - width - restWidth) / 2
            else if (textAlign === 'right')
              start = x + maxWidth - width - restWidth
          }
          draw(text, start, currentY)
          isEnd && calcRestWidth(content.slice(ci + 1), baseProps, ctx, { x: start + width, y: currentY })
          rowX += width
        }

        line = text
      }
    }
    ctx.restore()
  }

  return totalHeight.reduce((p, c) => p += c, 0)
}

function calcRestWidth(contents: CanvasTextCommonOptions[], baseProps: NormalizeTextProps, ctx: CanvasRenderingContext2D, position?: { x: number, y: number }): number {
  return contents.reduce((p, c) => {
    ctx.save()
    normalizeProps(ctx, c, baseProps)
    const width = ctx.measureText(c.content).width
    const draw = c.textStyle === 'stroke' ? ctx.strokeText : ctx.fillText
    position && draw(c.content, position.x + p, position.y)
    ctx.restore()
    return p + width
  }, 0)
}

function normalizeProps(ctx: CanvasRenderingContext2D, props: TextProps, defaultProps?: NormalizeTextProps): NormalizeTextProps {
  let {
    fontStyle,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    // fontStyle,
    strokeProps,
    color,
    // textDecoration,
  } = props

  defaultProps = defaultProps || {} as NormalizeTextProps

  fontStyle = fontStyle === 'italic' ? 'italic' : 'normal'

  fontSize = Number.parseFloat(fontSize as any) || defaultProps.fontSize || 16

  fontFamily = isString(fontFamily) ? fontFamily : defaultProps.fontFamily || 'sans-serif'

  fontWeight = fontWeight && [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold'].includes(fontWeight) ? fontWeight : defaultProps.fontWeight || 'normal'

  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`

  const percentLineHeight = isString(lineHeight) && lineHeight.endsWith('%') ? lineHeight : undefined
  lineHeight = calcSize(lineHeight, fontSize) || (defaultProps.percentLineHeight ? calcSize(defaultProps.percentLineHeight, fontSize) : fontSize * 1.2)

  // 设置 canvas 属性
  settingCanvasProps({
    ...props,
    ...strokeProps,
    fillStyle: color,
    strokeStyle: color,
  }, ctx)

  return {
    ...props,
    fontSize,
    fontFamily,
    fontWeight,
    lineHeight: lineHeight!,
    percentLineHeight,
  }
}
