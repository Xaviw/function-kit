/**
 * 全局注入的当前打包平台
 */
declare const PLATFORM: 'web' | 'miniprogram' | 'node'

declare const wx: Readonly<Recordable>

type Fn = (...args: any[]) => any

type Recordable = Record<string, any>

type MaybePromise<T = any> = Promise<T> | T
