import * as types from 'constants/actiontypes.js';
import * as api from './api.js';

export const setDeleteStatusToIdle = () => ({ type: types.DELETE_INCOMPLETE_TASK_IDLE });
export const setPostStatusToIdle = () => ({ type: types.POST_INCOMPLETE_TASK_IDLE });
/*WEB API CALL*/
export const getAllIncompleteTasksFromApi = () => {
  const apiCall = api.getAllIncompleteTasks();

  return (dispatch) => {
    dispatch({ type: types.GET_ALL_INCOMPLETE_TASKS_REQUEST });

    return apiCall.then(
      (response) => {
        dispatch({
          type: types.GET_ALL_INCOMPLETE_TASKS_SUCCESS,
          payload: response,
        });
      },
      (error) => {
        dispatch({ type: types.GET_ALL_INCOMPLETE_TASKS_ERROR, payload: error });
      },
    );
  };
};

export const deleteIncompleteTaskWithApi = (task) => {
  const apiCall = api.deleteIncompleteTaskById(task._id);

  return (dispatch) => {
    dispatch({ type: types.DELETE_INCOMPLETE_TASK_REQUEST });

    return apiCall
      .then((response) => {
        dispatch({
          type: types.DELETE_INCOMPLETE_TASK_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({ type: types.DELETE_INCOMPLETE_TASK_ERROR, payload: error });
      });
  };
};

export const postCompletedTaskWithApi = (task) => {
  const apiCall = api.postCompletedTask(task);

  return (dispatch) => {
    dispatch({ type: types.POST_INCOMPLETE_TASK_REQUEST });

    return apiCall
      .then((response) => {
        dispatch({ type: types.POST_INCOMPLETE_TASK_SUCCESS, payload: response });
      })
      .catch((error) => {
        dispatch({ type: types.POST_INCOMPLETE_TASK_ERROR, payload: error });
      });
  };
};
