

import styles from './TaskItem.module.scss';

function TaskItem({ task, onDeleteTask, onEditTask, isDeleting }) {


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{task.title}</h1>
            <div className={styles.btnWrapper}>
                <button className={styles.btn} onClick={() => onEditTask(task.id)}
                    disabled={isDeleting}
                >
                    Edit
                </button>
                <button className={styles.btn} onClick={() => onDeleteTask(task.id)}
                    disabled={isDeleting}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TaskItem;