import type { Canvas, ElementBox, PosterElement, PosterInstanceOptions, PosterOptions, PosterRenderFunction, PosterText, PosterTextCommonOptions } from '../types/canvas'
import type { Recordable } from '../types/common'
import { checkPointInPolyline, getCanvas, getDpr, getRotatedRectVertices, rotateCanvas } from '../utils/canvas/common'
import { image } from '../utils/canvas/image'
import { line } from '../utils/canvas/line'
import { rect } from '../utils/canvas/rect'
import { enhancedMeasure, measure, text } from '../utils/canvas/text'
import { isArray, isFunction, isNumber, isObject, isString } from './is'
import { isEqual } from './isEqual'

type PosterElements = (PosterElement | PosterRenderFunction)[]

interface CacheItem {
  /** 原始配置 */
  config?: PosterElement
  /** prepare 后的配置 */
  prepare?: Recordable
  /** calculate 后的配置 */
  calculate?: ElementBox & Recordable
  /** 元素盒模型顶点坐标数组（旋转后的） */
  vertices?: [number, number][]
}

/** 全部绘制项 */
const plugins = {
  line,
  rect,
  image,
  text,
}

export class CanvasPoster {
  /** 初始化 Promise */
  private initial: Promise<void>

  /** 画布配置 */
  private options!: PosterInstanceOptions

  /** 绘制项数组 */
  private configs: PosterElements = []

  /** 绘制项缓存 */
  private cache: CacheItem[] = []

  /**
   * 未传递 width、height 时，会尝试获取 canvas 元素 css 宽高，未获取到则使用 canvas 默认宽高
   * @param options - 画布配置
   * @param componentThis - options.node 为字符串，且在小程序组件中使用时必传，否则无法获取到 canvas 节点
   */
  constructor(options: PosterOptions, componentThis?: any) {
    this.initial = this.init(options, componentThis)
  }

  private async init(options: PosterOptions, componentThis?: any) {
    let { node, width, height, dpr, nodeWidth, nodeHeight, debug = false } = isObject(options) ? options : {}

    width = Number.parseFloat(width as any)
    height = Number.parseFloat(height as any)
    nodeWidth = Number.parseFloat(nodeWidth as any)
    nodeHeight = Number.parseFloat(nodeHeight as any)

    if (isString(node)) {
      const { node: canvas, width: styleWidth, height: styleHeight } = await getCanvas(node, componentThis)

      if (!isFunction(canvas?.getContext)) {
        throw new Error(`未获取到 ${node} 节点`)
      }

      node = canvas

      if (!width || width < 0)
        width = styleWidth

      if (!height || height < 0)
        height = styleHeight

      if (!nodeWidth || nodeWidth < 0)
        nodeWidth = styleWidth
      if (!nodeHeight || nodeHeight < 0)
        nodeHeight = styleHeight
    }

    if (isObject(node)) {
      if (!width || width < 0) {
        if (PLATFORM === 'miniprogram') {
          width = node.width
          if (!nodeWidth || nodeWidth < 0)
            nodeWidth = width
        }
        else {
          const styleWidth = Number.parseFloat(node.style.width)
          width = styleWidth
          if (!nodeWidth || nodeWidth < 0)
            nodeWidth = styleWidth
        }
      }

      if (!height || height < 0) {
        if (PLATFORM === 'miniprogram') {
          height = node.height
          if (!nodeHeight || nodeHeight < 0)
            nodeHeight = height
        }
        else {
          const styleHeight = Number.parseFloat(node.style.height)
          height = styleHeight
          if (!nodeHeight || nodeHeight < 0)
            nodeHeight = styleHeight
        }
      }
    }

    if (!isFunction(node?.getContext) || !width || !height) {
      throw new Error(`CanvasPoster 参数错误，当前为：${options}`)
    }

    const ctx = node.getContext('2d')
    if (!ctx) {
      throw new Error('获取 Canvas 上下文失败')
    }

    dpr = getDpr(dpr)
    node.width = width * dpr
    node.height = height * dpr
    ctx.scale(dpr, dpr)

    this.options = {
      ctx,
      dpr,
      node,
      width,
      height,
      nodeHeight,
      nodeWidth,
      debug,
    }
  }

