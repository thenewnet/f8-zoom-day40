
import { useState } from 'react';
import clsx from 'clsx';

import styles from './TaskForm.module.scss';

function TaskForm({ onAddTask, onCancel, error }) {

    const [title, setTitle] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        onAddTask(title);
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleAddTask}>
                <input type="text" placeholder="Title"
                    className={clsx(styles.taskTitle, {
                        [styles.error]: !!error //trick convert string to boolean
                    })}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                {error && <span className={styles.errorMessage}>{error}</span>}

                <div className={styles.btnWrapper}>
                    <button className={styles.btn} type="submit">Add</button>
                    <button className={styles.btn} type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm;