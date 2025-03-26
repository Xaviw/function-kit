import type { CanvasText, CanvasTextCommonOptions } from '../../types/canvas'
import { isArray, isNumber, isString } from '../../src/is'
import { calcSize } from './normalize'

type HeightEffectProps = Pick<CanvasTextCommonOptions, 'fontSize' | 'fontFamily' | 'fontWeight' | 'lineHeight' | 'letterSpacing' | 'wordSpacing'>

export function measureHeight(text: CanvasText, maxWidth: number, ctx: CanvasRenderingContext2D) {
  const baseProps = normalizeProps(ctx, text)

  let {
    content,
  } = text

  content = isString(content) ? [{ content }] : content
  if (!isArray(content))
    return

  let totalHeight = 0
  let rowHeights: number[] = []

  content.forEach((item) => {
    const { lineHeight } = normalizeProps(ctx, item, baseProps)
    rowHeights.push(lineHeight)

    const textArr = item.content.split('')
    let line = ''
    for (let i = 0; i < textArr.length; i++) {
      const text = line + textArr[i]
      const width = ctx.measureText(text).width
      if (width > maxWidth && i > 0) {
        totalHeight += Math.max(...rowHeights)
        rowHeights = []
        line = textArr[i]
      }
      else {
        line = text
      }
    }
  })

  return totalHeight
}

function normalizeProps(ctx: CanvasRenderingContext2D, props: HeightEffectProps, defaultProps: HeightEffectProps & { lineHeight?: number } = {}): Required<Omit<HeightEffectProps, 'letterSpacing' | 'wordSpacing'> & { lineHeight: number }> {
  let {
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    wordSpacing,
  } = props

  fontSize = Number.parseFloat(fontSize as any) || defaultProps.fontSize || 16

  fontFamily = isString(fontFamily) ? fontFamily : defaultProps.fontFamily || 'sans-serif'

  fontWeight = fontWeight && [100, 200, 300, 400, 500, 600, 700, 800, 900, 'normal', 'bold'].includes(fontWeight) ? fontWeight : defaultProps.fontWeight || 'normal'

  lineHeight = calcSize(lineHeight, fontSize) || defaultProps.lineHeight || fontSize * 1.2

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`

  if (isNumber(letterSpacing))
    ctx.letterSpacing = `${letterSpacing}px`

  if (isNumber(wordSpacing))
    ctx.wordSpacing = `${wordSpacing}px`

  return {
    fontSize,
    fontFamily,
    fontWeight,
    lineHeight,
  }
}
