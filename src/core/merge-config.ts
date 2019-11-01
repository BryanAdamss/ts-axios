import { AxiosRequestConfig } from './../types'
import { isPlainObject, deepMerge } from '../helpers/util'

const strats = Object.create(null)

/**
 * 默认策略
 *
 * @param {*} val1 值1
 * @param {*} val2 值2
 * @returns {*} 策略对应的返回值
 */
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

/**
 * 只取val2
 *
 * @param {*} val1 值1
 * @param {*} val2 值2
 * @returns {*} 策略对应的返回值
 */
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') return val2
}

/**
 * 深度合并策略
 *
 * @param {*} val1 值1
 * @param {*} val2 值2
 * @returns {*} 策略对应的返回值
 */
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'data', 'params'] // 需要使用只取val2值策略的method

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers'] // 需要使用深度合并策略的method

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

/**
 * 合并配置
 *
 * @export
 * @param {AxiosRequestConfig} config1 配置1
 * @param {AxiosRequestConfig} [config2] 配置2
 * @returns {AxiosRequestConfig} 合并后的配置
 */
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) config2 = {}

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) mergeField(key)
  }

  /**
   * 调用对应字段合并策略来合并字段值
   *
   * @param {string} key
   */
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat // 合并策略函数

    config[key] = strat(config1[key], config2![key])
  }

  return config
}
