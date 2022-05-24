import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as transactionAPI from '../lib/api/transaction';

const [SEARCH, SEARCH_SUCCESS, SEARCH_FAILURE] =
  createRequestActionTypes('SEARCH');

const UNLOAD_DATA = 'UNLOAD_DATA';

export const unloadData = createAction(UNLOAD_DATA);

export const search = createAction(SEARCH, ({ menuId, workId, params }) => {
  return {
    menuId,
    workId,
    params,
  };
});

const searchSaga = createRequestSaga(SEARCH, transactionAPI.search);

export function* transactionSaga() {
  yield takeLatest(SEARCH, searchSaga);
}

const initialState = {
  data: null,
  menuId: '',
  workId: '',
  error: null,
};

const dataValidate = (data) => {
  for (const key in data) {
    if (data[key] === undefined || data[key] === null) {
      data[key] = '';
    }
    if (data[key] === false) {
      data[key] = '0';
    }
    if (data[key] === true) {
      data[key] = '1';
    }
  }

  return data;
};

/* 서버로부터 반환된 JSON 키를 대문자로 변경 */
const returnUpperCaseObj = ([key, value]) => {
  if (key === 'id') {
    return [key, value];
  }
  return [key.toUpperCase(), value];
};

const jsonKeyUpperCase = (obj) => {
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      obj[index] = Object.fromEntries(
        Object.entries(item).map(([key, value]) =>
          returnUpperCaseObj([key, value]),
        ),
      );
    });
    return obj;
  } else {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => returnUpperCaseObj([key, value])),
    );
  }
};

export default handleActions(
  {
    [SEARCH]: (state, { payload: { menuId, workId, params } }) =>
      produce(state, (draft) => {
        draft.menuId = menuId;
        draft.workId = workId;
        draft.params = dataValidate(params);
      }),
    [SEARCH_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      data: jsonKeyUpperCase(data),
      error: null,
    }),
    [SEARCH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      data: null,
      error: error.message,
    }),
    [UNLOAD_DATA]: () => initialState,
  },
  initialState,
);
