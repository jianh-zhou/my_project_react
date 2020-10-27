import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
let middleWarr=applyMiddleware(thunk)
if (process.env.NODE_ENV === 'development') {
  middleWarr=composeWithDevTools(middleWarr)
}
// export default 