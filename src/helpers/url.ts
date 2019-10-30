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
    .replace(/%24/g, '%')
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
 * @returns {string} 拼接后的url
 */
export function buildURL(url: string, params?: any): string {
  if (!params) return url

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

  let serializedParams = parts.join('&')

  if (serializedParams && serializedParams.length) {
    const hashIndex = url.indexOf('#')

    if (hashIndex !== -1) url = url.slice(0, hashIndex) // 去除hash部分

    const hasQuesSign = url.indexOf('?') !== -1
    const firstSign = hasQuesSign ? '&' : '?' // url已经有问号，则追加&否则追加?
    url += firstSign + serializedParams
  }

  return url
}
