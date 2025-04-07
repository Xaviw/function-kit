import type { Canvas, CanvasContext, NormalizedBox, PosterElement, PosterOptions, PosterRenderFunction } from '../types/canvas'
import type { Recordable } from '../types/common'
import { getDpr, rotateCanvas } from '../utils/canvas/common'
import { image } from '../utils/canvas/image'
import { line } from '../utils/canvas/line'
import { rect } from '../utils/canvas/rect'
import { text } from '../utils/canvas/text'
import { isArray, isFunction, isNumber, isObject, isString } from './is'

type PosterElements = (PosterElement | PosterRenderFunction)[]

export class CanvasPoster {
  /** 画布配置 */
  options: PosterOptions

  /** 绘制项数组 */
  configs: PosterElements = []

  /** 绘制项缓存 */
  cache: { prepare: Recordable, calculate: NormalizedBox & Recordable }[] = []

  /** 绘制上下文 */
  ctx: CanvasContext = null!

  /** 画布使用的像素比 */
  dpr: number = 1

  /** 全部绘制项 */
  plugins = {
    line,
    rect,
    image,
    text,
  }

  /**
   * @param options - 画布配置
   */
  constructor(options: PosterOptions) {
    this.options = options
    let { node: canvas, width, height, dpr } = options

    width = Number.parseFloat(width as any)
    height = Number.parseFloat(height as any)

    if (!isFunction(canvas?.getContext) || !width || !height) {
      console.error(`canvasPoster 参数错误，当前为：${options}`)
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.error('获取 Canvas 上下文失败')
      return
    }

    dpr = getDpr(dpr)
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    this.dpr = dpr
    this.ctx = ctx
  }

  async draw(configs: PosterElements) {
    if (!isArray(configs)) {
      console.error(`draw 参数错误，当前为：${configs}`)
      return
    }

    this.configs = configs

    for (let index = 0; index < configs.length; index++) {
      const config = configs[index]
      if (isFunction(config)) {
        const renderOptions = { ctx: this.ctx, canvas: this.options.node, dpr: this.dpr }
        await (config as PosterRenderFunction)(renderOptions)
      }
      else if (config.type in this.plugins) {
        const plugin = this.plugins[config.type]
        const elements = await this.travelContainer(index)
        const props = elements[elements.length - 1]
        const container = elements.reduce((p, c) => {
          p.x += c.x
          p.y += c.y
          return p
        }, { x: 0, y: 0, width: props.width, height: props.height })

        this.ctx.save()

        const rotate = Number.parseFloat(props.rotate)
        if (rotate)
          rotateCanvas(rotate, { ...container, ctx: this.ctx })

        this.ctx.translate(container.x, container.y)

        plugin.render(props as any, { ...this.options, ctx: this.ctx })

        this.ctx.restore()
      }
    }
  }

  /** 递归绘制项，获取相对定位元素盒模型并调用 normalize */
  async travelContainer(
    index: number,
    containers: (NormalizedBox & Recordable)[] = [{
      x: 0,
      y: 0,
      width: this.options.width,
      height: this.options.height,
    }],
  ) {
    const config = this.configs[index] as PosterElement
    const parentIndex = config.relativeTo && this.configs.findIndex(item => !isFunction(item) && item.id === config.relativeTo)

    if (isNumber(parentIndex) && parentIndex > -1)
      containers = await this.travelContainer(parentIndex, containers)

    const container = await this.normalize(index, containers[containers.length - 1])
    return [...containers, container]
  }

  /** 标准化参数，扩展盒模型等参数 */
  async normalize(index: number, parent: NormalizedBox) {
    const config = this.configs[index] as PosterElement
    const cache = this.cache[index] || {}
    const plugin = this.plugins[config.type]

    // TODO
    let preparedProps = cache.prepare
    if (!preparedProps)
      preparedProps = await plugin.prepare(config as any, { canvas: this.options.node })

    let calculatedProps = cache.calculate
    if (!calculatedProps)
      calculatedProps = plugin.calculate(preparedProps as any, parent, { ctx: this.ctx })

    return calculatedProps
  }
}

/**
 * 导出 canvas
 */
export function saveCanvasAsImage(canvas: Canvas, options?: { type?: string, quality?: number, fileName?: string }) {
  let { type, quality, fileName } = isObject(options) ? options : {}
  type = isString(type) && type.startsWith('image/') ? type : undefined
  quality = isNumber(quality) && quality > 0 && quality <= 1 ? quality : 1

  return new Promise((resolve, reject) => {
    if (PLATFORM === 'web') {
      canvas.toBlob((blob) => {
        if (!blob)
          return reject(new Error('canvas 导出失败！'))

        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.download = isString(fileName) ? fileName : `${Date.now()}`
        a.href = url
        a.click()
        resolve(url)
      }, type, quality)
    }
    else {
      wx.canvasToTempFilePath({
        canvas,
        fileType: type === 'image/jpeg' ? 'jpg' : 'png',
        quality,
        success({ tempFilePath }) {
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success() {
              resolve(tempFilePath)
            },
            fail(err) {
              reject(err)
            },
          })
        },
        fail(err) {
          reject(err)
        },
      })
    }
  })
}
