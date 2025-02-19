type Callbackify = (options: {
  success?: Func
  fail?: Func
  complete?: Func
  [key: string]: any
}) => any

type CallbackifyParams<T extends Callbackify> = Omit<Parameters<T>[0], 'success' | 'fail' | 'complete'>

/**
 * 微信小程序异步 API Promise 化
 * @miniprogram
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
