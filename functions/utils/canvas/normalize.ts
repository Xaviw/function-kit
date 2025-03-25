import type { CanvasElementCommonOptions, CanvasElementRenderFnOptions, CanvasLine, PosterElement, PosterElements } from '../../types/canvas'
import type { Recordable } from '../../types/common'
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

export const standardStrategy = memo((props: CanvasElementCommonOptions, options: NormalizedBox): NormalizedBox & { top: number, left: number, bottom: undefined, right: undefined } => {
  const { width: containerWidth, height: containerHeight, x: containerX, y: containerY } = options

  const normalizeOptions = mapObject(props, (key, value) => {
    if (isNil(value) || !['top', 'right', 'bottom', 'left', 'width', 'height'].includes(key))
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
    x: containerX + x,
    left: containerX + x,
    y: containerY + y,
    top: containerY + y,
    right: undefined,
    bottom: undefined,
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

export const lineStrategy = memo((props: CanvasLine, options: NormalizedBox): NormalizedBox & { points: [number, number][] } => {
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
export function normalizeElement<T extends PosterElement>(element: T, elements: PosterElements, options: CanvasElementRenderFnOptions): NormalizedBox & Recordable {
  const { width, height } = options
  const strategy = normalizeStrategies[element.type]
  if (!element.relativeTo)
    return strategy(element as any, { width, height, x: 0, y: 0 })

  const relativeElement = elements.find(item => !isFunction(item) && item.id === element.relativeTo) as PosterElement | undefined

  if (!relativeElement)
    return strategy(element as any, { width, height, x: 0, y: 0 })

  const { x, y, width: containerWidth, height: containerHeight } = normalizeElement(relativeElement, elements, options)

  return strategy(element as any, { width: containerWidth, height: containerHeight, x, y })
}

/**
 * 标准化数值与百分比字符串
 */
export function calcSize(val: any, base: number): number {
  if (isString(val) && val.endsWith('%'))
    return base * Number.parseFloat(val) / 100

  return Number.parseFloat(val as any)
}
