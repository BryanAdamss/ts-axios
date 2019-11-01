import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/wrongPath'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log('wrongPath', e)
  })

axios({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log('随机', res)
  })
  .catch(e => {
    console.log('随机', e)
  })

// 模拟网络错误
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log('模拟网络错误', res)
    })
    .catch(e => {
      console.log('模拟网络错误', e)
    })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log('timeout', res)
  })
  .catch((e: AxiosError) => {
    console.log('timeout', e.message)
    console.log('timeout', e.config)
    console.log('timeout', e.code)
    console.log('timeout', e.request)
    console.log('timeout', e.isAxiosError)
  })
