import type { CanvasText, CanvasTextCommonOptions } from '../../types/canvas'
import { isArray, isNil, isNumber, isString } from '../../src/is'
import { calcSize } from './normalize'

type HeightEffectProps = Pick<CanvasTextCommonOptions, 'fontSize' | 'fontFamily' | 'fontWeight' | 'lineHeight' | 'letterSpacing' | 'wordSpacing' | 'color'>

export function measureHeight(text: CanvasText, options: { maxWidth: number, ctx: CanvasRenderingContext2D, x?: number, y?: number }): number {
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

    for (let i = 0; i < textArr.length; i++) {
      const text = line + textArr[i]
      const width = ctx.measureText(text).width
      const isEllipsis = lineClamp && totalHeight.length === lineClamp - 1 && rowX + width + ellipsisWidth > maxWidth
      const currentY = firstLineHeight! + y! + totalHeight.reduce((p, c) => p += c, 0)
      if ((rowX + width > maxWidth || isEllipsis) && i > 0) {
        if (isRender) {
          ctx.fillText(line, x + rowX, currentY)
          if (isEllipsis) {
            const thisWidth = ctx.measureText(textArr[i]).width
            ctx.fillText(ellipsisContent, x + rowX + width - thisWidth, currentY)
          }
        }

        rowX = 0
        totalHeight.push(Math.max(...rowHeights))
        rowHeights = rowHeights.slice(-1)
        line = textArr[i]
        if (isEllipsis)
          return totalHeight.reduce((p, c) => p += c, 0)
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
          ctx.fillText(text, start, currentY)
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

function calcRestWidth(contents: CanvasTextCommonOptions[], baseProps: Required<Omit<HeightEffectProps, 'letterSpacing' | 'wordSpacing'> & { lineHeight: number }>, ctx: CanvasRenderingContext2D, position?: { x: number, y: number }): number {
  return contents.reduce((p, c) => {
    ctx.save()
    normalizeProps(ctx, c, baseProps)
    const width = ctx.measureText(c.content).width
    position && ctx.fillText(c.content, position.x + p, position.y)
    ctx.restore()
    return p + width
  }, 0)
}

function normalizeProps(ctx: CanvasRenderingContext2D, props: HeightEffectProps, defaultProps: HeightEffectProps & { lineHeight?: number } = {}): Required<Omit<HeightEffectProps, 'letterSpacing' | 'wordSpacing'> & { lineHeight: number }> {
  let {
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    wordSpacing,
    color,
  } = props

  fontSize = Number.parseFloat(fontSize as any) || defaultProps.fontSize || 16

  fontFamily = isString(fontFamily) ? fontFamily : defaultProps.fontFamily || 'sans-serif'

  fontWeight = fontWeight && [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold'].includes(fontWeight) ? fontWeight : defaultProps.fontWeight || 'normal'

  lineHeight = calcSize(lineHeight, fontSize) || defaultProps.lineHeight || fontSize * 1.2

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`

  if (isString(color)) {
    ctx.fillStyle = color
    ctx.strokeStyle = color
  }

  if (isNumber(letterSpacing))
    ctx.letterSpacing = `${letterSpacing}px`

  if (isNumber(wordSpacing))
    ctx.wordSpacing = `${wordSpacing}px`

  return {
    fontSize,
    fontFamily,
    fontWeight,
    lineHeight,
    color: color!,
  }
}
