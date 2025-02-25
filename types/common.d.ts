export type Fn = (...args: any[]) => any

export type Recordable = Record<string, any>

export type MaybePromise<T = any> = Promise<T> | T

export type Callbackify = (options: {
  success?: Fn
  fail?: Fn
  complete?: Fn
  [key: string]: any
}) => any

export type CallbackifyParams<T extends Callbackify> = Omit<Parameters<T>[0], 'success' | 'fail' | 'complete'>

export interface CancelableFunction<F extends Fn> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): ReturnType<F> | void
  cancel: () => void
}
