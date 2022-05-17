import { combineReducers } from '../../node_modules/@reduxjs/toolkit/dist/index';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import userInfo, { userSaga } from './user';
import transaction, { transactionSaga } from './transaction';

const rootReducer = combineReducers({
  auth,
  loading,
  userInfo,
  transaction
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), transactionSaga()]);
}

export default rootReducer;
