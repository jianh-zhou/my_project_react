import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './redux/store'
// 引入antd的样式
import 'antd-mobile/dist/antd-mobile.css'
// 引入iconfont的样式
import "./assets/css/iconfont.css";
// 引入页面的样式
import './assets/css/common.css'
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))