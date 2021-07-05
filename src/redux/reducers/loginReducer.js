import * as types from "../constants";

const initialState = {
  inputStatus: null,
  isBtnLoading: false,
  authErrorMsg: ""
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.LOGIN_STATUS_INIT:
      return {
        ...state,
        inputStatus: null
      };
    case types.LOGIN_STATUS_PENDING:
      return {
        ...state,
        isBtnLoading: true
      };
    case types.LOGIN_STATUS_ERROR:
      return {
        ...state,
        inputStatus: "has-danger",
        isBtnLoading: false,
        authErrorMsg: actions.authErrorMsg
      };
    case types.LOGIN_STATUS_SUCCESS:
      return {
        ...state,
        inputStatus: "has-success",
        isBtnLoading: false
      };
    default:
      return state;
  }
}
