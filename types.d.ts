/**
 * 全局注入的当前打包平台
 */
declare const PLATFORM: 'web' | 'miniprogram' | 'node'

type Fn = (...args: any[]) => any

type Recordable = Record<string, any>
