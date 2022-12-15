import { combineReducers } from '../../node_modules/@reduxjs/toolkit/dist/index';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import userInfo, { userSaga } from './user';
import menuList, { menuListSaga } from './menuList';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['menuList'],
};

const rootReducer = combineReducers({
  auth,
  loading,
  userInfo,
  menuList,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), menuListSaga()]);
}

export default persistReducer(persistConfig, rootReducer);
