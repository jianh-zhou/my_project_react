// 引入redux的一些方法,生成store对象和异步时的一个中间件
import { createStore, applyMiddleware } from 'redux'
// 引入一个异步使用的插件thunk
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// 引入reducers
import reducers from './reducers'
let middleWare = applyMiddleware(thunk)
if (process.env.NODE_ENV === 'development') {
  middleWare = composeWithDevTools(middleWare)
}
export default createStore(reducers, middleWare)