import type { PosterElements, PosterOptions } from '../../types/canvas'
import { getDpr } from '../../utils/canvas/commonProperty'
import { downloadImage } from '../../utils/canvas/downloadImage'
import { normalizeElement } from '../../utils/canvas/normalize'
import { isArray, isFunction, isNumber, isObject } from '../is'
import { renderImage } from './image'
import { renderLine } from './line'
import { renderRect } from './rect'
import { renderText } from './text'

/**
 * 配置式生成 Canvas 海报
 * @web
 * @miniprogram
 */
export async function canvasPoster(elements: PosterElements, options: PosterOptions): Promise<void> {
  let { node: canvas, width, height, dpr } = options
  width = Number.parseFloat(width as any)
  height = Number.parseFloat(height as any)
  if (
    !isArray(elements) || !isFunction(canvas?.getContext) || !width || !height
  ) {
    console.error(`请传入正确的参数，当前 elements：${elements}、options：${options}`)
    return
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    console.error('获取 Canvas 上下文失败')
    return
  }

  /** 设备像素比（1px 等于多少物理像素） */
  if (!isNumber(dpr) || dpr < 0) {
    dpr = getDpr()
  }
  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.scale(dpr, dpr)

  const contextOptions = { ctx, canvas, width, height }

  // 图片预加载
  elements.forEach((element) => {
    if (!isFunction(element) && element.type === 'image' && element.src) {
      downloadImage(element.src)
    }
  })

  // 绘制元素
  for (let i = 0, l = elements.length; i < l; i++) {
    // 校验配置
    const element = elements[i]
    if (!isObject(element) || (!isFunction(element) && !['text', 'image', 'rect', 'line'].includes(element.type))) {
      console.warn(`请检查配置：${element}`)
      continue
    }

    // 优先使用自定义渲染函数
    if (isFunction(element)) {
      ctx.save()
      await element(ctx, canvas)
      ctx.restore()
      continue
    }

    const normalized = normalizeElement(element, elements, contextOptions)

    switch (element.type) {
      case 'line':
        renderLine({ ...element, ...normalized }, contextOptions)
        break
      case 'rect':
        renderRect({ ...element, ...normalized }, contextOptions)
        break
      case 'image':
        await renderImage({ ...element, ...normalized }, contextOptions)
        break
      case 'text':
        renderText({ ...element, ...normalized }, contextOptions)
        break
    }
  }
}
