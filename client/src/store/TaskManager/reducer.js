import * as types from 'constants/actiontypes.js';
import { IDLE, LOADING, ERROR, SUCCESS } from 'constants/status.js';
const initialState = {
  data: [],
  getStatus: IDLE,
  deleteStatus: IDLE,
  postStatus: IDLE,
};

export default function incompleteTasksReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case types.GET_ALL_INCOMPLETE_TASKS_REQUEST:
      return { ...state, getStatus: LOADING };

    case types.GET_ALL_INCOMPLETE_TASKS_ERROR:
      return { ...state, getStatus: ERROR };

    case types.GET_ALL_INCOMPLETE_TASKS_SUCCESS:
      return {
        ...state,
        getStatus: SUCCESS,
        data: action.payload.data.sort(
          (a, b) => (a.dueDate < b.dueDate ? -1 : 1),
        ),
      };

    case types.DELETE_INCOMPLETE_TASK_REQUEST:
      return { ...state, deleteStatus: LOADING };

    case types.DELETE_INCOMPLETE_TASK_ERROR:
      return { ...state, deleteStatus: ERROR };

    case types.DELETE_INCOMPLETE_TASK_SUCCESS:
      return { ...state, deleteStatus: SUCCESS };

    case types.DELETE_INCOMPLETE_TASK_IDLE:
      return { ...state, deleteStatus: IDLE };

    case types.POST_INCOMPLETE_TASK_REQUEST:
      return { ...state, postStatus: LOADING };

    case types.POST_INCOMPLETE_TASK_ERROR:
      return { ...state, postStatus: ERROR };

    case types.POST_INCOMPLETE_TASK_SUCCESS:
      return { ...state, postStatus: SUCCESS };

    case types.POST_INCOMPLETE_TASK_IDLE:
      return { ...state, postStatus: IDLE };

    default:
      return state;
  }
}