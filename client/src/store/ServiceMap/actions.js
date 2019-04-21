import * as types from 'constants/actiontypes.js';
import * as api from './api.js';

export const setPutStatusToIdle = () => ({ type: types.PUT_SERVICE_LOCATION_IDLE });
/*WEB API CALLS*/
export const getAllServiceLocationsFromApi = () => {
  const apiCall = api.getServiceLocations();

  return (dispatch) => {
    dispatch({ type: types.GET_ALL_SERVICE_LOCATIONS_REQUEST });

    return apiCall
      .then((response) => {
        dispatch({
          type: types.GET_ALL_SERVICE_LOCATIONS_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_SERVICE_LOCATIONS_ERROR,
          payload: error,
        });
      });
  };
};

export const updateServiceStatusWithApi = (location) => {
  const apiCall = api.updateServiceLocationStatusById(location._id, location);

  return (dispatch) => {
    dispatch({ type: types.PUT_SERVICE_LOCATION_REQUEST });

    return apiCall
      .then((response) => {
        dispatch({
          type: types.PUT_SERVICE_LOCATION_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({ type: types.PUT_SERVICE_LOCATION_ERROR, payload: error });
      });
  };
};
