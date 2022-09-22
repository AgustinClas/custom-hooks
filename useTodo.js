import { useReducer, useEffect, useState } from "react"
import { todoReducer } from './../08-useReducer/todoReducer'

const initialState = [
    /* {
        id: new Date().getTime(),
        description: 'Recolectar la piedra del alma',
        done: false
    } */
]

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
    
    const [todosCounter, setTodosCounter] = useState(0);
    const [pendingTodosCounter, setPendingTodosCounter] = useState(0)
    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init)

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add TODO',
            payload: todo
        };

        dispatchTodo( action );
    }

    const handleDeleteTodo = (id) => {
        const action = {
            type: '[TODO] Remove TODO',
            payload: id
        };

        dispatchTodo( action );
    }

    const handleToggleTodo = (id) => {
        const action = {
            type: '[TODO] Toggle TODO',
            payload: id
        };

        dispatchTodo( action );
    }

    useEffect(() => {

        localStorage.setItem('todos', JSON.stringify(todos));
        setTodosCounter(todos.length);
        setPendingTodosCounter(
            todos.filter(todo => !todo.done).length
        )

    }, [todos])

    return {handleDeleteTodo, handleNewTodo, handleToggleTodo, todos, todosCounter, pendingTodosCounter}

}
