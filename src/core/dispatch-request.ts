import xhr from './xhr'

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'

import { buildURL, isAbsoluteURL, combineURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

/**
 * 主入口
 *
 * @param {AxiosRequestConfig} config 配置文件
 */
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)

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
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)

  return config
}

/**
 * 转换URL
 *
 * @param {AxiosRequestConfig} config 配置
 * @returns {string} 转换后的URL
 */
function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config

  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }

  // url! 代表类型断言不为空
  return buildURL(url!, params, paramsSerializer)
}

/**
 * 转换responseData
 *
 * @param {AxiosResponse} res 返回值
 * @returns {AxiosResponse} 转换后的返回值
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) config.cancelToken.throwIfRequested()
}
