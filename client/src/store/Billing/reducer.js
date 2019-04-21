import * as types from 'constants/actiontypes.js';
import { IDLE, LOADING, ERROR, SUCCESS } from 'constants/status.js';

const initialState = {
  getStatus: IDLE,
  data: [],
};

const sortByMonth = (arr) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  arr.sort((a,b) => months.indexOf(a.month) - months.indexOf(b.month));

  return arr;
};

export default function billingReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_USAGE_REQUEST:
      return ({
        ...state,
        status: LOADING,
      });
    case types.GET_ALL_USAGE_ERROR:
      return ({
        ...state,
        status: ERROR,
      });
    case types.GET_ALL_USAGE_SUCCESS:
      return ({
        ...state,
        status: SUCCESS,
        data: sortByMonth(action.payload.data),
      });
    default:
      return state;
  }
}
