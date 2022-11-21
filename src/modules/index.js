import { combineReducers } from '../../node_modules/@reduxjs/toolkit/dist/index';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import userInfo, { userSaga } from './user';

const rootReducer = combineReducers({
  auth,
  loading,
  userInfo,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
