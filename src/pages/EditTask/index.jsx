import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import styles from './EditTask.module.scss';
import TaskForm from '@/components/TaskForm';
import { useDispatch, useSelector } from '@/libs/react-redux';

function EditTask() {
  const error = useSelector(state => state.error);
  const isLoading = useSelector(state => state.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  console.log(params);
  const [task, setTask] = useState();

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/tasks/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          if (!data) {
            navigate('/tasks');
            return;
          }
          setTask(data);
        })
    }
    catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err.message
      })
    }
  }, [params.id, dispatch, navigate])

  const handleSubmit = (title) => {
    //validate values
    if (!title || title.trim() === '') {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Title is required'
      })
      return;
    }

    try {
      dispatch({
        type: 'SET_LOADING',
        payload: true
      })
      fetch(`http://localhost:3001/tasks/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title
        })
      })
        .then(res => res.json())
        .then(data => {

          dispatch({
            type: 'UPDATE_TASK',
            payload: data
          })

          navigate('/tasks');
        })
    } catch (e) {
      dispatch({
        type: 'SET_ERROR',
        payload: e.message
      })
    } finally {
      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
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
      <h1 className={styles.pageTitle}>Edit Task</h1>
      <div className={styles.content}>
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          task={task}
          submitText={'Update'}
          error={error}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default EditTask;
