import type { PosterElements, PosterOptions } from '../../types/canvas'
import { downloadImage } from '../../utils/canvas/downloadImage'
import { getDpr } from '../../utils/canvas/help'
import { normalizeElement } from '../../utils/canvas/normalize'
import { isArray, isFunction, isObject } from '../is'
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
  dpr = getDpr(dpr)

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

  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.scale(dpr, dpr)

  const contextOptions = { ctx, canvas, width, height }

  // 图片预加载
  elements.forEach((element) => {
    if (!isFunction(element) && element.type === 'image' && element.src) {
      downloadImage(element.src, canvas)
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
      await element({ ctx: ctx as any, canvas: canvas as any, dpr })
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
