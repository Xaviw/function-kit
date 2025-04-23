import type { Canvas, CanvasContext, ElementBox } from '../../types/canvas'
import type { MaybePromise } from '../../types/common'
import { isNumber, isString } from '../../src/is'
import { memo } from '../../src/memo'
import { isPath, isUrl } from '../../src/reg'

/*
 * 接收 dpr 判断是否可用，不可用则获取设备 dpr
 */
export function getDpr(dpr?: number) {
  if (isNumber(dpr) && dpr > 0)
    return dpr

  if (PLATFORM === 'miniprogram') {
    const { pixelRatio } = wx.getWindowInfo()
    return pixelRatio
  }
  else {
    return window.devicePixelRatio
  }
}

interface CanvasNode {
  node: Canvas
  width: number
  height: number
}

/**
 * 获取 canvas 节点
 */
export function getCanvas(str: string, componentThis?: any): MaybePromise<CanvasNode> {
  if (PLATFORM === 'miniprogram') {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery()
      componentThis && query.in(componentThis)
      query.select(str)
        .fields(
          { node: true, size: true },
          (res) => {
            const { node, width, height } = res || {}
            resolve({ node, width, height })
          },
        )
        .exec()
    })
  }
  else {
    const node = document.querySelector(str) as HTMLCanvasElement
    return node
      ? {
          node,
          width: Number.parseFloat(node.style.width) || node.width,
          height: Number.parseFloat(node.style.height) || node.height,
        }
      : {} as CanvasNode
  }
}

/**
 * 绘制元素旋转
 */
export function rotateCanvas(rotate: number, options: ElementBox & { ctx: CanvasContext }): void {
  if (isNumber(rotate)) {
    const { x, y, width, height, ctx } = options
    const centerX = x + width / 2
    const centerY = y + height / 2
    ctx.translate(centerX, centerY)
    ctx.rotate((rotate * Math.PI) / 180)
    ctx.translate(-centerX, -centerY)
  }
}

interface CanvasRoundRectOptions {
  /** 左上角 x */
  x: number
  /** 左上角 y */
  y: number
  /** 宽度 */
  w: number
  /** 高度 */
  h: number
  /** 圆角半径 */
  r: number
  /** canvas 绘制上下文 */
  ctx: CanvasContext
}

/**
 * canvas 圆角矩形
 */
export function roundRect(options: Omit<CanvasRoundRectOptions, 'ctx'>): Path2D
export function roundRect(options: CanvasRoundRectOptions): void
export function roundRect(options: any): any {
  let { x, y, w, h, r, ctx } = options

  ctx && ctx.beginPath()

  if (!ctx)
    ctx = new Path2D()

  const min_size = Math.min(w, h)
  if (r > min_size / 2)
    r = min_size / 2

  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()

  return ctx
}

/**
 * 加载图片
 */
export const downloadImage = memo((src: string, node: Canvas | WechatMiniprogram.Canvas): Promise<{ image: CanvasImageSource, width: number, height: number }> => {
  return new Promise((resolve, reject) => {
    const image
      = PLATFORM === 'miniprogram'
        ? (node as WechatMiniprogram.Canvas).createImage() as HTMLImageElement
        : new Image()

    image.onload = () => resolve({ image, width: image.width, height: image.height })

    image.onerror = reject

    image.src = src
  })
}, {
  lruMax: 20,
  key(src) {
    return src
  },
})

/**
 * 加载字体
 */
export const loadFont = memo((name: string, src: string) => {
  if (!isString(name) || (!isUrl(src) && !isPath(src))) {
    return Promise.reject(new Error('字体文件链接错误！'))
  }

  if (PLATFORM === 'miniprogram') {
    return new Promise((resolve, reject) => {
      wx.loadFontFace({
        family: name,
        source: `url("${src}")`,
        global: true,
        scopes: ['webview', 'native', 'skyline'],
        success: resolve,
        fail: reject,
      })
    })
  }
  else {
    const font = new FontFace(name, `url("${src}")`)
    document.fonts.add(font)
    return font.load()
  }
})

/**
 * 检查点是否在多边形内部（射线法）
 * @param point - 要检查的点 [x, y]
 * @param polylinePoints - 多边形的顶点 [[x1, y1], [x2, y2], ...]
 * @returns 如果点在多边形内部则返回 true，否则返回 false
 */
export function checkPointInPolyline(point: [number, number], polylinePoints: [number, number][]): boolean {
  const px = point[0]
  const py = point[1]
  let isInside = false
  const n = polylinePoints.length

  // 使用射线法判断点是否在多边形内部
  // 遍历多边形的每一条边 (p1, p2)
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const p1 = polylinePoints[i]
    const p2 = polylinePoints[j]
    const x1 = p1[0]
    const y1 = p1[1]
    const x2 = p2[0]
    const y2 = p2[1]

    // 检查点的 Y 坐标是否在当前边的 Y 坐标范围之间（不包括上边界或下边界，取决于边的方向，以处理顶点和水平边）
    const isYBetween = (y1 <= py && py < y2) || (y2 <= py && py < y1)

    if (isYBetween) {
      // 计算从点 P 发出的水平射线与边 (p1, p2) 所在直线的交点的 X 坐标
      // (py - y1) * (x2 - x1) / (y2 - y1) + x1
      // 避免除以零（水平线段），这种情况已在 isYBetween 中处理
      const xIntersection = x1 + (py - y1) * (x2 - x1) / (y2 - y1)

      // 如果交点的 X 坐标大于点的 X 坐标，说明射线与边相交
      if (px < xIntersection) {
        // 每相交一次，切换点是否在内部的状态
        isInside = !isInside
      }
    }
  }

  return isInside
}

/**
 * 获取矩形以中心旋转后的顶点坐标
 * @param x - 矩形左上角 x 坐标
 * @param y - 矩形左上角 y 坐标
 * @param w - 矩形宽度
 * @param h - 矩形高度
 * @param r - 旋转角度（单位：度）
 * @returns 旋转后的顶点坐标数组 [[x1, y1], [x2, y2], [x3, y3], [x4, y4]]
 */
export function getRotatedRectVertices(x: number, y: number, w: number, h: number, r: number = 0): [number, number][] {
  const centerX = x + w / 2
  const centerY = y + h / 2

  // 将角度转换为弧度
  const angleRad = r * Math.PI / 180
  const cosAngle = Math.cos(angleRad)
  const sinAngle = Math.sin(angleRad)

  // 矩形的四个顶点相对于中心的坐标
  const vertices = [
    [-w / 2, -h / 2], // 左上角
    [w / 2, -h / 2], // 右上角
    [w / 2, h / 2], // 右下角
    [-w / 2, h / 2], // 左下角
  ]

  // 计算旋转后的顶点坐标
  const rotatedVertices = vertices.map(([vx, vy]) => {
    // 应用旋转公式
    const rotatedX = vx * cosAngle - vy * sinAngle
    const rotatedY = vx * sinAngle + vy * cosAngle

    // 将坐标转换回绝对坐标（加上中心点）
    return [centerX + rotatedX, centerY + rotatedY] as [number, number]
  })

  return rotatedVertices
}
