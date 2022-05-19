import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as transactionAPI from '../lib/api/transaction';

const [SEARCH, SEARCH_SUCCESS, SEARCH_FAILURE] =
  createRequestActionTypes('SEARCH');

const SET_TRANSACTION_ID = 'SET_TRANSACTION_ID';
const UNLOAD_DATA = 'UNLOAD_DATA';

export const setTransactionId = createAction(
  SET_TRANSACTION_ID,
  ({ menuId, workId }) => ({ menuId, workId }),
);
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

export default handleActions(
  {
    [SET_TRANSACTION_ID]: (state, { payload: { menuId, workId } }) =>
      produce(state, (draft) => {
        draft.menuId = menuId;
        draft.workId = workId;
      }),
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
    [UNLOAD_DATA]: () => initialState,
  },
  initialState,
);
