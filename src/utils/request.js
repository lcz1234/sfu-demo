import axios from 'axios'

axios.defaults.timeout = 100000

// Add a request interceptor
//  全局请求拦截，发送请求之前执行
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  //config.headers['authorization'] = 'Bearer ' + getToken()
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
//  请求返回之后执行
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})


/**
 * get请求
 * @param {*} url     请求地址
 * @param {*} params  url参数
 */
export function get (url, params) {
  return axios.get(url, {
    params,
  })
}

/**
 * post请求
 * @param {*} url     请求地址
 * @param {*} data    数据
 */
export function post (url, data) {
  return axios.post(url, data)
}