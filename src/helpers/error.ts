import { AxiosRequestConfig, AxiosResponse } from './../types/index'

/**
 * AxiosError类
 *
 * @export
 * @class AxiosError
 * @extends {Error}
 */
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // 解决typescript继承原生类的坑
    // https://github.com/microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

/**
 * AxiosError工厂函数
 *
 * @export
 * @param {string} message
 * @param {AxiosRequestConfig} config
 * @param {(string | null)} [code]
 * @param {*} [request]
 * @param {AxiosResponse} [response]
 * @returns
 */
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  return new AxiosError(message, config, code, request, response)
}
