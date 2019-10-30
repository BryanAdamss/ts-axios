import { isPlainObject } from './util'

/**
 * 转换request
 *
 * @export
 * @param {*} data 数据
 * @returns {*} 转换后的数据
 */
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

/**
 * 转换response
 *
 * @export
 * @param {*} data 数据
 * @returns {*} 转换后的数据
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // do nothing
    }
  }

  return data
}
