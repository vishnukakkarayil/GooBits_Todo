import React, {useState} from 'react';
import AddTodo from './add-todo'
import TodoList from './todo-list'
import './todo-style.css'
const Todo = () => {
    const [todoData, setTodoData] = useState('')
    const [update, setUpdate] = useState(false)
    const [editId, setEditId] = useState(false)
    const addTodoItem = (data) => { 
        let regExp = /^[A-Za-z0-9\s]*$/;       
        var matchedAuthors = regExp.test(data);
        if(matchedAuthors) setTodoData(data)
    }

    const editTodo = (title, id) => {
        setTodoData(title)
        setUpdate(true)
        setEditId(id)
    }
    const clearData = () => {
        setTodoData('')
        setUpdate(false)
    }
    
    return(
    <div className="container p-3">
        <AddTodo addTodoItem={addTodoItem} todoData={todoData} update={update} editId={editId} clearData={clearData} />
        <TodoList editTodo={editTodo} />
    </div>
    )    
}

export default Todo