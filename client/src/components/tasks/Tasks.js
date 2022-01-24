import React, { useContext, Fragment, useEffect } from 'react';
import TaskContext from '../../context/tasks/taskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import TaskItem from './TaskItem';
import Spinner from '../layout/spinner';

const Tasks = () => {
  const taskContext = useContext(TaskContext);

  const { tasks, getTasks, loading } = taskContext;

  useEffect(() => {
    getTasks();
    //eslint-disable-next-line
  }, []);

  if (tasks !== null && tasks.length === 0 && !loading) {
    return <h4>Please add a Task</h4>;
  }

  return (
    <Fragment>
      {tasks !== null && !loading ? (
        <TransitionGroup>
          {tasks.map((task) => (
            <CSSTransition key={task._id} timeout={500} classNames="item">
              <TaskItem task={task} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Tasks;
