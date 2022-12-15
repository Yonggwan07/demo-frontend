import { takeLatest } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const [GET_MENULIST, GET_MENULIST_SUCCESS, GET_MENULIST_FAILURE] =
  createRequestActionTypes('user/GET_MENULIST');

export const getMenuList = createAction(GET_MENULIST);

const getMenuListSaga = createRequestSaga(GET_MENULIST, authAPI.getMenuList);

export function* menuListSaga() {
  yield takeLatest(GET_MENULIST, getMenuListSaga);
}

const initialState = {
  menuList: null,
  checkError: null,
};

export default handleActions(
  {
    [GET_MENULIST_SUCCESS]: (state, { payload: menuList }) => ({
      ...state,
      menuList,
      checkError: null,
    }),
    [GET_MENULIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      menuList: null,
      checkError: error,
    }),
  },
  initialState,
);
