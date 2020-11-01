import request from '@utils/request'
// 定义注册所需要的公共路径
const path = '/login'
// 暴露对应手机号码验证的下一步
export const reqSendCode = (phone) => request({
  method: 'POST',
  url: `${path}/digits`,
  data: { phone }
})

// 验证手机号登录的api接口函数
export const reqLoginPhone = (phone, code) => request({
  method: 'POST',
  url: `${path}/phone`,
  data: {
    phone, code
  }
})
