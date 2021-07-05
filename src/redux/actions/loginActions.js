import Superagent from "superagent";
import * as types from "../constants";
import * as Setup from "../../utility/common";
const CTBC_AUTH_FQDN = Setup.connectSteam("authlogin");
const CTBC_API_TIMEOUT = Setup.apiTimeout();

export const switchInputStatus = (status) => {
  return (dispatch, getState) => {
    switch (status) {
      case "has-success":
        dispatch({ type: types.LOGIN_STATUS_SUCCESS });
        break;
      case "has-danger":
        dispatch({ type: types.LOGIN_STATUS_ERROR });
        break;
      default:
        if (getState().auth.inputStatus !== null) {
          dispatch({ type: types.LOGIN_STATUS_INIT });
        } else {
          return;
        }
        break;
    }
  };
};

export const signInLoading = () => {
  return {
    type: types.LOGIN_STATUS_PENDING
  };
};

export const signInSubmit = (credential, cookiesProps, cookieObj) => {
  return (dispatch) => {
    const statusCode = 200;
    if (statusCode === 200) {
      const isSecure = Setup.getSecureCookieSetting();
      const token = "token";
      const traceid = "traceid";
      const { postAccount, postRememberMe } = cookieObj;
      const pathName = "/";
      cookiesProps.set("token", token, { path: "/", secure: isSecure });
      cookiesProps.set("traceid", traceid, { path: "/", secure: isSecure });
      cookiesProps.set("rememberme", postRememberMe, { path: "/", secure: isSecure });
      cookiesProps.set("username", postAccount, { path: "/", secure: isSecure });

      Setup.notificationMessage("success", "Notification", "Login Success");
      dispatch({ type: types.LOGIN_STATUS_SUCCESS });
      dispatch({ type: types.AUTH_SUCCESS, pathName });
    } else if (statusCode === 401) {
      dispatch({
        type: types.LOGIN_STATUS_ERROR,
        authErrorMsg: "The credential invalid, Please check your account / password."
      });
    } else {
      dispatch({
        type: types.LOGIN_STATUS_ERROR,
        authErrorMsg: "[API Timeout] Due to Network issue, sometimes account verification function will happen timeout, please help to try again, Sorry for the inconvenience."
      });
    }
  };
};

export const old_signInSubmit = (credential, cookiesProps, cookieObj) => {
  return (dispatch) => {
    const apiBody = credential;
    Superagent
      .post(CTBC_AUTH_FQDN)
      .send(apiBody)
      .ok(() => true)
      .timeout(CTBC_API_TIMEOUT)
      .then(res => {
        if (res.statusCode === 200) {
          const isSecure = Setup.getSecureCookieSetting();
          const token = res.body.token;
          const traceid = res.body.traceid;
          const { postAccount, postRememberMe } = cookieObj;
          const pathName = "/";
          cookiesProps.set("token", token, { path: "/", secure: isSecure });
          cookiesProps.set("traceid", traceid, { path: "/", secure: isSecure });
          cookiesProps.set("rememberme", postRememberMe, { path: "/", secure: isSecure });
          cookiesProps.set("username", postAccount, { path: "/", secure: isSecure });

          Setup.notificationMessage("success", "Notification", "Login Success");
          dispatch({ type: types.LOGIN_STATUS_SUCCESS });
          dispatch({ type: types.AUTH_SUCCESS, pathName });
        } else if (res.statusCode === 401) {
          dispatch({
            type: types.LOGIN_STATUS_ERROR,
            authErrorMsg: "The credential invalid, Please check your account / password."
          });
        } else {
          dispatch({
            type: types.LOGIN_STATUS_ERROR,
            authErrorMsg: "[API Timeout] Due to Network issue, sometimes account verification function will happen timeout, please help to try again, Sorry for the inconvenience."
          });
        }
      })
      .catch(err => {
        dispatch({
          type: types.LOGIN_STATUS_ERROR,
          authErrorMsg: "[API Timeout] Due to Network issue, sometimes account verification will happen timeout, please help to try again, Sorry for the inconvenience.",
          err
        });
      });
  };
};