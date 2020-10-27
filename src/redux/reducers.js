import { combineReducers } from 'redux'
function test (preState = 0, action) {
  switch (action.type) {
    default:
      return preState
  }
}
function test1 (preState = 1, action) {
  switch (action.type) {
    default:
      return preState
  }
}
// export default combineReducers({
//   
// })
export default combineReducers({
  test, test1
})