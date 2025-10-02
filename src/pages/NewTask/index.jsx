
import TaskForm from '@/components/TaskForm';
import styles from './NewTask.module.scss';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from '@/libs/react-redux';
function NewTask() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const isLoading = useSelector(state => state.isLoading);

    console.log("New Task render: ", error);

    const handleAddTask = async (title) => {
        //validate input
        if (title.trim() === '') {
            dispatch({
                type: "SET_ERROR",
                payload: "Title is required"
            })
            return;
        } else {
            //call api 
            try {
                dispatch({
                    type: "SET_LOADING",
                    payload: true
                })
                const data = await fetch("http://localhost:3001/tasks", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: title,
                        completed: false
                    })
                })
                    .then(res => res.json());

                dispatch({
                    type: "ADD_TASK",
                    payload: data
                })
            } catch (error) {
                dispatch({
                    type: "SET_ERROR",
                    payload: error.message
                })
            } finally {
                dispatch({
                    type: "SET_LOADING",
                    payload: false
                })
            }

            //clear error
            dispatch({
                type: "SET_ERROR",
                payload: null
            })
            navigate('/tasks');
        }
    }
    const handleCancel = () => {
        dispatch({
            type: 'SET_ERROR',
            payload: null
        })
        navigate('/tasks');
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>NewTask</h1>
            <div className={styles.content}>
                <TaskForm
                    onSubmit={handleAddTask}
                    onCancel={handleCancel}
                    submitText={"Add"}
                    error={error}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default NewTask;