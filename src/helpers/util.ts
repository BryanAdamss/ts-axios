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

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}

/**
 * 深度合并
 *
 * @export
 * @param {...any[]} objs obj数组
 * @returns {*} 返回合并后的对象
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]

        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            // result[key]已经存在，则直接将val值合并到result[key]
            result[key] = deepMerge(result[key], val)
          } else {
            // result[key]不存在，则直接递归val
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
