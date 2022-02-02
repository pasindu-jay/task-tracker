import React, { useEffect, useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import TaskContext from '../../context/tasks/taskContext';
import AuthContext from '../../context/auth/authContext';

const columns = [
  {
    name: 'User',
    selector: (row) => row.user,
  },
  {
    name: 'Tasks',
    selector: (row) => row.tasks,
  },
  {
    name: 'SCore',
    selector: (row) => row.score,
  },
];

export default function SuperUser() {
  const taskContext = useContext(TaskContext);

  const { getSuperUserData, superUserData } = taskContext;
  const [data, setData] = useState([]);

  useEffect(() => {
    getSuperUserData(superUserData);
  }, []);

  useEffect(() => {
    formatArray();
  }, [superUserData]);

  const formatArray = () => {
    let arr = [];
    superUserData?.map((item) => {
      const data = {
        id: item._id._id,
        user: item._id.name,
        tasks: item.details.map((item) => {
          return item.name + ', ';
        }),
        score: item.sumQuantity,
      };

      arr.push(data);
    });

    setData(arr);
  };

  return <DataTable columns={columns} data={data} />;
}
