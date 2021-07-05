import * as types from "../constants";
const initialState = {
  isLoaded: false,
  isSignedIn: null,
  authErrMsg: null,
  locationPathName: null
};

const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.AUTH_INIT:
      return {
        ...state,
        isLoaded: false,
        isSignedIn: null,
        authErrMsg: null,
        locationPathName: null
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isSignedIn: true,
        locationPathName: actions.pathName
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        isLoaded: true,
        isSignedIn: false,
        authErrMsg: actions.payload.errMessage,
        locationPathName: actions.payload.pathName
      };
    default:
      return state;
  }
};
export default authReducer;