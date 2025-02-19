/**
 * 全局注入的当前打包平台
 */
declare const PLATFORM: 'web' | 'miniprogram' | 'node'

declare const wx: Record<string, any>

type Func = (...args: any[]) => any

type Recordable = Record<string, any>
