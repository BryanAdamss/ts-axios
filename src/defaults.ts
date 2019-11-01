/**
 * @author GuangHui
 * @description 默认参数
 */

import { AxiosRequestConfig } from './types/index'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0, // 永不超时

  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults