

import styles from './TaskItem.module.scss';

function TaskItem({ task, onDeleteTask, onEditTask }) {


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{task.title}</h1>
            <div className={styles.btnWrapper}>
                <button className={styles.btn} onClick={() => onEditTask(task.id)}>Edit</button>
                <button className={styles.btn} onClick={() => onDeleteTask(task.id)}>Delete</button>
            </div>
        </div>
    )
}

export default TaskItem;