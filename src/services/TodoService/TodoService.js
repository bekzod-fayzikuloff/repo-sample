class TodoService {
    deleteRemove(id, todos, setStataFunction) {
        const newTodo = todos.filter(item => id !== item.id)
        setStataFunction(newTodo)
    }
}

export default TodoService
