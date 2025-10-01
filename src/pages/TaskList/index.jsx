import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "@/libs/react-redux";
import TaskItem from "@/components/TaskItem";
import styles from './TaskList.module.scss';

function TaskList() {

    const tasks = useSelector(state => state.tasks);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching tasks");
        
        fetch("http://localhost:3001/tasks")
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: "SET_TASKS",
                    payload: data
                })
            }).catch(err => {
                dispatch({
                    type: "SET_ERROR",
                    payload: err.message
                });
            });
    }, [dispatch]);

    const handleDelete = (id) => {
        //show confirmation
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        console.log("Deleting task", id);

        try {
            fetch(`http://localhost:3001/tasks/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: "DELETE_TASK",
                        payload: data.id
                    })
                });
        } catch (e) {
            dispatch({
                type: "SET_ERROR",
                payload: e.message
            });
        }

    }

    const handleEdit = (id) => {
        //navigate to edit page  /:id/edit
        navigate(`/${id}/edit`);
    }

    const handleAddTask = () => {
        navigate("/new-task");
    }

    return (
        <div className={styles.container}>
            <div className={styles.pageTitleWrapper}>
                <h1 className={styles.pageTitle}>TaskList</h1>
                <button className={styles.btn} onClick={handleAddTask}>New Task</button>
            </div>
            <div className={styles.content}>
                {error && <div className={styles.error}>{error}</div>}
                {tasks && tasks.length > 0 ?
                    <>
                        {
                            tasks.map(task => (
                                <TaskItem key={task.id} task={task} onDeleteTask={handleDelete}
                                    onEditTask={handleEdit} />
                            ))
                        }
                    </>
                    : <p>No tasks</p>
                }
            </div>
        </div>
    )
}

export default TaskList;