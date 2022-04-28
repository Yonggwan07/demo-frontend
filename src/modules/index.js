import { combineReducers } from '../../node_modules/@reduxjs/toolkit/dist/index';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
