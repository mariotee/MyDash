import { combineReducers } from 'redux';

import serviceMap from 'store/ServiceMap/reducer';
import taskManager from 'store/TaskManager/reducer';
import customers from 'store/Customers/reducer';
import billing from 'store/Billing/reducer';

const rootReducer = combineReducers({
  serviceMap,
  taskManager,
  customers,  
  billing,
});

export default rootReducer;
