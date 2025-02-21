/* eslint-disable unused-imports/no-unused-vars */
import type { CanvasElementRenderFnOptions, CanvasPosterElements, CanvasPosterOptions, CanvasTextElement } from '../types/canvas'

/**
 * 配置式生成 Canvas 海报
 * @web
 * @miniprogram
 */
export async function canvasPoster(elements: CanvasPosterElements, options: CanvasPosterOptions): Promise<void> {
  const { node: canvas, width, height, init } = options
  if (
    !Array.isArray(elements)
    || typeof canvas?.getContext !== 'function'
    || typeof width !== 'number'
    || typeof height !== 'number'
  ) {
    console.error(`请传入正确的参数，当前 elements：${elements}、options：${options}`)
    return
  }

  /** 设备像素比（1px 等于多少物理像素） */
  let dpr: number
  /** rpx 像素比（1px 等于多少 rpx） */
  let rpr: number
  if (PLATFORM === 'miniprogram') {
    const { screenWidth, pixelRatio } = wx.getWindowInfo()
    rpr = screenWidth / 750
    dpr = pixelRatio
  }
  else {
    rpr = window.innerWidth / 750
    dpr = window.devicePixelRatio
  }

  const ctx = canvas.getContext('2d')
  if (!ctx)
    return

  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.scale(dpr, dpr)
  if (typeof init === 'function') {
    await init(ctx, canvas)
  }
  ctx.save()

  for (let i = 0, l = elements.length; i < l; i++) {
    // 校验配置
    const element = elements[i]
    if (typeof element !== 'object' && typeof element !== 'function') {
      console.warn(`第${i}项配置错误，请检查配置：${element}`)
      continue
    }

    ctx.restore()

    // 优先使用自定义渲染函数
    if (typeof element === 'function') {
      await element(ctx, canvas)
      continue
    }

    if (
      !['text', 'image', 'rect', 'line'].includes(element.type)
    ) {
      console.warn(`第${i}项配置错误，请检查配置：${element}`)
      continue
    }

    const contextOptions = { ctx, canvas, rpr }
    switch (element.type) {
      case 'text':
        renderText(element, contextOptions)
        break
    }
  }
}

/**
 * 绘制 Canvas 文本
 * @web
 * @miniprogram
 */
export function renderText(renderOptions: CanvasTextElement, contextOptions: CanvasElementRenderFnOptions): void {
}

function normalizeTextOptions(options: CanvasTextElement): CanvasTextElement {
  const result = {
    ...options,
    textAlign: options.textAlign || 'left',
    lineHeight: options.lineHeight || 1.2,
    fontSize: options.fontSize || '16px',
    fontFamily: options.fontFamily || 'sans-serif',
    fontWeight: options.fontWeight || 'normal',
    color: options.color || '#000000',
    fontStyle: options.fontStyle || 'normal',
    textStyle: options.textStyle || 'fill',
  }
  if (!options.left && !options.right) {
    result.left = '0px'
  }
  if (!options.top && !options.bottom) {
    result.top = '0px'
  }
  return result
}
