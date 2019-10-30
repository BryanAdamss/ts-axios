import xhr from './xhr'

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'

import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

/**
 * 主入口
 *
 * @param {AxiosRequestConfig} config 配置文件
 */
function axios(config: AxiosRequestConfig): AxiosPromise {
  config = processConfig(config)

  return xhr(config).then(res => transformResponseData(res))
}

/**
 * 处理config
 *
 * @param {AxiosRequestConfig} config 待处理的config
 * @returns {AxiosRequestConfig} 处理后的config
 */
function processConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  return config
}

/**
 * 转换URL
 *
 * @param {AxiosRequestConfig} config 配置
 * @returns {string} 转换后的URL
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config

  return buildURL(url, params)
}

/**
 * 转换请求的data
 *
 * @param {AxiosRequestConfig} config 配置文件
 * @returns {*} 转换后的data
 */
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

/**
 * 转换请求的header
 *
 * @param {AxiosRequestConfig} config 配置文件
 * @returns {*} 转换后的headers
 */
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config

  return processHeaders(headers, data)
}

/**
 * 转换responseData
 *
 * @param {AxiosResponse} res 返回值
 * @returns {AxiosResponse} 转换后的返回值
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios
