import { ResolvedFn, RejectedFn } from './../types/index'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceprots: Array<Interceptor<T> | null>

  constructor() {
    this.interceprots = []
  }

  /**
   * 添加拦截器
   *
   * @param {ResolvedFn<T>} resolved 解析函数
   * @param {RejectedFn} [rejected] 拦截函数
   * @returns {number}  拦截器id
   * @memberof InterceptorManager
   */
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceprots.push({
      resolved,
      rejected
    })

    return this.interceprots.length - 1
  }

  /**
   * 删除拦截器
   *
   * @param {number} id 拦截器id
   * @memberof InterceptorManager
   */
  eject(id: number): void {
    if (this.interceprots[id]) this.interceprots[id] = null // 假删除，保证id不会因删除而混乱
  }

  /**
   * 遍历拦截器
   *
   * @param {(interceptor: Interceptor<T>) => void} fn 回调函数
   * @memberof InterceptorManager
   */
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceprots.forEach(interceptor => {
      if (interceptor !== null) fn(interceptor)
    })
  }
}
