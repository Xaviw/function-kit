import type { Canvas, CanvasContext } from '../../types/_canvas'
import type { NormalizedBox } from '../../utils/_canvas/normalize'
import { isNumber, isObject, isString } from '../is'

/**
 * 绘制元素旋转
 * @param rotate - 旋转角度
 * @param options
 * @param options.x - 旋转容器左上角 x
 * @param options.y - 旋转容器左上角 y
 * @param options.width - 旋转容器宽度
 * @param options.height - 旋转容器高度
 * @web
 * @miniprogram
 */
export function rotateCanvasElement(rotate: number, options: NormalizedBox & { ctx: CanvasContext }): void {
  if (isNumber(rotate)) {
    const { x, y, width, height, ctx } = options
    const centerX = x + width / 2
    const centerY = y + height / 2
    ctx.translate(centerX, centerY)
    ctx.rotate((rotate * Math.PI) / 180)
    ctx.translate(-centerX, -centerY)
  }
}

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
