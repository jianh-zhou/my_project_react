import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
//进行路由配置,让所有路由子组件时Router组件的子组件
export default class App extends Component {
  render() {
    return (
      <Router>
        ..APP
        <div className="box"></div>
      </Router>
    )
  }
}
