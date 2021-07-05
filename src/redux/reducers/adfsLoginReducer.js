import * as types from "../constants";

const initialState = {
  authErrorMsg: "",
  passToAuthProxy: "",
  passToAuthProxySecurityKey: "",
  passToCTBC: ""
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.ADFS_LOGIN_STATUS_SEND_TO_AUTHPROXY_INIT:
      return {
        ...state,
        authErrorMsg: "",
        passToAuthProxy: "",
        passToAuthProxySecurityKey: ""
      };

    case types.ADFS_LOGIN_STATUS_SEND_TO_AUTHPROXY_SUCCESS:
      return {
        ...state,
        passToAuthProxy: true,
        passToAuthProxySecurityKey: actions.passToAuthProxySecurityKey
      };

    case types.ADFS_LOGIN_STATUS_SEND_AUTHPROXY_FAIL:
      return {
        ...state,
        passToAuthProxy: false,
        passToAuthProxySecurityKey: "",
        authErrorMsg: actions.authErrorMsg
      };

    case types.ADFS_LOGIN_STATUS_RESPONSE_TO_CTBC_STATUS_INIT:
      return {
        ...state,
        passToCTBC: "",
        authErrorMsg: ""
      };

    case types.ADFS_LOGIN_STATUS_RESPONSE_TO_CTBC_SUCCESS:
      return {
        ...state,
        passToCTBC: true,
        authErrorMsg: ""
      };

    case types.ADFS_LOGIN_STATUS_RESPONSE_TO_CTBC_FAIL:
      return {
        ...state,
        passToCTBC: false,
        authErrorMsg: actions.authErrorMsg
      };

    default:
      return state;
  }
}
