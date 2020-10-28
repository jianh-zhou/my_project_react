// 引入axios
import axios from 'axios'
const request = axios.create({
  baseURL: '/',//默认接口路径
  timeout: 1,//超时时间
})
const messages = {
  401: '没有对应权限',
  403: '禁止访问',
  404: '找不到相关资源或者地址错误'
}
// 设置请求拦截
// 请求拦截有两个参数回调函数,一个是成功的的回调函数,一个是失败的(失败是在上一个请求拦截器失败的情况下会进入这个失败的回调函数),请求拦截器可以有多个,是后写的先拦截,因为是在一个数组的前面unshift的
request.interceptors.request.use((config) => {
  // 判断是否有token,然后请求时就会带上token
  // if (token) {
  //   config.headers[auth] = `auth${token}`
  // }
  return config
})
// 设置响应拦截
request.interceptors.response.use((response) => {
  // 功能完成成功,则返回对应需要的数据
  if (response.data.code === 20000) {
    return response.data.data
  } else {
    // 如果功能为完成,则返回一个失败的promise对象,并把详细的错误信息作为参数
    return Promise.reject(response.data.message)
  }
},
  (err) => {
    let message = '未知错误,请联系管理人员解决'
    if (err.response) {
      console.log(err.response);
      // 服务器有返回响应,但是是失败的
      // 401--> 为授权,不能进行访问(没有token等)  403--->禁止访问  404--->地址错误
      if (message[err.response.status]) {
        message = err.response.message
      }
    } else {
      // 服务器没有返回响应,请求超时(timeOut),或者网络错误(network error)
      // console.dir(err);
      if (err.message.indexOf("Network err")) {
        // console.log(err);
        message = "暂无网络,请打开网路试试"
      }
      else if (err.message.indexOf("timeout")) {
        message = "网络延迟,请打开4/5g网络试试"
      }
    }
    return Promise.reject(message)
  })
// 将对应的二次封装的axios暴露出去
export default request

