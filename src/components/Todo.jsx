import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { IoMdCheckboxOutline } from 'react-icons/io';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo, users }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      userId: null,
      id: null,
      value: '',
      completed: false,
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return <> {todos.map((todo) => (
    <div
      className={todo.completed ? 'todo-row complete' : 'todo-row'}
      key={todo.id}
    >
      <div>{todo.user.name}</div>
      <div key={todo.id}>
        {todo.title}
      </div>
      <div className='icons'>
        <IoMdCheckboxOutline
          onClick={() => completeTodo(todo.id)}
          className='check-icon'
        />
        {/* falta implementar alteração de usuário */
        /* <TiEdit
          onClick={() => setEdit({
            userId: todo.userId,
            id: todo.id,
            value: todo.title,
            completed: todo.completed
          })}
          className='edit-icon'
        /> */}
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
      </div>
    </div>
  ))} </>;
};

export default Todo;