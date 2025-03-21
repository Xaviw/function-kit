import { isFunction } from './is'

export type Curried<T extends (...args: any[]) => any> =
  <A extends any[]>(...args: A) =>
  Parameters<T> extends [...A, ...infer R]
    ? R extends []
      ? ReturnType<T>
      : Curried<(...args: R) => ReturnType<T>>
    : never

/**
 * 函数柯里化
 * @remarks
 * 柯里化后的函数会在接收足够数量参数后立即执行原函数，参数数量由原函数的.length属性决定
 * @param fn - 需要进行柯里化的原始函数
 * @returns 柯里化后的函数，可以分批次接收参数直到满足原函数参数数量
 * @throws 如果参数不是函数则抛出异常
 * @example
 * const add = curry((a: number, b: number) => a + b);
 * const addFive = add(5);
 * addFive(3); // 返回8
 */
export function curry<T extends (...args: any[]) => any>(
  fn: T,
): Curried<T> {
  if (!isFunction(fn))
    throw new TypeError('参数需要是函数！')

  function curried(this: any, ...args: any[]): any {
    return args.length >= fn.length
      ? fn.apply(this, args) // 参数足够时执行原函数
      : (...newArgs: any[]) => curried.apply(this, [...args, ...newArgs]) // 继续收集参数
  }

  return curried as Curried<T>
}
