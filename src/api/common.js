import request from '@utils/request'
const url = '/common'
export const reqVerifyCode = (randStr, ticket) =>
  request({
    method: 'POST',
    url: `${url}/verifycode`,
    data: {
      randStr, ticket
    }
  })


