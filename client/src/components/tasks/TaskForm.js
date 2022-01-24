import React, { useState, useContext, useEffect } from 'react';
import TaskContext from '../../context/tasks/taskContext';

const TaskForm = () => {
  const taskContext = useContext(TaskContext);

  const { addTask } = taskContext;

  useEffect(() => {
    setTask({
      name: '',
      type: 'personal',
    });
  }, []);

  const [task, setTask] = useState({
    name: '',
    type: 'personal',
  });

  const { name, type } = task;

  // const clearAll = () => {
  //   clearCurrent();
  // };

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addTask(task);

    // clearAll();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Task</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <h5>Task Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal {''}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional {''}
      <input
        type="submit"
        value={'Add Task'}
        className="btn btn-primary btn-block"
      />
    </form>
  );
};

export default TaskForm;
