import './App.css';
import { useForm } from "react-hook-form";
import { useState } from "react";
import style from "./App.module.css";
import Header from "./components/Header/Header";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoService from "./services/TodoService/TodoService";


function App() {
    const service = new TodoService()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [todos, setTodo] = useState([])
    const onSubmit = data => {
        data.id = Date.now()
        todos.push(data)
    };

    return (
    <div className="App">
        <Header/>
            <div className={style.form__root}>
            <div className={style.form__wrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className={style.input__text} {...register("title")} type="text"/><br/>
                    <input className={style.input__checkbox} {...register("status")} type="checkbox"/><br/>
                    <input className={style.input__date} {...register("date")} type="date"/><br/>
                    <input style={{width: "30%"}} className={style.input__submit} type="submit"/>
                </form>
            </div>
            </div>

            {todos.map(item => {
                return (
                    <div key={item.id} className={style.wrapper}>
                        <TodoItem status={item.status} title={item.title}/>
                        <button className={style.remove__button} onClick={() => service.deleteRemove(item.id, todos, setTodo)} >Delete</button>
                    </div>
                )
            })}
    </div>
  );
}

export default App;
