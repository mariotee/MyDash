import * as types from 'constants/actiontypes.js';
import * as api from './api.js';

export const setPutStatusToIdle = () => ({ type: types.PUT_CUSTOMER_IDLE });
export const setPostStatusToIdle = () => ({ type: types.POST_CUSTOMER_IDLE });
/*WEB API CALLS*/
export const getAllCustomersFromApi = () => {
  const apiCall = api.getCustomers();

  return (dispatch) => {
    dispatch({ type: types.GET_ALL_CUSTOMERS_REQUEST });

    return apiCall.then(
      (response) => {
        dispatch({ type: types.GET_ALL_CUSTOMERS_SUCCESS, payload: response });
      },
      (error) => {
        console.log(error)
        dispatch({ type: types.GET_ALL_CUSTOMERS_ERROR, payload: error });
      },
    );
  };
};
export const updateCustomerWithApi = (customer) => {
  const apiCall = api.updateCustomer(customer);

  return (dispatch) => {
    dispatch({ type: types.PUT_CUSTOMER_REQUEST });

    return apiCall.then(
      (response) => {
        dispatch({ type: types.PUT_CUSTOMER_SUCCESS, payload: response });
      },
      (error) => {
        dispatch({ type: types.PUT_CUSTOMER_ERROR, payload: error });
      },
    );
  };
};
export const postNewCustomerWithApi = (customer) => {
  const apiCall = api.postCustomer(customer);

  return (dispatch) => {
    dispatch({ type: types.POST_CUSTOMER_REQUEST });

    return apiCall.then(
      (response) => {
        dispatch({ type: types.POST_CUSTOMER_SUCCESS, payload: response });
      },
      (error) => {
        dispatch({ type: types.POST_CUSTOMER_ERROR, payload: error });
      },
    );
  };
};
