import { combineReducers } from "redux";
import TodoReducer from './todo-reducer'

const RootReducer = combineReducers({
    todoReducer: TodoReducer
})
export default RootReducer