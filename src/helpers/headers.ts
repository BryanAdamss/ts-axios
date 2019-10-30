import { isPlainObject } from './util'

/**
 * 规范headername
 *
 * @param {*} headers headers字符串
 * @param {string} normalizedName 规范name
 */
function nomalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return

  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]

      delete headers[name]
    }
  })
}

/**
 * 处理headers
 *
 * @export
 * @param {*} headers headers对象
 * @param {*} data 传送的对象
 * @returns {*} 处理后的headers对象
 */
export function processHeaders(headers: any, data: any): any {
  nomalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

/**
 * 解析headers
 *
 * @export
 * @param {string} headers headers字符串
 * @returns {*} 解析好的headers对象
 */
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)

  if (!headers) return parsed

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')

    key = key.trim().toLowerCase()
    if (!key) return

    if (val) val = val.trim().toLowerCase()

    parsed[key] = val
  })

  return parsed
}
