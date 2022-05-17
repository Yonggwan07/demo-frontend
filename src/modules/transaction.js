import { takeLatest } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as transactionAPI from '../lib/api/transaction';

const [SEARCH, SEARCH_SUCCESS, SEARCH_FAILURE] =
  createRequestActionTypes('SEARCH');

export const search = createAction(SEARCH, ({ menuId, workId, params }) => ({
  menuId,
  workId,
  params,
}));

const searchSaga = createRequestSaga(SEARCH, transactionAPI.search);

export function* transactionSaga() {
  yield takeLatest(SEARCH, searchSaga);
}

const initialState = {
  data: null,
  error: null,
};

export default handleActions(
  {
    [SEARCH_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      data,
      error: null,
    }),
    [SEARCH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      data: null,
      error: error.message,
    }),
  },
  initialState,
);
