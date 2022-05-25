import { createAction, handleActions } from 'redux-actions';

const ADD_COMMON_CODE = 'ADD_COMMON_CODE';

export const addCommonCode = createAction(ADD_COMMON_CODE, (newCombo) => {
  return newCombo;
});

const initialState = {
  storedCommonCode: {},
};

export default handleActions(
  {
    [ADD_COMMON_CODE]: (state, { payload }) => ({
      ...state,
      storedCommonCode: Object.assign(state.storedCommonCode, payload),
    }),
  },
  initialState,
);
