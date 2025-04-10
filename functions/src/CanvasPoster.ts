import type { Canvas, CanvasContext, NormalizedBox, PosterElement, PosterOptions, PosterRenderFunction, PosterText, PosterTextCommonOptions } from '../types/canvas'
import type { Recordable } from '../types/common'
import type { CanvasNode } from '../utils/canvas/common'
import { getCanvas, getDpr, rotateCanvas } from '../utils/canvas/common'
import { image } from '../utils/canvas/image'
import { line } from '../utils/canvas/line'
import { rect } from '../utils/canvas/rect'
import { enhancedMeasure, measure, text } from '../utils/canvas/text'
import { isArray, isFunction, isNumber, isObject, isString } from './is'

type PosterElements = (PosterElement | PosterRenderFunction)[]

export class CanvasPoster {
  /** 初始化 Promise */
  private initial

  /** 画布配置 */
  private options!: CanvasNode

  /** 绘制项数组 */
  private configs: PosterElements = []

  /** 绘制项缓存 */
  private cache: { prepare: Recordable, calculate: NormalizedBox & Recordable }[] = []

  /** 绘制上下文 */
  private ctx: CanvasContext = null!

  private dpr: number = 1

  /** 全部绘制项 */
  private plugins = {
    line,
    rect,
    image,
    text,
  }

  /**
   * **小程序中 node 为字符串时，必须传 width、height，否则为画布默认宽高**
   * @param options - 画布配置
   * @param componentThis - options.node 为字符串，且在小程序组件中使用时必传，否则无法获取到 canvas 节点
   */
  constructor(options: PosterOptions, componentThis?: any) {
    this.initial = this.init(options, componentThis)
  }

  private async init(options: PosterOptions, componentThis?: any) {
    let { node, width, height, dpr } = isObject(options) ? options : {}

    width = Number.parseFloat(width as any)
    height = Number.parseFloat(height as any)

    if (isString(node)) {
      const { canvas, width: styleWidth, height: styleHeight } = await getCanvas(node, componentThis)

      if (!isFunction(canvas?.getContext)) {
        console.error(`未获取到 ${node} 节点`)
        return
      }

      node = canvas

      if (!width || width < 0)
        width = styleWidth

      if (!height || height < 0)
        height = styleHeight
    }

    if (isObject(node)) {
      if (!width || width < 0) {
        if (PLATFORM === 'miniprogram')
          width = node.width
        else
          width = Number.parseFloat(node.style.width)
      }

      if (!height || height < 0) {
        if (PLATFORM === 'miniprogram')
          height = node.height
        else
          height = Number.parseFloat(node.style.height)
      }
    }

    if (!isFunction(node?.getContext) || !width || !height) {
      console.error(`CanvasPoster 参数错误，当前为：${options}`)
      return
    }

    const ctx = node.getContext('2d')
    if (!ctx) {
      console.error('获取 Canvas 上下文失败')
      return
    }

    dpr = getDpr(dpr)
    node.width = width * dpr
    node.height = height * dpr
    ctx.scale(dpr, dpr)

    this.options = { canvas: node, width, height }
    this.ctx = ctx
    this.dpr = dpr
  }

  async draw(configs: PosterElements) {
    if (!isArray(configs)) {
      console.error(`draw 参数错误，当前为：${configs}`)
      return
    }

    await this.initial

    this.configs = configs

    for (let index = 0; index < configs.length; index++) {
      const config = configs[index]
      if (isFunction(config)) {
        const renderOptions = { ctx: this.ctx, canvas: this.options.canvas, dpr: this.dpr }
        await config(renderOptions)
      }
      else if (isObject(config) && config.type in this.plugins) {
        const plugin = this.plugins[config.type]
        const elements = await this.travelContainer(index)
        const props = elements[elements.length - 1]
        const { x, y } = elements.slice(0, -1).reduce((p, c) => {
          p.x += c.x
          p.y += c.y
          return p
        }, { x: 0, y: 0 })

        this.ctx.save()

        this.ctx.translate(x, y)

        const rotate = Number.parseFloat(props.rotate)
        if (rotate)
          rotateCanvas(rotate, { x: props.x, y: props.y, width: props.width, height: props.height, ctx: this.ctx })

        plugin.render(props as any, { ...this.options, ctx: this.ctx })

        this.ctx.restore()
      }
    }
  }

  async measure(content: PosterTextCommonOptions) {
    await this.initial
    return measure(content, { ctx: this.ctx })
  }

  async measureHeight(content: PosterText, maxWidth?: number) {
    await this.initial
    await text.prepare(content)
    return enhancedMeasure(content, { ctx: this.ctx, maxWidth: maxWidth || this.options.width })
  }

  /** 递归绘制项，获取相对定位元素盒模型并调用 normalize */
  private async travelContainer(
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

    const container = await this.normalize(index, containers)
    return [...containers, container]
  }

  /** 标准化参数，扩展盒模型等参数 */
  private async normalize(index: number, parents: NormalizedBox[]) {
    const config = this.configs[index] as PosterElement
    if (!this.cache[index])
      this.cache[index] = {} as any
    const cache = this.cache[index]
    const plugin = this.plugins[config.type]
    const parent = parents[parents.length - 1]
    const maxWidth = this.options.width - parents.reduce((p, c) => p + c.x, 0)

    // TODO
    let preparedProps = cache.prepare
    if (!preparedProps) {
      preparedProps = await plugin.prepare(config as any, { canvas: this.options.canvas })
      cache.prepare = preparedProps
    }

    let calculatedProps = cache.calculate
    if (!calculatedProps) {
      calculatedProps = plugin.calculate(preparedProps as any, parent, { ctx: this.ctx, maxWidth })
      cache.calculate = calculatedProps
    }

    return calculatedProps
  }
}

/**
 * 导出 canvas
 */
export function saveCanvasAsImage(canvas: Canvas, options?: {
  /** mime 值；小程序中仅 image/jpeg 时为 jpg，否则为 png */
  type?: string
  quality?: number
  fileName?: string
}) {
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
