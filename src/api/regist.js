import request from '@utils/request'
// 定义注册所需要的公共路径
const path = '/regist'
// 暴露对应手机号码验证的下一步
export const reqRegistPhone = (phone) => request({
  method: 'POST',
  url: `${path}/verify_phone`,
  data: { phone }
})