import React, { Component } from 'react'
import {
  InputItem,
  WingBlank,
  Icon,
  NavBar,
  Toast,
  Button,
} from 'antd-mobile'
// 引入发送验证码的api接口函数
import { reqSendCode } from '@api/login'
// 引入验证验证码是否正确的api接口函数
import { reqVerifyMessageCode } from '@api/regist'
import './index.css'
import msg from '../../../assets/images/msg.png'
import { createForm } from 'rc-form'
// 引入组件Verify
import Verify from '@comp/verify'
// 定义总共的时间
const TOTAL_TIME = 6
class VerifyCode extends Component {
  //设置下一步按钮的禁用或者不禁用的状态数据
  state = {
    isDisabled: true,
    time: TOTAL_TIME, //变化的时间
    isShow: true, //切换获取验证码的状态
  }
  // 组件挂载完毕的生命周期回调函数
  componentDidMount() {
    // 调用对应的计时器
    this.setTimer()
  }
  // 组件即将卸载的生命周期回调函数
  componentWillUnmount() {
    clearInterval(this.timeId)
  }
  // 设置倒计时
  setTimer = () => {
    this.timeId = setInterval(() => {
      // console.log('test');
      const time = this.state.time - 1
      // 如果倒计时结束,改变按钮显示状态
      if (time < 1) {
        clearInterval(this.timeId)
        this.setState({
          isShow: false,
          time: TOTAL_TIME,
        })
        return
      }
      this.setState({
        time,
        isShow: true,
      })
    }, 1000)
  }
  // 发送验证码
  sendCode = async () => {
    const { phone } = this.props.location.state
    // console.log(phone);
    this.setTimer()
    await reqSendCode(phone)
  }
  // 验证验证码的方法
  validator = (rules, value, callback) => {
    const reg = /^\d{6}$/
    let isDisabled = true
    if (reg.test(value)) {
      isDisabled = false
    }
    this.setState({
      isDisabled,
    })
    callback()
  }

  // 点击下一步跳转到对应的填写密码页面
  next = async () => {
    // console.log(1)
    const code = this.props.form.getFieldProps('code').value
    const { phone } = this.props.location.state
    // console.log(code)
    try {
      // console.log(reqVerifyMessageCode);
      await reqVerifyMessageCode(phone * 1, code * 1)
      // console.log(phone, code)
      //跳转到对应的输入密码的界面
      this.props.history.push('/regist/verifypassword', phone)
    } catch (e) {
      console.log(1)
      Toast.fail(e, 3)
    }
  }

  render() {
    const { isDisabled, isShow, time } = this.state
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
          <p className="verify-code-tips">
            我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
          </p>
          <div className="verify-code-contain">
            <InputItem
              placeholder="请输入手机验证码"
              {...getFieldProps('code', {
                rules: [
                  {
                    validator: this.validator,
                  },
                ],
              })}
            />
            <Button
              className="verify-code-btn"
              disabled={isShow}
              onClick={this.sendCode}
            >
              {isShow ? `正在发送 ${time}s` : '获取验证码'}
            </Button>
          </div>
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
