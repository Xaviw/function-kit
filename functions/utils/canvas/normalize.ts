import type { CanvasElementCommonOptions, CanvasElementRenderFnOptions, CanvasLine, PosterElement, PosterElements } from '../../types/canvas'
import { isArray, isFunction, isNil, isString } from '../../src/is'
import { mapObject } from '../../src/mapObject'
import { memo } from '../../src/memo'

/**
 * 定位、尺寸相关属性
 */
export type StandardSizeProp = Pick<CanvasElementCommonOptions, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height'>

/**
 * 根据定位、尺寸属性计算标准盒子属性
 */
export interface NormalizedBox {
  x1: number
  y1: number
  width: number
  height: number
}

export const standardStrategy = memo(
  (props: StandardSizeProp, options: CanvasElementRenderFnOptions): NormalizedBox => {
    const { width: canvasWidth, height: canvasHeight } = options

    const normalizeOptions = mapObject(props, (key, value) => {
      if (isNil(value))
        return [key, value]

      return [key, calcSize(value, options) || undefined]
    })

    const { top, right, bottom, left, width: elementWidth, height: elementHeight } = normalizeOptions

    let x1 = 0
    let y1 = 0
    let width = 0
    let height = 0

    if (!isNil(elementWidth)) {
      width = elementWidth

      if (!isNil(left))
        x1 = left
      else if (!isNil(right))
        x1 = canvasWidth - right - width
      else
        x1 = 0
    }
    else {
      x1 = left || 0
      const x2 = right || 0
      width = canvasWidth - x1 - x2
    }

    if (!isNil(elementHeight)) {
      height = elementHeight

      if (!isNil(top))
        y1 = top
      else if (!isNil(bottom))
        y1 = canvasHeight - bottom - height
      else
        y1 = 0
    }
    else {
      y1 = top || 0
      const y2 = bottom || 0
      height = canvasHeight - y1 - y2
    }

    return {
      x1,
      y1,
      width,
      height,
    }
  },
  {
    key(props, options) {
      const { top, right, bottom, left, width, height } = props
      const { width: canvasWidth, height: canvasHeight } = options
      return JSON.stringify({ top, right, bottom, left, width, height, canvasWidth, canvasHeight })
    },
    lruMax: 20,
  },
)

export const lineStrategy = memo((props: Pick<CanvasLine, 'points'>, options: CanvasElementRenderFnOptions): NormalizedBox & { points: [number, number][] } => {
  const [first = [0, 0], ...points] = props?.points || []
  const [x1, y1] = first.map(item => calcSize(item, options))
  const initial: NormalizedBox & { points: [number, number][] } = {
    x1,
    y1,
    width: 0,
    height: 0,
    points: [[x1, y1]],
  }

  if (!points.length)
    return initial

  return points.reduce((p, c) => {
    const [x, y] = (isArray(c) ? c : []).map(item => calcSize(item, options))
    if ([x, y].some(Number.isNaN))
      return p

    return {
      x1: Math.min(p.x1, x),
      y1: Math.min(p.y1, y),
      width: Math.max(p.width, x),
      height: Math.max(p.height, y),
      points: [...p.points, [x, y]],
    }
  }, initial)
}, {
  key(props, options) {
    const { points } = props
    const { width, height } = options
    return JSON.stringify({ points, width, height })
  },
  lruMax: 20,
})

const normalizeStrategies: Record<PosterElement['type'], (props: any, options: CanvasElementRenderFnOptions) => any> = {
  rect: standardStrategy,
  text: standardStrategy,
  image: standardStrategy,
  line: lineStrategy,
}

/**
 * 绘制参数标准化中间层
 */
export function normalizeElement<T extends PosterElement>(element: T, elements: PosterElements, options: CanvasElementRenderFnOptions): ReturnType<(typeof normalizeStrategies)[T['type']]> {
  if (!element.relativeTo)
    return normalizeStrategies[element.type](element, options)

  const relativeElement = elements.find(item => !isFunction(item) && item.id === element.relativeTo) as PosterElement
  if (!relativeElement)
    return normalizeStrategies[element.type](element, options)

  const { x1: containerX1, y1: containerY1, width, height } = normalizeElement(relativeElement, elements, options) as NormalizedBox

  const { x1, y1, ...size } = normalizeStrategies[element.type](element, { ...options, width, height })

  return {
    ...size,
    x1: containerX1 + x1,
    y1: containerY1 + y1,
  }
}

/**
 * 标准化数值与百分比字符串
 */
function calcSize(val: number | string, options: CanvasElementRenderFnOptions): number {
  if (isString(val) && val.endsWith('%'))
    return options.width * (Number.parseFloat(val) / 100)

  return Number.parseFloat(val as any)
}
