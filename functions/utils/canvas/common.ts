import type { CanvasContext, NormalizedBox } from '../../types/canvas'
import { isNumber, isString } from '../../src/is'
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

/**
 * 绘制元素旋转
 */
export function rotateCanvas(rotate: number, options: NormalizedBox & { ctx: CanvasContext }): void {
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
export function roundRect(options: CanvasRoundRectOptions) {
  let { x, y, w, h, r, ctx } = options

  const min_size = Math.min(w, h)
  if (r > min_size / 2)
    r = min_size / 2

  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/**
 * 加载字体
 */
export function loadFont(name: string, src: string) {
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
        success() {
          resolve(true)
        },
        fail(err) {
          reject(err)
        },
      })
    })
  }
  else {
    const font = new FontFace(name, `url("${src}")`)
    document.fonts.add(font)
    return font.load()
  }
}
