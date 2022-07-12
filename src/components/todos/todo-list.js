import React, { useState, useEffect } from "react";
import { Trash, Pencil } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from "react-redux";
import { TodoData, TodoComplete, deleteTodo } from "../../redux/action";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TodoList = ({editTodo}) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [curTodoId, setcurTodoId] = useState('');
    const [curTodoVal, setcurTodoVal] = useState('');
    const [status, setStatus] = useState('all');
    useEffect(() => {
        dispatch(TodoData()) 
    }, [dispatch])

    const todoCompleted = (id) => {
        dispatch(TodoComplete(id))
    }    

    const deleteTodoItem = (id) =>{
        dispatch(deleteTodo(id))
        setShow(false)
    }

    let todoDatas = useSelector(state => state.todoReducer.todoData)
    let todoItems = []
    if(status === 'all') todoItems = todoDatas
    else if(status === 'done') todoItems = todoDatas.filter(e => e.completed)
    else todoItems = todoDatas.filter(e => !e.completed)
    const handleClose = () => setShow(false);
    const handleShow =  (title, id) =>{
        setShow(true);
        setcurTodoId(id)
        setcurTodoVal(title)
    };
    return(
        <div className="todo-list-container">
            <div className="sticky-top bg-white pt-2 pb-1">
                <h3 className="text-center mb-4">Todo List</h3>
                <div className="d-flex flex-row align-items-center mb-4">
                <Button variant="info" className="flex-grow-1 mr-3" onClick={() => setStatus('all')}>All</Button>
                <Button variant="info" className="flex-grow-1 mr-3" onClick={() => setStatus('done')}>Done</Button>
                <Button variant="info" className="flex-grow-1" onClick={() => setStatus('todo')}>Todo</Button>
                </div>
            </div>
        {todoItems.length > 0 ? todoItems.map( e =>
            <div className="todo-list d-flex flex-row align-items-center justify-content-center p-1 mb-2" key={e.id}>
                <p className="flex-grow-1 pl-2" style={e.completed ?{ textDecoration: 'line-through', color: 'red'} : null}>{e.title}</p>
                <input type='checkbox'
                className="flex-grow-3 mr-3"
                onChange={()=>todoCompleted(e.id)}
                checked={e.completed ? true : false}
                ></input>
                <Pencil className="flex-grow-3 mr-3" title="edit" onClick={() => editTodo(e.title, e.id)}/>
                <Trash className="text-danger flex-grow-3" title="Delete" onClick={() => handleShow(e.title, e.id)}/>
            </div>
        ) : 
        <div>
            <p className="text-center">Todo is empty</p>
        </div>
            
            
        }
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <span>Do you want to delete </span><span className="delete-item text-danger">{curTodoVal}?</span>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => deleteTodoItem(curTodoId)}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}

export default TodoList
