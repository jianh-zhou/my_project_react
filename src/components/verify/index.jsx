import React, { Component } from 'react'
import { reqVerifyCode } from '../../api/common'
import { Button, Toast } from 'antd-mobile'

export default class Verify extends Component {
  // 组件加载完毕的生命周期回调函数
  componentDidMount() {
    window.verifyCallback = async (res) => {
      // console.log(res)
      if (res.ret === 0) {
        try {
          await reqVerifyCode(res.randstr, res.ticket)
          // console.log(1);
          await this.props.next()
        } catch (err) {
          console.log(err)
          Toast.fail(err, 3)
        }
      }
    }
  }
  render() {
    const { disabled } = this.props
    return (
      <div>
        <Button
          style={{ display: disabled ? 'block' : 'none' }}
          type="warning"
          className="warning-btn"
          disabled={disabled}
          // onClick={this.next}
        >
          下一步
        </Button>
        <Button
          type="warning"
          className="warning-btn"
          disabled={disabled}
          // onClick={this.next}
          style={{ display: !disabled ? 'block' : 'none' }}
          id="TencentCaptcha"
          data-appid="2030765311"
          data-cbfn="verifyCallback"
        >
          下一步
        </Button>
      </div>
    )
  }
}
