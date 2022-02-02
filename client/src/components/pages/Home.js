import React, { useContext, useEffect } from 'react';
import Tasks from '../tasks/Tasks';
import TaskForm from '../tasks/TaskForm';
import TaskScore from '../tasks/TaskScore';
import AuthContext from '../../context/auth/authContext';
import SuperUser from '../layout/SuperUser';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {user?.type === 'super' && <SuperUser />}

      <div className="grid-2 my-3">
        <div>
          <TaskForm />
          <TaskScore />
        </div>
        <div>
          <Tasks />
        </div>
      </div>
    </div>
  );
};

export default Home;
