export type Fn<Args = any[], Res = any> = (...args: Args) => Res

export type AsyncFn<Args = any[], Res = any> = (...args: Args) => Promise<Res>

export type Key = keyof any

export type Recordable<T = any> = Record<Key, T>

export type MaybePromise<T = any> = Promise<T> | T

export type CallbackifyParams<T extends Fn> = Parameters<T>[0] extends Recordable ? Omit<Parameters<T>[0], 'success' | 'fail' | 'complete'> : object

export type CallbackifyResults<T extends Fn> = Parameters<T>[0]['success'] extends Fn ? Parameters<Parameters<T>[0]['success']> : never

export interface CancelableFunction<F extends Fn> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): ReturnType<F> | void
  cancel: () => void
}

export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
}

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
}

export type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>;
}
