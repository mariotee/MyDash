import * as types from 'constants/actiontypes.js';
import { IDLE, LOADING, SUCCESS, ERROR } from 'constants/status.js';

const initialState = {
  getStatus: IDLE,
  putStatus: IDLE,
  loaded: false,
  data: [],
};

export default function serviceMapReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_SERVICE_LOCATIONS_REQUEST:
      return { ...state, getStatus: LOADING };
    case types.GET_ALL_SERVICE_LOCATIONS_ERROR:
      return { ...state, getStatus: ERROR };
    case types.GET_ALL_SERVICE_LOCATIONS_SUCCESS:
      return {
        ...state,
        getStatus: SUCCESS,
        loaded: true,
        data: action.payload.data,
      };
    case types.PUT_SERVICE_LOCATION_REQUEST:
      return { ...state, putStatus: LOADING };
    case types.PUT_SERVICE_LOCATION_ERROR:
      return { ...state, putStatus: ERROR };
    case types.PUT_SERVICE_LOCATION_SUCCESS:
      return { ...state, putStatus: SUCCESS };
    case types.PUT_SERVICE_LOCATION_IDLE:
      return { ...state, putStatus: IDLE };

    default:
      return state;
  }
}
