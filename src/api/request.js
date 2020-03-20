import axios from 'axios'

const TIMEOUT = 5000

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    timeout: TIMEOUT
  })
  // 3.请求拦截
  instance.interceptors.request.use(
    config => {
      return config
    },
    err => {
      console.log(err)
    }
  )
  // 4.响应拦截
  instance.interceptors.response.use(
    res => {
      return res.data
    },
    err => {
      console.log(err)
    }
  )
  // 2.发送真正的网络请求
  return instance(config)
}
