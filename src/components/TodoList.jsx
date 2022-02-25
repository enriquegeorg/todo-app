import React, { useState, useEffect, useMemo } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

import axios from 'axios'
import { useRef } from 'react'

function TodoList() {

  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState([]);
  // const [filteredTodos, setFilteredTodos] = useState([]);

  const inputRef = useRef(null);

  // useEffect(() => {
  //   inputRef.current.focus();
  // });
  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    const todosJson = await axios.get("https://jsonplaceholder.typicode.com/todos")
    const usersJson = await axios.get("https://jsonplaceholder.typicode.com/users")
    setUsers(usersJson.data)
    const todosWithUser = todosJson.data.map((a) => ({
      ...a,
      user: usersJson.data.find((b) => b.id === a.userId)
    }))
    setTodos(todosWithUser)
  }

  const handleChange = e => {
    setInput(e.target.value);
  };
  const filteredTodos = useMemo(() => todos.filter((a) => a.title.includes(input)), [input, todos])
  // return setFilteredTodos(filteredTodos)

  const addTodo = todo => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    // if (filteredTodos.length > 1) setFilteredTodos(todos)

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Lista de Taréfas</h1>
      <TodoForm onSubmit={addTodo} usersList={users} />
      <div className="todo-row-header">
        <input 
          placeholder='Digite para pesquisar tarefas'
          value={input}
          onChange={handleChange}
          name='text'
          ref={inputRef}
          className='todo-search-input'
        />
      </div>
      <div className='todo-row-header'>
        <div>Usuário</div>
        <div>Tarefa</div>
        <div>Ações</div>
      </div>
      <Todo
        todos={filteredTodos}
        users={users}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;