
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from './TaskForm.module.scss';

function TaskForm({ task, onSubmit, onCancel, error, isLoading, submitText  }) {

    const [title, setTitle] = useState('');
    
    useEffect(() => {
        if (task) {
            setTitle(task.title);
        }
    }, [task]);

    const handleAddTask = (e) => {
        e.preventDefault();
        onSubmit(title);
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
                    <button className={styles.btn} type="submit" disabled={isLoading}>{ submitText }</button>
                    <button className={styles.btn} type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm;