import React, { Component } from 'react'
// 引入城市数据的api接口函数
import { reqCountryData } from '@api/common'
import { List, NavBar, Icon } from 'antd-mobile'
import './index.css'
const Item = List.Item
export default class Country extends Component {
  // 设置城市数据的状态数据
  state = {
    countryData: {},
  }
  // 组件加载完毕的生命周期回调函数
  async componentDidMount() {
    const result = await reqCountryData()
    this.setState({
      countryData: result,
    })
  }
  // 定义点击对应字母进行跳转的方法
  goContury = (e) => {
    // console.log(e.target)
    const id = e.target.textContent
    console.log(id)
    console.log(document.getElementById(id).offsetTop)
    window.scrollTo(0, document.getElementById(id).offsetTop - 45)
  }
  // 点击对应地区回到对应页面
  goBack = (value) => {
    return () => {
      const url = this.props.location.state
      this.props.history.push(url, value)
    }
  }
  render() {
    const { countryData } = this.state
    const countryKeys = Object.keys(countryData)
    return (
      <div>
        <ul className="country-nav" onTouchEnd={this.goContury}>
          {countryKeys.map((key) => {
            return (
              <li key={key}>
                <a>{key}</a>
              </li>
            )
          })}
        </ul>
        <NavBar
          mode="light"
          icon={<Icon type="left" className="left" />}
          onLeftClick={this.goBack()}
          className="country-nav"
        >
          选择国家与地区
        </NavBar>
        <div className="country-content">
          {countryKeys.map((list) => {
            return (
              <List
                renderHeader={() => list}
                className="my-list"
                key={list}
                id={list}
              >
                {countryData[list].map((item, index) => {
                  const key = Object.keys(item)[0]
                  const value = item[key]
                  return (
                    <Item
                      extra={<span style={{ paddingRight: 20 }}>{value}</span>}
                      key={index}
                      onClick={this.goBack(value)}
                    >
                      {key}
                    </Item>
                  )
                })}
              </List>
            )
          })}
        </div>
      </div>
    )
  }
}
