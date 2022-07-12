import axios from "axios";
import { v4 as uuid } from 'uuid'

export const TodoData = () =>
    (dispatch, getState) => {
        axios.get('https://jsonplaceholder.typicode.com/todos/?_limit=50')
        .then(res => dispatch({ type: 'TODO_LIST', payload: res.data }))
        .catch(err => {
            console.log({ err })
        })
}

export const addItemToTodo = (item) =>
(dispatch, getState) => {
    let todo = {
        completed: false,
        id: uuid(),
        title: item,
        userId: 1
    }
    let allTodoItems = getState().todoReducer.todoData
    allTodoItems.splice(0,0,todo)
    const updatedData = [...allTodoItems]
    dispatch({ type: 'ADD_TODO', payload: updatedData })
}

export const TodoComplete = id =>
(dispatch, getState) => {
    let allTodoItems = getState().todoReducer.todoData
    allTodoItems = allTodoItems.map(item => {
        return item.id === id ? { ...item, completed: !item.completed} : item
    })
    dispatch({ type: 'COMPLETE_TODO', payload: allTodoItems })
}
export const deleteTodo = id =>
(dispatch, getState) => {
    let allTodoItems = getState().todoReducer.todoData
    allTodoItems = allTodoItems.filter(item => item.id !== id )
    dispatch({ type: 'DELETE_TODO', payload: allTodoItems })
}

export const updateSingleTodo = (data, id) =>
(dispatch, getState) => {
    const allTodoItems = getState().todoReducer.todoData
    const updateData = allTodoItems.find(allTodoItem => allTodoItem.id === id)
    if (updateData) {
        updateData['title'] = data
        const currentIndex = allTodoItems.findIndex(allTodoItem => allTodoItem.id === id)
        allTodoItems.splice(currentIndex, 1, updateData)
        const updatedItems = [...allTodoItems]
        dispatch({ type: 'ADD_TODO', payload: updatedItems })
    }

}