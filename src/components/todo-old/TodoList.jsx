import './TodoList.css'

const TodoList = ({ todos, users }) => {

    function getUser(currentUser) {
        let userName = users.map(function getName(a) {
            if (a.id === currentUser) {
                return a.name
            } else {
                return ''
            }
        })
        return userName
    }

    return (
        <div className="todo-table">
            <table border="0">
                <thead>
                    <tr>
                        <th>Usuário</th>
                        <th>Título</th>
                        <th>Completa</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            {/* {users ? console.log(users, 'aquiiii') : 'nada'} */}
                            <td> { getUser(todo.userId) } </td> 
                            <td> {todo.title ? todo.title : 'Sem título'} </td>
                            <td> {todo.completed ? 'Sim' : 'Não'} </td>
                            <td> x </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default TodoList