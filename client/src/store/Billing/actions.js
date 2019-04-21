import * as api from './api.js';
import * as types from 'constants/actiontypes.js';

/*WEB API CALL*/
export const getAllUsageFromApi = () => {
  const apiCall = api.getUsageData();

  return (dispatch) => {
    dispatch({ type: types.GET_ALL_USAGE_REQUEST });

    return apiCall.then(
      (response) => {
        dispatch({
          type: types.GET_ALL_USAGE_SUCCESS,
          payload: response,
        });
      },
      (error) => {
        dispatch({ type: types.GET_ALL_USAGE_ERROR, payload: error });
      },
    );
  };
};
