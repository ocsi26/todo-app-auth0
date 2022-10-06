import React from 'react';
import { TodosContext } from '../contexts/TodoContext';
import { useContext } from 'react';

export default function Todo({todo}){
    const {updateTodo, deleteTodo} = useContext(TodosContext);

    const handleToggleCompleted = () => {
        const updatedFields = {
            ...todo.fields,
            completed: !todo.fields.completed
        }
        const updatedTodo = {id: todo.id, fields: updatedFields};
        updateTodo(updatedTodo);
    }
    return(
        <li className="flex bg-white items-center shadow-lg rounded-lg my-2 py-2 px-4 text-black">
            <input type="checkbox" id="completed" name="completed" checked={todo.fields.completed}
            className="mr-2 form-checkbox h-5 w-5" onChange={handleToggleCompleted}/>
            <p className={`flex-1 text-gray-800' ${todo.fields.completed ? 'line-through' : ''}`}>
                {todo.fields.description}
            </p>            
            <button type="button" id="delete" onClick={() => deleteTodo(todo.id)} className="rounded text-sm bg-red-500 hover:bg-red-600 py-1 px-2 text-white">Delete</button>
        </li>
    );
}