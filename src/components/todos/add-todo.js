import React from "react";
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { addItemToTodo, updateSingleTodo } from "../../redux/action";

const AddTodo = ({addTodoItem,todoData,update,editId,clearData}) => {
    const dispatch = useDispatch()
        
    const addToTodoList = async e => {
        e.preventDefault()
        await dispatch(addItemToTodo(todoData))
        clearData()
    }
    const updateTodo = async (id) => {
        await dispatch(updateSingleTodo(todoData, id))
        clearData()
    }
    return(
        <div className="addtodo-form-wrap mb-3">
        <h3 className="text-center">Todo Input</h3>
        <Form onSubmit={addToTodoList}>
            <Form.Group className="mb-3" controlId="">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control type="text" placeholder="New todo" value={todoData}  onChange={e => addTodoItem(e.target.value)} />
            {/* <Form.Text className="text-muted">
            </Form.Text> */}
            </Form.Group>      
            {
                update ?
                <Button type="submit" variant="info" disabled = {!todoData.length ? 'disabled' : null } style={{width: '100%'}} onClick={() => updateTodo(editId)}>
                Update
                </Button>
                : <Button type="submit" variant="info" disabled = {!todoData.length ? 'disabled' : null } style={{width: '100%'}}>
                Add
                </Button>
            }
        </Form>
        </div>
    )
}
export default AddTodo