  /**
   * 绘制方法（异步）
   * @param configs 绘制函数或绘制项对象组成的数组
   */
  async draw(configs: PosterElements) {
    if (!isArray(configs)) {
      console.error(`draw 参数错误，当前为：${configs}`)
      return
    }

    await this.initial
    this.configs = configs
    const { debug, ctx, node } = this.options

    if (PLATFORM === 'web')
      node.removeEventListener('click', this.clickHandler)

    for (let index = 0; index < configs.length; index++) {
      const config = configs[index]

      if (isFunction(config)) {
        ctx.save()
        await config({ ...this.options })
        ctx.restore()
      }
      else if (isObject(config) && config.type in plugins) {
        const plugin = plugins[config.type]
        const elements = await this.travelContainer(index)
        const props = elements.pop()!
        const { x, y } = elements.reduce((p, c) => {
          p.x += c.x
          p.y += c.y
          return p
        }, { x: 0, y: 0 })

        ctx.save()
        ctx.translate(x, y)

        const rotate = Number.parseFloat(props.rotate)
        if (rotate)
          rotateCanvas(rotate, { ...props, ctx })

        this.cache[index].vertices = getRotatedRectVertices(x + props.x, y + props.y, props.width, props.height, rotate || 0)

        const globalAlpha = Number.parseFloat(props.globalAlpha)
        if (isNumber(globalAlpha) && globalAlpha >= 0 && globalAlpha <= 1)
          ctx.globalAlpha = globalAlpha

        plugin.render(props as any, this.options)
        ctx.restore()

        if (debug) {
          ctx.save()
          ctx.translate(x, y)
          const rotate = Number.parseFloat(props.rotate)
          if (rotate)
            rotateCanvas(rotate, { ...props, ctx })
          ctx.strokeStyle = (debug as Recordable)?.lineColor || '#ff0000'
          ctx.lineWidth = (debug as Recordable)?.lineWidth || 2
          ctx.strokeRect(props.x, props.y, props.width, props.height)
          ctx.restore()
        }
      }
    }

    if (PLATFORM === 'web')
      node.addEventListener('click', this.clickHandler)
  }

  /**
   * 点击事件处理方法，小程序中需要手动绑定到 canvas 元素
   */
  clickHandler = function (this: CanvasPoster, event: MouseEvent) {
    let { offsetX, offsetY } = event
    const { nodeHeight, nodeWidth, width, height } = this.options
    offsetX = width / nodeWidth * offsetX
    offsetY = height / nodeHeight * offsetY

    const cache = [...this.cache]

    cache.reverse().some((item) => {
      if (!item)
        return false

      const { config, vertices } = item

      if (isFunction(config?.onClick) && vertices) {
        const res = checkPointInPolyline([offsetX, offsetY], vertices)
        if (res) {
          config.onClick({ event, instanceOptions: this.options, itemConfig: config as any })
          return res
        }
      }

      return false
    })
  }.bind(this)

  /**
   * 文本测量方法
   * @param content 单段 text 配置对象
   * @returns 同 CanvasRenderingContext2D.measureText
   */
  async measure(content: PosterTextCommonOptions) {
    await this.initial
    return measure(content, { ctx: this.options.ctx })
  }

  /**
   * 文本增强测量方法
   * @param content 完整 text 配置对象
   * @param maxWidth 换行宽度
   * @returns height：总高度；width：最大单行宽度；fullWidth：不换行的总宽度
   */
  async enhancedMeasure(content: PosterText, maxWidth?: number) {
    await this.initial
    await text.prepare(content)
    return enhancedMeasure(content, { ctx: this.options.ctx, maxWidth: maxWidth || this.options.width })
  }

  /** 递归绘制项，获取相对定位元素盒模型并调用 normalize */
  private async travelContainer(
    index: number,
    containers: (ElementBox & Recordable)[] = [{
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
  private async normalize(index: number, parents: ElementBox[]) {
    const config = this.configs[index] as PosterElement

    if (!this.cache[index])
      this.cache[index] = { config }

    const cache = this.cache[index]
    const cacheAvaliable = isEqual(cache.config, config)
    const plugin = plugins[config.type]
    const parent = parents[parents.length - 1]
    const maxWidth = this.options.width - parents.reduce((p, c) => p + c.x, 0)

    let preparedProps = cache.prepare
    if (!preparedProps || !cacheAvaliable) {
      preparedProps = await plugin.prepare(config as any, this.options)
      cache.prepare = preparedProps
    }

    let calculatedProps = cache.calculate
    if (!calculatedProps || !cacheAvaliable) {
      calculatedProps = plugin.calculate(preparedProps as any, parent, { ...this.options, maxWidth })
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
        setTimeout(() => {
          URL.revokeObjectURL(url)
        }, 100)
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
