const initialState = {
    todoData:[]
}

const TodoReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'TODO_LIST':
            return {...state, todoData: action.payload}
        case 'ADD_TODO':
            return {...state, todoData: action.payload}
        case 'COMPLETE_TODO':
            return {...state, todoData: action.payload}
        case 'DELETE_TODO':
            return {...state, todoData: action.payload}
        default:
            return state
    }
}
export default TodoReducer