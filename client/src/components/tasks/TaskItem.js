import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskContext from '../../context/tasks/taskContext';

const TaskItem = ({ task }) => {
  const taskContext = useContext(TaskContext);

  const { deleteTask } = taskContext;

  const { _id, name, type } = task;

  const onDelete = () => {
    deleteTask(_id);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>{' '}
      </h3>
      <p>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItem;
