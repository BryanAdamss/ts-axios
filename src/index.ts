import xhr from './xhr'

import { buildURL } from './helpers/url'
import { AxiosRequestConfig } from './types/index'

/**
 * 主入口
 *
 * @param {AxiosRequestConfig} config 配置文件
 */
function axios(config: AxiosRequestConfig): void {
  config = processConfig(config)

  xhr(config)
}

/**
 * 处理config
 *
 * @param {AxiosRequestConfig} config 待处理的config
 * @returns {AxiosRequestConfig} 处理后的config
 */
function processConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  config.url = transformURL(config)
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

export default axios
