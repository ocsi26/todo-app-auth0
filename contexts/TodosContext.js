import { createContext, useState } from "react";

const TodosContext = createContext();

const TodosProvider = ({children}) => {
    const [todos, setTodos] = useState ([]);

    const refreshTodos = async () => {
        try{
            const res = await fetch('/api/getTodos');
            const latestTodos = await res.json();
            setTodos(latestTodos);
        }
        catch(err){
            console.error(err);
        }
    }

    const addTodo = async (description ) => {
        try{
            const res = await fetch('/api/createTodo', {
                method: 'POST',
                body: JSON.stringify({description}),
                headers: {'Content-Type': 'applicaion/json'}
            });
            const latestTodos = await res.json();
            setTodos((prevTodos) => {
                return  [newTodo, ...prevTodos];
            });
        }
        catch(err){
            console.error(err);
        }
    }

    const updateTodo = async (updatedTodo) => {
        try{
            console.log("UPDATE WAS CALLED");

            const res = await fetch('/api/updateTodo', {
                method: 'PUT',
                body: JSON.stringify({updatedTodo}),
                headers: {'Content-Type': 'applicaion/json'}
            });
            await res.json();
            setTodos((prevTodos) => {
                const existingTodos = [...prevTodos];
                const existingTodo = existingTodos.find(todo => todo.id == updatedTodo.id);
                existingTodo.fields = updatedTodo.fields;
                return existingTodos;
            });
        }
        catch(err){
            console.error(err);
        }
    }

    const deleteTodo = async (id ) => {
        try{
            console.log("Delete called in CONTEXT, with ID: " + id);

            const res = await fetch('/api/deleteTodo', {
                method: 'DELETE',
                body: JSON.stringify({id}),
                headers: {'Content-Type': 'applicaion/json'}
            });
            await res.json();
            setTodos((prevTodos) => {
                return prevTodos.filter((todo) => todo.id != id);
            });
        }
        catch(err){
            console.error(err);
        }
    }

    return <TodosContext.Provider value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo, 
    }}>{children}</TodosContext.Provider>
}

export {TodosProvider, TodosContext}