import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select'

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [selectedUser, setSelectedUser]= useState(null)
  const inputRef = useRef(null);

  // console.log(props)

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      width: '90%',
      borderRadius: '10px',
      backgroundColor: '#161a2b',
      color: 'white',
    }),
  
    control: (provided) => ({
      ...provided,
      backgroundColor: '#161a2b',
      color: 'white',
      padding: 'repeat(4, 11px)',
      border: '2px solid #5d0cff',
      outline: 'none',
      width: '90%',
    }),
  }

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
    // console.log(input)
  };

  const handleSelect = e => {
    console.log(e)
    setSelectedUser(e.id);
    console.log(selectedUser, 'selectedUser <<<')
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log(props, 'antes de alterar <<<')

    props.onSubmit({
      userId: props.edit ? props.edit.userId : selectedUser,
      id: Math.floor(Math.random() * 10000),
      title: input,
      completed: props.edit ? props.edit.completed : false,
    });
    console.log(props, 'DEPOISSS de alterar <<<')
    // console.log('dentro do handleSubmit', props.edit.userId)
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {/* não vai cair na primeira condição pois  */}
      {props.edit ? (
        <>
          <input
            placeholder='Digite a alteração'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Atualizar
          </button>
        </>
      ) : (
        <div className='add-todo-row'>
          <Select 
            options={props.usersList || [{}]}
            getOptionLabel={option =>`${option.name}`}
            getOptionValue={option => `${option.id}`}
            isSearchable={true}
            placeholder={'Digite ou selecione o nome'}
            autoFocus={true}
            onChange={handleSelect}
            styles={customStyles}
          />
          <input
            placeholder='Descrição da tarefa'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Adicionar
          </button>
        </div>
      )}
    </form>
  );
}

export default TodoForm;