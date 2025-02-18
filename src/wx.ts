/**
 * 微信小程序异步 API Promise 化
 * @miniprogram
 */
export function wxPromisify<T extends (...args: any) => any>(method: T, options: Parameters<T>[0]): Promise<any> {
  return new Promise((resolve, reject) => {
    method({
      ...options,
      success: resolve,
      fail: reject,
    })
  })
}
