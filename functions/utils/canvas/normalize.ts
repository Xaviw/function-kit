import type { CanvasElementCommonOptions, CanvasElementRenderFnOptions, CanvasLine, PosterElement, PosterElements } from '../../types/canvas'
import { isArray, isFunction, isNil, isString } from '../../src/is'
import { mapObject } from '../../src/mapObject'
import { memo } from '../../src/memo'

/**
 * 根据定位、尺寸属性计算标准盒子属性
 */
export interface NormalizedBox {
  x: number
  y: number
  width: number
  height: number
}

/**
 * 定位、尺寸相关属性
 */
export type StandardSizeProp = Pick<CanvasElementCommonOptions, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height'>

export const standardStrategy = memo((props: StandardSizeProp, options: NormalizedBox): NormalizedBox => {
  const { width: containerWidth, height: containerHeight } = options

  const normalizeOptions = mapObject(props, (key, value) => {
    if (isNil(value))
      return [key, value]

    const isVertical = ['top', 'bottom', 'height'].includes(key)
    return [key, calcSize(value, isVertical ? containerHeight : containerWidth) || undefined]
  })

  const { top, right, bottom, left, width: elementWidth, height: elementHeight } = normalizeOptions

  let x = 0
  let y = 0
  let width = 0
  let height = 0

  if (!isNil(elementWidth)) {
    width = elementWidth

    if (!isNil(left))
      x = left
    else if (!isNil(right))
      x = containerWidth - right - width
    else
      x = 0
  }
  else {
    x = left || 0
    const x2 = right || 0
    width = containerWidth - x - x2
  }

  if (!isNil(elementHeight)) {
    height = elementHeight

    if (!isNil(top))
      y = top
    else if (!isNil(bottom))
      y = containerHeight - bottom - height
    else
      y = 0
  }
  else {
    y = top || 0
    const y2 = bottom || 0
    height = containerHeight - y - y2
  }

  return {
    x,
    y,
    width,
    height,
  }
}, {
  key(props, options) {
    const { top, right, bottom, left, width, height } = props
    const { width: containerWidth, height: containerHeight, x: containerX, y: containerY } = options
    return JSON.stringify({ top, right, bottom, left, width, height, containerWidth, containerHeight, containerX, containerY })
  },
  lruMax: 20,
})

export const lineStrategy = memo((props: Pick<CanvasLine, 'points'>, options: NormalizedBox): NormalizedBox & { points: [number, number][] } => {
  const [first = [0, 0], ...points] = props?.points || []
  const { width, height, x, y } = options
  const [firstX, firstY] = first.map((item, index) => calcSize(item, [width, height][index]))

  let minX = firstX
  let minY = firstY
  let maxX = firstX
  let maxY = firstY

  if (!points.length)
    return { points: [] } as any

  const normalizedPoints = points.reduce((p, c) => {
    const [pointX, pointY] = (isArray(c) ? c : []).map((item, index) => calcSize(item, [width, height][index]))
    if ([pointX, pointY].some(Number.isNaN))
      return p

    minX = Math.min(minX, pointX)
    minY = Math.min(minY, pointY)
    maxX = Math.max(maxX, pointX)
    maxY = Math.max(maxY, pointY)

    return [...p, [pointX, pointY] as [number, number]]
  }, [] as [number, number][])

  return {
    width: maxX - minX || 1,
    height: maxY - minY || 1,
    x: x + minX,
    y: y + minY,
    points: [[firstX, firstY], ...normalizedPoints].map(([pointX, pointY]) => [x + pointX, y + pointY]),
  }
}, {
  key(props, options) {
    const { points } = props
    const { width, height, x, y } = options
    return JSON.stringify({ points, width, height, x, y })
  },
  lruMax: 20,
})

const normalizeStrategies = {
  rect: standardStrategy,
  text: standardStrategy,
  image: standardStrategy,
  line: lineStrategy,
} as const

/**
 * 绘制参数标准化中间层
 */
export function normalizeElement<T extends PosterElement>(element: T, elements: PosterElements, options: CanvasElementRenderFnOptions): ReturnType<(typeof normalizeStrategies)[T['type']]> {
  const { width, height } = options
  if (!element.relativeTo)
    return normalizeStrategies[element.type](element, { width, height, x: 0, y: 0 })

  const relativeElement = elements.find(item => !isFunction(item) && item.id === element.relativeTo) as PosterElement
  if (!relativeElement)
    return normalizeStrategies[element.type](element, { width, height, x: 0, y: 0 })

  const { x: containerX, y: containerY, width: containerWidth, height: containerHeight } = normalizeElement(relativeElement, elements, options)

  return normalizeStrategies[element.type](element, { width: containerWidth, height: containerHeight, x: containerX, y: containerY })
}

/**
 * 标准化数值与百分比字符串
 */
function calcSize(val: number | string, base: number): number {
  if (isString(val) && val.endsWith('%'))
    return base * Number.parseFloat(val) / 100

  return Number.parseFloat(val as any)
}
