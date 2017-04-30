import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import employees from './employees/reducer';

export default combineReducers({
  employees,
  routing: routerReducer,
});
