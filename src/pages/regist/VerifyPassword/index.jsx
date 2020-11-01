import React, { Component } from 'react'
import { InputItem, WingBlank, Icon, NavBar, Toast } from 'antd-mobile'
import './index.css'
import msg from '../../../assets/images/msg.png'
import { createForm } from 'rc-form'
// 引入组件Verify
import Verify from '@comp/verify'
// 引入注册账号的api接口函数
import { reqVerifyUser } from '@api/regist'
import { passwordReg } from '@utils/reg'
class VerifyCode extends Component {
  //设置下一步按钮的禁用或者不禁用的状态数据
  state = {
    isDisabled: true,
    isSelect: false, //切换获取验证码的状态
  }

  // 验证验证码的方法
  validator = (rules, value, callback) => {
    // const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/
    let isDisabled = true
    if (passwordReg.test(value)) {
      isDisabled = false
    }
    this.setState({
      isDisabled,
    })
  }

  // 点击下一步跳转到对应的填写密码页面
  next = async () => {
    const phone = this.props.location.state
    const password = this.props.form.getFieldValue('password')
    console.log(phone, password)
    try {
      await reqVerifyUser(phone, password)
      this.props.history.push('/login', phone)
    } catch (e) {
      Toast.fail(e)
    }
  }

  // 点击切换密码的显示情况
  changePasswordView = () => {
    const { isSelect } = this.state
    // console.log(isSelect)
    this.setState({
      isSelect: !isSelect,
    })
  }
  render() {
    // 定义字体图标的类型
    const iconFontClass =
      'iconfont verify-password-btn ' +
      (!this.state.isSelect ? 'icon-eye1' : 'icon-eye')
    const { isDisabled, isSelect } = this.state
    const { getFieldProps } = this.props.form
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" className="left" />}
          onLeftClick={() => console.log('onLeftClick')}
        >
          硅谷注册
        </NavBar>
        <WingBlank>
          <p className="verify-message-img">
            <img src={msg} alt="msg" />
          </p>
          <p className="verify-password-tips">请设置登录密码</p>
          {/* < className="verify-code-contain"> */}
          <InputItem
            placeholder="请设置8-20位登录密码"
            type={isSelect ? 'type' : 'password'}
            extra={
              <span
                className={iconFontClass}
                onTouchEnd={this.changePasswordView}
              ></span>
            }
            {...getFieldProps('password', {
              rules: [
                {
                  validator: this.validator,
                },
              ],
            })}
          />
          <p className="verify-password-tip">
            密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
          </p>
          <Verify disabled={isDisabled} next={this.next} />
          <p className="verify-code-query">
            遇到问题? 请 <a>联系客服</a>
          </p>
        </WingBlank>
      </div>
    )
  }
}
export default createForm()(VerifyCode)
