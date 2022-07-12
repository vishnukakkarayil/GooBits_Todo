import { applyMiddleware, createStore } from 'redux'
// import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import RootReducer from './reducer'

// const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

const store = createStoreWithMiddleware(RootReducer)

export default store