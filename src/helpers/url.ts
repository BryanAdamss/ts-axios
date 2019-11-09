import { isDate, isPlainObject } from './util'

/**
 * encode
 *
 * @param {string} val 需要编码的字符串
 * @returns {string} 编码后的字符串
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+') // 空格转换成+
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 构建URL
 *
 * @export
 * @param {string} url URL字符串
 * @param {*} [params] 可选的参数
 * @param {(params: any) => string} [paramsSerializer] paramsSerializer函数
 * @returns {string}
 */
export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) return url

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    // 将parasm处理成`${encode(key)}=${encode(val)}`形式
    Object.keys(params).forEach(key => {
      const val = params[key]

      if (val == null) return

      let values = []

      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }

      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }

        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  if (serializedParams && serializedParams.length) {
    const hashIndex = url.indexOf('#')

    if (hashIndex !== -1) url = url.slice(0, hashIndex) // 去除hash部分

    const hasQuesSign = url.indexOf('?') !== -1
    const firstSign = hasQuesSign ? '&' : '?' // url已经有问号，则追加&否则追加?
    url += firstSign + serializedParams
  }

  return url
}

/**
 * 判断是否同源URL
 *
 * @export
 * @param {string} requestURL 请求URL
 * @returns {boolean} 是否为同源URL
 */
export function isURLSameOrigin(requestURL: string): boolean {
  const { protocol, host } = resolveURL(requestURL)
  const { protocol: curProtocol, host: curHost } = resolveURL(window.location.href)

  return protocol === curProtocol && host === curHost
}

export interface URLOrigin {
  protocol: string
  host: string
}

/**
 * 从URL中解析出protocol、host
 *
 * @export
 * @param {string} url 待解析的URL
 * @returns {URLOrigin} 解析出的protocol、host对象
 */
export function resolveURL(url: string): URLOrigin {
  let urlParsingNode: HTMLAnchorElement | null = document.createElement('a')
  urlParsingNode.setAttribute('href', url)

  const { protocol, host } = urlParsingNode

  urlParsingNode = null

  return { protocol, host }
}

/**
 * 判断是否是URLSearchParams
 *
 * @export
 * @param {*} val 待检测值
 * @returns {val is URLSearchParams} 是否是URLSearchParams
 */
export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

/**
 * 判断是否绝对路径
 *
 * @export
 * @param {string} url 待判断url
 * @returns {boolean} 是否绝对路径
 */
export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d+\-\.]*:)?\/\//i.test(url)
}

/**
 * 拼接URL
 *
 * @export
 * @param {string} baseURL 基础URL
 * @param {string} [relativeURL] 相对URL
 * @returns {string} 完整URL
 */
export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
