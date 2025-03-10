export type Fn<Args = any[], Res = any> = (...args: Args) => Res

export type AsyncFn<Args = any[], Res = any> = (...args: Args) => Promise<Res>

export type Recordable<T = any> = Record<string, T>

export type MaybePromise<T = any> = Promise<T> | T

export type CallbackifyParams<T extends Fn> = Parameters<T>[0] extends Recordable ? Omit<Parameters<T>[0], 'success' | 'fail' | 'complete'> : object

export type CallbackifyResults<T extends Fn> = Parameters<T>[0]['success'] extends Fn ? Parameters<Parameters<T>[0]['success']> : never

export interface CancelableFunction<F extends Fn> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): ReturnType<F> | void
  cancel: () => void
}
