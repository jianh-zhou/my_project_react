import React, { Component } from 'react'
import {
  NavBar,
  Icon,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Toast,
} from 'antd-mobile'
import { Link } from 'react-router-dom'
import { createForm } from 'rc-form'
import { phoneReg, codeReg } from '@utils/reg'
import { reqSendCode, reqLoginPhone } from '@api/login'
import { reqRegistPhone, reqVerifyMessageCode } from '@api/regist'
import './index.css'
const TOTAL_TIME = 5
class Login extends Component {
  state = {
    isShowCodeBtn: true, //发送验证码按钮的显示方式
    isDisabledLogin: true, //验证验证码是否正确
    isSendCode: true, //是否可以发送验证码,验证手机号是否输入正确
    timeout: TOTAL_TIME,
  }

  // 验证手机号和验证码的正确性
  validator = (rule, value, callback) => {
    // 获取当前验证的字段,进行对应的操作
    const key = rule.field
    // console.log(rule)
    // 如果字段为手机
    if (key === 'phone') {
      let isSendCode = true
      if (phoneReg.test(value)) {
        isSendCode = false
      }
      this.setState({
        isSendCode,
      })
    } else if (key === 'code') {
      console.log(1)

      //如果字段为验证码
      let isDisabledLogin = true
      if (codeReg.test(value)) {
        isDisabledLogin = false
      }
      this.setState({
        isDisabledLogin, //是否输入过验证码
      })
    }

    callback()
  }

  // 发送验证码
  sendCode = async () => {
    // console.log(1)
    // if()
    // 改变验证码按钮的显示方式
    this.setState({
      isShowCodeBtn: false,
      // isSendCode: true,
    })
    // 获取手机号
    const phone = this.props.form.getFieldValue('phone')
    // 清理定时器
    clearInterval(this.timer)
    // 定义计时器,并且将定时器返回的 句柄绑定在当前组件实例上
    this.timer = setInterval(() => {
      // 获取到要修改的试卷显示值
      const timeout = this.state.timeout - 1
      console.log(timeout)
      // 如果时间小于1
      if (timeout < 1) {
        // 清理定时器
        clearInterval(this.timer)
        // 修改状态数据
        this.setState({
          timeout: TOTAL_TIME, //将时间设置为初始值
          isShowCodeBtn: true, //设置按钮的显示文字为发送验证码
        })
        return
      }
      //更新状态数据
      this.setState({
        timeout, //修改状态数据时间
      })
    }, 1000)
    // 进行异步请求,获取验证码
    await reqSendCode(phone)
  }

  // 组件挂载完毕的生命周期回调函数
  componentWillUnmount() {
    clearInterval(this.timer) //清理定时器
  }

  //点击按钮进行授权
  goGitHub = () => {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=cd62e4ebd9b87ea9ff65'
  }

  // 点击按钮,进行登录
  goLoginOrRigest = async () => {
    //获取手机号,和验证码
    const { phone, code } = this.props.form.getFieldsValue()
    // console.log(phone, code)
    try {
      // 验证手机号是否被注册
      await reqRegistPhone(phone)
      // 没有注册
      // 验证验证码是否正确,如果正确,跳转到对应的设置密码界面,并且将手机号携带
      await reqVerifyMessageCode(phone, code)
        .then(() => {
          this.props.history.push('/regist/verifypassword', phone)
        })
        .catch((e) => {
          //弹出对应的提示
          Toast.fail(e, 3)
        })
      // console.log(1);
    } catch (e) {
      // 如果手机号存在,则进行登录
      // 进行验证,手机号和验证码是否正确
      await reqLoginPhone(phone, code).then(() => {
        // 如果正确,则直接登录,跳转到主页
        this.props.history.push('/')
      })
    }
  }

  render() {
    const { getFieldProps } = this.props.form
    const { isSendCode, timeout, isShowCodeBtn, isDisabledLogin } = this.state
    return (
      <div className="login container">
        {/* 头部导航栏 */}
        <NavBar mode="light" icon={<Icon className="icon-left" type="left" />}>
          硅谷注册登录
        </NavBar>
        <WhiteSpace size="xl" />
        <WingBlank size="lg">
          {/* 手机号码输入框 */}
          <InputItem
            clear
            placeholder="请输入手机号"
            {...getFieldProps('phone', {
              rules: [
                {
                  validator: this.validator,
                },
              ],
            })}
          >
            <div className="phone-prefix">
              <span>+86</span>
              <Icon type="down" />
            </div>
          </InputItem>
          <WhiteSpace size="lg" />
          <div className="login-code">
            {/* 验证码输入框 */}
            <InputItem
              clear
              placeholder="请输入手机验证码"
              {...getFieldProps('code', {
                rules: [
                  {
                    validator: this.validator,
                  },
                ],
              })}
            />

            {/* 发送验证码的按钮 */}
            <Button
              onTouchEnd={this.sendCode}
              // disabled={isSendCode}
              disabled="true"
              className="login-btn-text login-btn"
              style={{
                color: isSendCode ? '#848689' : 'red',
              }}
            >
              {!isShowCodeBtn ? `正在发送:(${timeout}s)` : '发送验证码'}
            </Button>
          </div>
          <WhiteSpace size="lg" />
          <WingBlank size="lg">
            <Button
              type="warning"
              className="warning-btn"
              disabled={isSendCode || isDisabledLogin}
              onClick={this.goLoginOrRigest}
            >
              登录
            </Button>
          </WingBlank>
          <WhiteSpace size="lg" />
          <div className="login-btn-wrap">
            <Link to="/login/pwd" className="login-btn-text">
              账户密码登录
            </Link>
            <Link to="/regist/verifyphone" className="login-btn-text">
              手机快速注册
            </Link>
          </div>
          <div className="login-other-text">其他登录方式</div>
          <div className="login-icons">
            <span
              className="iconfont icon-github"
              onTouchEnd={this.goGitHub}
            ></span>
            <span className="iconfont icon-qq"></span>
            <span className="iconfont icon-wechat"></span>
          </div>
          <span className="login-private-policy">
            未注册的手机号验证后将自动创建硅谷账号, 登录即代表您已同意
            <Link to="/login" className="login-private-policy-btn">
              硅谷隐私政策
            </Link>
          </span>
        </WingBlank>
      </div>
    )
  }
}

export default createForm()(Login)
