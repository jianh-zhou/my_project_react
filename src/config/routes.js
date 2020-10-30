// 引入注册组件中的注册手机号
import Verifyphone from '@pages/regist/verifyphone'
//引入输入验证码的组件
import VerifyCode from '@pages/regist/VerifyCode'
//引入填写密码的组件
import VerifyPassword from '@pages/regist/VerifyPassword'
// 引入城市数据展示组件
import Country from '@comp/Country'
// 引入登录组件
import Login from '@pages/login'
const routes = [
  {
    path: "/regist/verifyphone",
    component: Verifyphone,
    exact: true
  },
  {
    path: '/regist/verifycode',
    component: VerifyCode,
    exact: true
  },
  {
    path: '/regist/verifypassword',
    component: VerifyPassword,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/common/countrypicker',
    component: Country,
    exact: true
  }
]
export default routes