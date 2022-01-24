import { ADD_TASKS, GET_TASKS, DELETE_TASKS } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case ADD_TASKS:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false,
      };

    case DELETE_TASKS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        loading: false,
      };

    default:
      return state;
  }
};
