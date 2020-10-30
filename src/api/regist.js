import request from '@utils/request'
// 定义注册所需要的公共路径
const path = '/regist'
// 暴露对应手机号码验证的下一步
export const reqRegistPhone = (phone) => request({
  method: 'POST',
  url: `${path}/verify_phone`,
  data: { phone }
})
// 暴露验证码是否正确的api接口函数
export const reqVerifyMessageCode = (phone, code) => request({
  method: 'POST',
  url: `${path}/verify_code`,
  data: { phone, code }
})
// 暴露注册手机号的api的接口函数
export const reqVerifyUser = (phone, password) => request({
  method: 'POST',
  url: `${path}/user`,
  data: { phone, password }

})