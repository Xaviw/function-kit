import type { Callbackify, CallbackifyParams } from '../types/utils'

/**
 * 微信小程序异步 API Promise 化
 * @miniprogram
 * @param method 微信小程序异步 API
 * @param options 微信小程序异步 API 参数
 * @returns Promise 化的 success 回调参数
 */
export function wxPromisify<M extends Callbackify, R = any>(method: M, options: CallbackifyParams<M>): Promise<R> {
  return new Promise((resolve, reject) => {
    method({
      ...options,
      success: resolve,
      fail: reject,
    })
  })
}
