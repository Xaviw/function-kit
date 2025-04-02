import type { CanvasContext } from '../../types/canvas'
import { roundRect } from '../../src/canvas/rect'
import { isNumber, isString } from '../../src/is'

export function radiusPath(options: { x: number, y: number, width: number, height: number, borderRadius?: string | number, borderSize: number, ctx: CanvasContext }) {
  const { x, y, width, height, borderRadius, borderSize, ctx } = options

  // 圆角半径标准化
  let r = Number.parseFloat(borderRadius as any) || 0
  if (isString(borderRadius) && borderRadius.endsWith('%'))
    r = r * width / 100

  // 圆角裁剪路径
  roundRect({
    x: x - borderSize,
    y: y - borderSize,
    w: width + 2 * borderSize,
    h: height + 2 * borderSize,
    r,
    ctx,
  })
  // ctx.clip()

  return r
}

export function renderBorder(options: { x: number, y: number, width: number, height: number, r: number, borderSize: number, ctx: CanvasContext }) {
  const { x, y, width, height, r, borderSize, ctx } = options

  if (borderSize) {
    ctx.lineWidth = borderSize * 2
    roundRect({
      x: x - borderSize,
      y: y - borderSize,
      w: width + 2 * borderSize,
      h: height + 2 * borderSize,
      r,
      ctx,
    })
    ctx.stroke()
  }
}

/**
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
