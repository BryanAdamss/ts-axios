import { AxiosError } from './../../src/helpers/error'
import axios from '../../src/index'

import qs from 'qs'

// withCredentials
// document.cookie = 'a=b'

// axios.get('/more/get').then(res => {
//   console.log(res)
// })

// axios
//   .post(
//     'http://127.0.0.1:8088/more/server2',
//     {},
//     {
//       withCredentials: true
//     }
//   )
//   .then(res => {
//     console.log(res)
//   })

// XSRF
// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

// instance.get('/more/get').then(res => {
//   console.log(res)
// })

// auth
// axios
//   .post(
//     '/more/post',
//     { a: 1 },
//     {
//       auth: {
//         username: 'Cg',
//         password: '123456'
//       }
//     }
//   )
//   .then(res => {
//     console.log(res)
//   })

// 自定义合法状态码范围
// axios
//   .get('/more/304')
//   .then(res => {
//     console.log(res)
//   })
//   .catch((e: AxiosError) => {
//     console.log(e.message)
//   })

// axios
//   .get('/more/304', {
//     validateStatus(status) {
//       return status >= 200 && status < 400
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch((e: AxiosError) => {
//     console.log(e.message)
//   })

// params
// axios
//   .get('/more/get', {
//     params: new URLSearchParams('a=b&c=b')
//   })
//   .then(res => {
//     console.log(res)
//   })

// axios
//   .get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })

// const instance = axios.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, { arrayFormat: 'brackets' })
//   }
// })

// baseURL
// const instance = axios.create({
//   baseURL: 'https://img.mukewang.com/'
// })

// instance.get('5cc01a7b0001a33718720632.jpg')
// instance.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg')

// all、spread、Axios
function getA() {
  return axios.get('/more/A')
}

function getB() {
  return axios.get('/more/B')
}

axios.all([getA(), getB()]).then(
  axios.spread(function(resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
  })
)

axios.all([getA(), getB()]).then(([resA, resB]) => {
  console.log(resA.data)
  console.log(resB.data)
})

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'testString'
  }
}

console.log(axios.getUri(fakeConfig))
