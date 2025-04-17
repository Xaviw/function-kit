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
