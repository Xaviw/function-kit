declare const wx: Readonly<Recordable>

type Fn = (...args: any[]) => any

type Recordable = Record<string, any>

type MaybePromise<T = any> = Promise<T> | T
