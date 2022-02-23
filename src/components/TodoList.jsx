import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

import axios from 'axios'
import { useRef } from 'react'

function TodoList(usersList, todosList) {

  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then((todos) => 
    setTodos(todos.data))
  }, [])
  useEffect(() => {
  axios.get("https://jsonplaceholder.typicode.com/users")
    .then((users) => 
    setUsers(users.data))
  }, [])

  const handleChange = e => {
    setInput(e.target.value);
    let filteredTodos = todos.filter((a) => a.title.includes(e.target.value))
    return setFilteredTodos(filteredTodos)
  };

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
        todos={filteredTodos.length > 0 ? filteredTodos : todos}
        users={users}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;