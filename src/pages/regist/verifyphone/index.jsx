import React, { Component } from 'react'
// 引入antd-mobile的一些组件
import { InputItem, WingBlank, Icon, NavBar, Modal, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
// 引入css
import './index.css'
// 引入对应的验证手机号的api接口函数
import { reqRegistPhone } from '@api/regist'
// 引入全局公共组件的验证组件
import Verify from '@comp/verify'
class Verifyphone extends Component {
  // 定义对应的状态数据
  state = {
    isDisabled: true,
  }
  // 组件挂载完毕的生命周期回调函数
  componentDidMount() {
    //   const alert = Modal.alert
    //   alert(
    //     '注册协议及隐私政策',
    //     <span className="protocol">
    //       在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
    //       <strong className="important">
    //         请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）：
    //       </strong>
    //       <span className="tipcs">《硅谷用户注册协议》</span>
    //       <span className="tipcs">《硅谷隐私政策》</span>
    //     </span>,
    //     [
    //       {
    //         text: '不同意',
    //         onPress: () => console.log('cancel'),
    //       },
    //       { text: '同意', style: { backgroundColor: 'red', color: '#fff' } },
    //     ]
    //   )
    // window.verifyCallback = async (res) => {
    //   // console.log(res)
    //   if (res.ret === 0) {
    //     try {
    //       await reqVerifyCode(res.randstr, res.ticket)
    //       // console.log(1);
    //       await this.next()
    //     } catch (err) {}
    //   }
    // }
  }
  // 手机号码验证规则的检验
  validator = (rule, value, callback) => {
    // 设置对应的正则表达式
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    // 获取手机号
    // console.log(rule, value)
    let isDisabled = true
    // 判断手机号符合正则
    if (reg.test(value)) {
      // 让对应的下一步按钮可以点击
      isDisabled = false
    }
    this.setState({
      isDisabled,
    })
    // 不管成功还是失败,都需要调用对应的回调函数
    callback()
  }
  // 点击下一步的回调函数
  next = async () => {
    // console.log(1)
    // 使用try..catch语句进行错误处理
    try {
      // 获取文本框中的手机号码
      const phone = this.props.form.getFieldProps('phone').value
      // console.log(phone, 1)
      // 发送请求
      await reqRegistPhone(phone)
      // console.log(result)
      // Toast.success('', 1)
    } catch (err) {
      // console.log(err)
      Toast.fail(err.message, 1)
    }
  }
  render() {
    // 获取状态数据中的对应事件
    const { isDisabled } = this.state
    const { getFieldProps } = this.props.form
    return (
      <div>
        <WingBlank>
          {/* 头部 */}
          <NavBar
            mode="light"
            icon={<Icon type="left" className="left" />}
            onLeftClick={() => console.log('onLeftClick')}
          >
            硅谷注册
          </NavBar>
          {/* 手机号输入框 */}
          <div className="verify-phone-input">
            <span>+86</span>
            <Icon type="down"></Icon>
            <InputItem
              clear
              placeholder="请输入手机号"
              defaultValue={15330649175}
              {...getFieldProps('phone', {
                rules: [
                  {
                    validator: this.validator,
                  },
                ],
              })}
            ></InputItem>
          </div>
          {/* 按钮 */}
          <Verify disabled={isDisabled} next={this.next} />
          {/* <Button
            style={{ display: isDisabled ? 'block' : 'none' }}
            type="warning"
            className="warning-btn"
            disabled={isDisabled}
            // onClick={this.next}
          >
            下一步
          </Button>
          <Button
            type="warning"
            className="warning-btn"
            disabled={isDisabled}
            // onClick={this.next}
            style={{ display: !isDisabled ? 'block' : 'none' }}
            {...verifyBtnProps}
          >
            下一步
          </Button> */}
        </WingBlank>
      </div>
    )
  }
}

export default createForm()(Verifyphone)
