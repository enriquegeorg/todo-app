import './App.css';
import { useState, useEffect } from 'react'
import Loading from './components/loading/Loading'
import TodoList from './components/todo/TodoList'

import Card from './components/layout/Card'

import axios from 'axios'

function App() {
  const [todos, setTodos] = useState(null)
  const [users, setUsers] = useState(null)

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

  return (
    <div className="todo-app">
      {todos ? <TodoList usersList={users} todosList={todos} /> : <Loading />}
    </div>
  );
}

export default App;

