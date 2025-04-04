import type { Canvas } from '../../types/canvas'
import { memo } from '../../src/memo'
import { isDataUrl, isPath, isUrl } from '../../src/reg'

export const downloadImage = memo((src: string, canvas: Canvas | WechatMiniprogram.Canvas): Promise<{ image: CanvasImageSource, width: number, height: number }> => {
  return new Promise((resolve, reject) => {
    if (PLATFORM === 'web') {
      const image = new Image()
      image.onload = () => resolve({ image, width: image.width, height: image.height })
      image.onerror = reject
      image.src = src
    }
    else if (PLATFORM === 'miniprogram') {
      if (isPath(src)) {
        const image = (canvas as WechatMiniprogram.Canvas).createImage() as HTMLImageElement
        image.onload = () => {
          resolve({ image, width: image.width, height: image.height })
        }
        image.onerror = reject
        image.src = src
      }
      else if (isUrl(src)) {
        const downloader = src.startsWith('cloud://') ? wx.cloud.downloadFile : wx.downloadFile
        downloader({
          url: src,
          fileID: src,
          success: (file: ICloud.DownloadFileResult) => {
            if (file.statusCode !== 200) {
              reject(file)
              return
            }
            const image = (canvas as WechatMiniprogram.Canvas).createImage() as HTMLImageElement
            image.onload = () => {
              resolve({ image, width: image.width, height: image.height })
            }
            image.onerror = reject
            image.src = file.tempFilePath
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
            const image = (canvas as WechatMiniprogram.Canvas).createImage() as HTMLImageElement
            image.onload = () => {
              resolve({ image, width: image.width, height: image.height })
            }
            image.onerror = reject
            image.src = filePath
          },
          fail: reject,
        })
      }
      else {
        reject(src)
      }
    }
  })
}, {
  lruMax: 20,
  key(src) {
    return src
  },
})
