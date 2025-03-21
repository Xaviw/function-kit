import type { CallbackifyParams, CallbackifyResults, Fn } from '../types/common'

/**
 * 将微信小程序的回调式异步 API 转换为 Promise 形式
 * @param method - 要转换的异步方法（如 wx.request、wx.login 等）
 * @param options - 方法的配置参数（不包含 success、fail 回调）
 * @returns 返回 Promise 对象，resolve 时传入 success 回调的参数，reject 时传入 fail 回调的参数
 * @example
 * ```ts
 * // 转换 wx.login 接口
 * const res = await wxPromisify(wx.login, {})
 * console.log(res.code)
 *
 * // 转换 wx.request 接口
 * const res = await wxPromisify(wx.request, {
 *   url: 'https://api.example.com/data',
 *   method: 'GET'
 * })
 * console.log(res.data)
 * ```
 * @miniprogram
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
