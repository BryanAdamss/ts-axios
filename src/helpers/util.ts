const toString = Object.prototype.toString

/**
 * 是否是日期
 *
 * @export
 * @param {*} val 待判断的值
 * @returns {val is Date} 是否是Date
 */
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

/**
 * 是否object
 *
 * @export
 * @param {*} val 待判断的值
 * @returns {val is Object}是否是Object
 */
export function isObject(val: any): val is Object {
  return val != null && typeof val === 'object'
}

/**
 * 判断是否普通对象
 *
 * @export
 * @param {*} val 待判断对象
 * @returns {val is Object} val是否是普通对象
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
