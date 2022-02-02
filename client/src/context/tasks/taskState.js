import React, { useReducer } from 'react';
import axios from 'axios';
import TaskContext from './taskContext';
import taskReducer from './taskReducer';
import {
  ADD_TASKS,
  CLEAR_TASKS,
  DELETE_TASKS,
  GET_TASKS,
  GET_TOTAL_SCORE,
  GET_USER_SCORE,
  GET_SUPER_USER_DATA,
} from '../types';

const TaskState = (props) => {
  const initialState = {
    tasks: null,
    totalScore: null,
    userScore: null,
    superUserData: [],
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
      getTotalScore();
      getTotalUserScore();
      getSuperUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);

      dispatch({ type: DELETE_TASKS, payload: id });
      getTotalScore();
      getTotalUserScore();
      getSuperUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const clearTasks = () => {
    dispatch({ type: CLEAR_TASKS });
  };

  const getTotalScore = async () => {
    try {
      const res = await axios.get('/api/tasks/get_total_score');
      console.log(res);
      dispatch({ type: GET_TOTAL_SCORE, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalUserScore = async () => {
    try {
      const res = await axios.get('/api/tasks/get_total_score_user');
      console.log(res);
      dispatch({ type: GET_USER_SCORE, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const getSuperUserData = async () => {
    try {
      const res = await axios.get('/api/tasks/get_super_user_data');
      dispatch({ type: GET_SUPER_USER_DATA, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        deleteTask,
        getTasks,
        clearTasks,
        getTotalScore,
        totalScore: state.totalScore,
        getTotalUserScore,
        userScore: state.userScore,
        getSuperUserData,
        superUserData: state.superUserData,
      }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
