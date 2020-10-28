import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import './App.css'
import routes from './config/routes'
//进行路由配置,让所有路由子组件时Router组件的子组件
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route) => {
            return <Route {...route} key={route.path} />
          })}
        </Switch>
      </Router>
    )
  }
}
