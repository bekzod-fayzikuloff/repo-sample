import './App.css';
import { useForm } from "react-hook-form";
import {useEffect, useState} from "react";
import style from "./App.module.css";
import Header from "./components/Header/Header";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoService from "./services/TodoService/TodoService";
import { ref, set, onValue } from "firebase/database";
import database from "./firebase";


function App() {
    const service = new TodoService()

    const { register, handleSubmit} = useForm();
    const [todos, setTodo] = useState([])

    useEffect(() => {
        const starCountRef = ref(database, 'todos');
        onValue(starCountRef, (snapshot) => {
            const todoList = []
            const responseData = snapshot.val()
            for (let data in responseData) {
                todoList.push(responseData[data])
            }
            setTodo(todoList);
        })
    }, [])

    const onSubmit = data => {
        data.id = Date.now()

        set(ref(database, 'todos/' + data.id.toString()), {
            id: data.id,
            title: data.title,
            status: data.status,
            date: data.date
        })
            .then(() => {
                console.log('Record was saved')
            })
            .catch(() => {
                console.log("Some error happened")
            });
        // setTodo(todos => {
        //     data.id = Date.now()
        //     const newTodo = todos.concat()
        //     newTodo.push(data)
        //     return newTodo
        // })
    };

    return (
    <div className="App">
        <Header/>
            <div className={style.form__root}>
            <div className={style.form__wrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className={style.input__text} {...register("title", { required: true })} type="text"/><br/>
                    <input className={style.input__checkbox} {...register("status")} type="checkbox"/><br/>
                    <input className={style.input__date} {...register("date", { required: true })} type="date"/><br/>
                    <input style={{width: "30%"}} className={style.input__submit} type="submit"/>
                </form>
            </div>
            </div>

            {todos.map(item => {
                console.log(item)
                return (
                    <div key={item.id} onClick={() => service.editTodo(item.id, todos, setTodo)} className={style.wrapper}>
                        <TodoItem status={item.status} title={item.title}/>
                        <button className={style.remove__button} onClick={() => service.removeTodo(item, todos, setTodo, database)} >Delete</button>
                    </div>
                )
            })}
    </div>
  );
}

export default App;
