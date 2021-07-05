import * as Setup from "../../utility/common";
import * as types from "../constants";
import { getDataSourceRegion } from "./dataSourceActions";

export const checkSignInToken = (cookieProps, pathName) => {
  return (dispatch) => {
    const errorhandling = (errMessage, pathName) => {
      Setup.logoutEvent(cookieProps);

      switch (pathName) {
        case "/":
        case "/AuthHandling":
        case "/ResponseHandling":
          dispatch({
            type: types.AUTH_ERROR,
            payload: { pathName, errMessage }
          });
          break;

        default:
          Setup.notificationMessage("warning", "Notification", "Token Expired");
          dispatch({
            type: types.AUTH_ERROR,
            payload: { pathName, errMessage }
          });
      }
    };
    const token = cookieProps.get("token");
    if (token) {
      dispatch({ type: types.AUTH_SUCCESS, pathName });
      dispatch(getDataSourceRegion("NABU"));
    } else {
      errorhandling("The token is missing", pathName);
    }
    
  };
};

export const initAuthReducer = () => {
  return (dispatch) => {
    dispatch({ type: types.AUTH_INIT });
  };
};