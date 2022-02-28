import style from "./TodoItem.module.css";

export default function TodoItem(props) {
    return(
        <div className={style.item__wrapper}>
            <h2 className={props.status ? style.enabled : style.disabled}>{props.title}</h2>
        </div>
    )
}
