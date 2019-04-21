import * as types from 'constants/actiontypes.js';
import { IDLE, LOADING, SUCCESS, ERROR } from 'constants/status.js';

import * as SortFunctions from 'utils/DataSortFunctions.js';

const initialState = {
  getStatus: IDLE,
  putStatus: IDLE,
  postStatus: IDLE,
  data: [],
};

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_CUSTOMERS_REQUEST:
      return { ...state, getStatus: LOADING };
    case types.GET_ALL_CUSTOMERS_ERROR:
      return { ...state, getStatus: ERROR };
    case types.GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        getStatus: SUCCESS,
        dataLoaded: true,
        data: SortFunctions.sortCustomerData(action.payload.data),
      };
    case types.PUT_CUSTOMER_REQUEST:
      return { ...state, putStatus: LOADING };
    case types.PUT_CUSTOMER_ERROR:
      return { ...state, putStatus: ERROR };
    case types.PUT_CUSTOMER_SUCCESS:
      return { ...state, putStatus: SUCCESS };
    case types.PUT_CUSTOMER_IDLE:
      return { ...state, putStatus: IDLE };
    case types.POST_CUSTOMER_REQUEST:
      return { ...state, postStatus: LOADING };
    case types.POST_CUSTOMER_ERROR:
      return { ...state, postStatus: ERROR };
    case types.POST_CUSTOMER_SUCCESS:
      return { ...state, postStatus: SUCCESS };
    case types.POST_CUSTOMER_IDLE:
      return { ...state, postStatus: IDLE };

    default:
      return state;
  }
}
