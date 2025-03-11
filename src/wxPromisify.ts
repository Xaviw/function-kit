import type { CallbackifyParams, CallbackifyResults, Fn } from '../types/common'

/**
 * 微信小程序异步 API Promise 化
 * @miniprogram
 * @param method 异步接口
 * @param options 异步接口除回调外的参数
 * @returns Promise，参数分别为 success 和 fail 回调参数
 */
export function wxPromisify<M extends Fn>(method: M, options: CallbackifyParams<M>): Promise<CallbackifyResults<M>> {
  return new Promise((resolve, reject) => {
    method({
      ...options,
      success: resolve,
      fail: reject,
    })
  })
}
