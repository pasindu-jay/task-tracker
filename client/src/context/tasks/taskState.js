import React, { useReducer } from 'react';
import axios from 'axios';
import TaskContext from './taskContext';
import taskReducer from './taskReducer';
import { ADD_TASKS, CLEAR_TASKS, DELETE_TASKS, GET_TASKS } from '../types';

const TaskState = (props) => {
  const initialState = {
    tasks: null,
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  const getTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');

      dispatch({ type: GET_TASKS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (task) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/tasks', task, config);

      dispatch({ type: ADD_TASKS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);

      dispatch({ type: DELETE_TASKS, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  const clearTasks = () => {
    dispatch({ type: CLEAR_TASKS });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        deleteTask,
        getTasks,
        clearTasks,
      }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
