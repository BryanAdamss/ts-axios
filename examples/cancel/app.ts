import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios
  .get('/cancel/get', {
    cancelToken: source.token
  })
  .catch(err => {
    if (axios.isCancel(err)) {
      console.log('请求被取消了', err.message)
    }
  })

setTimeout(() => {
  source.cancel('请求被用户取消')

  axios
    .post(
      'cancal/post',
      { data: 1 },
      {
        cancelToken: source.token // 重复使用同一个token，则会导致此请求不被发送
      }
    )
    .catch(e => {
      if (axios.isCancel(e)) {
        console.log('我是错误', e.message)
      }
    })
}, 100)

let cancel: Canceler

axios
  .get('/cancel/get', {
    cancelToken: new CancelToken(c => (cancel = c))
  })
  .catch(err => {
    if (axios.isCancel(err)) {
      console.log('请求被取消了 use new CancelToken', err.message)
    }
  })

setTimeout(() => {
  cancel()
}, 200)
