import React, { useState, useContext, useEffect } from 'react';
import TaskContext from '../../context/tasks/taskContext';

export default function TaskScore() {
  const taskContext = useContext(TaskContext);

  const { getTotalScore, totalScore, getTotalUserScore, userScore } =
    taskContext;

  useEffect(() => {
    getTotalScore();
    getTotalUserScore();
  }, []);

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        Total System Score
        <span style={{ float: 'right' }} className={'badge badge-primary'}>
          {totalScore}
        </span>
      </h3>
      <h3 className="text-primary text-left">
        Total User Score
        <span style={{ float: 'right' }} className={'badge badge-primary'}>
          {userScore}
        </span>
      </h3>
    </div>
  );
}
