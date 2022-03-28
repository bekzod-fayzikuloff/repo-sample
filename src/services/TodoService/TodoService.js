import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {ref, remove} from "firebase/database";

class TodoService {

    removeTodo(item, todos, setStateFunction, db) {
        confirmAlert({
            title: 'Confirm to delete Todo',
            message: `Are you sure want delete this todo. ${item.title}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setStateFunction(todos => {
                            remove(ref(db, `todos/${item.id}`))
                                .then(() => {
                                    console.log("done")
                                })
                            return todos.filter(todo => item.id !== todo.id)
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Removing canceled')
                }
            ]
        });
    }
    editTodo(id, todos, setStateFunction) {
        setStateFunction(todos => {
            return todos.map(item => {
                return {
                    ...item,
                    status: id === item.id ? !item.status : item.status
                }
            })
        })
    }
}

export default TodoService
