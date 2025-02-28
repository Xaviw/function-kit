import type { CanvasElement, CanvasImageElement, CanvasLineElement, CanvasRectElement, CanvasRenderFn, CanvasTextElement } from '../types/canvas'
import { isDataUrl, isOnlineUrl } from './common'

/**
 * 绘制 Canvas 文本
 * @web
 * @miniprogram
 */
// export function renderText(renderOptions: CanvasTextElement, contextOptions: CanvasElementRenderFnOptions): void {
// }

// function normalizeTextOptions(options: CanvasTextElement): CanvasTextElement {
//   const result = {
//     ...options,
//     textAlign: options.textAlign || 'left',
//     lineHeight: options.lineHeight || 1.2,
//     fontSize: options.fontSize || '16px',
//     fontFamily: options.fontFamily || 'sans-serif',
//     fontWeight: options.fontWeight || 'normal',
//     color: options.color || '#000000',
//     fontStyle: options.fontStyle || 'normal',
//     textStyle: options.textStyle || 'fill',
//   }
//   if (!options.left && !options.right) {
//     result.left = '0px'
//   }
//   if (!options.top && !options.bottom) {
//     result.top = '0px'
//   }
//   return result
// }

export function downloadImage(src: string): Promise<{ src: string, width: number, height: number }> {
  return new Promise((resolve, reject) => {
    if (PLATFORM === 'web') {
      const image = new Image()
      image.onload = () => resolve({ src: image.src, width: image.width, height: image.height })
      image.onerror = reject
      image.src = src
    }
    else if (PLATFORM === 'miniprogram') {
      if (isOnlineUrl(src)) {
        const downloader = src.startsWith('cloud://') ? wx.cloud.downloadFile : wx.downloadFile
        downloader({
          url: src,
          fileID: src,
          success: (file: ICloud.DownloadFileResult) => {
            if (file.statusCode !== 200) {
              reject(file)
              return
            }
            wx.getImageInfo({
              src: file.tempFilePath,
              success: res => resolve({ src: res.path, width: res.width, height: res.height }),
              fail: reject,
            })
          },
          fail: reject,
        })
      }
      else if (isDataUrl(src)) {
        const [, format, body] = /data:image\/(\w+);base64,(.*)/.exec(src) || []
        const filePath = `${wx.env.USER_DATA_PATH}/${Date.now()}.${format}`
        const buffer = wx.base64ToArrayBuffer(body.replace(/[\r\n]/g, ''))
        wx.getFileSystemManager().writeFile({
          filePath,
          data: buffer,
          encoding: 'binary',
          success: () => {
            wx.getImageInfo({
              src: filePath,
              success: res => resolve({ src: res.path, width: res.width, height: res.height }),
              fail: reject,
            })
          },
          fail: reject,
        })
      }
      else {
        reject(src)
      }
    }
  })
}

export function isTextElement(element: CanvasElement | CanvasRenderFn): element is CanvasTextElement {
  return typeof element === 'object' && element.type === 'text'
}

export function isImageElement(element: CanvasElement | CanvasRenderFn): element is CanvasImageElement {
  return typeof element === 'object' && element.type === 'image'
}

export function isRectElement(element: CanvasElement | CanvasRenderFn): element is CanvasRectElement {
  return typeof element === 'object' && element.type === 'rect'
}

export function isLineElement(element: CanvasElement | CanvasRenderFn): element is CanvasLineElement {
  return typeof element === 'object' && element.type === 'line'
}
