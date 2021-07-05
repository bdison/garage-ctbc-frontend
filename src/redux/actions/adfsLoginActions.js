import Superagent from "superagent";
import * as types from "../constants";
import * as Setup from "../../utility/common";

export const initAuthStatus = () => {
  return (dispatch) => {
    dispatch({ type: types.ADFS_LOGIN_STATUS_SEND_TO_AUTHPROXY_INIT });
  };
};

export const initResponseAuthStatus = () => {
  return (dispatch) => {
    dispatch({ type: types.ADFS_LOGIN_STATUS_RESPONSE_TO_CTBC_STATUS_INIT });
  };
};


export const checkSecurityKey = () => {
  return (dispatch) => {
    const CTBC_CREATE_SECURITY_KEY_FQDN = Setup.connectSteam("grantsecuritykey");
    const CTBC_API_TIMEOUT = Setup.apiTimeout();

    Superagent
      .get(CTBC_CREATE_SECURITY_KEY_FQDN)
      .ok(() => true)
      .timeout(CTBC_API_TIMEOUT)
      .then(res => {
        if (res.statusCode === 200) {
          dispatch({
            type: types.ADFS_LOGIN_STATUS_SEND_TO_AUTHPROXY_SUCCESS,
            passToAuthProxySecurityKey: res.body.securitykey
          });
        } else {
          dispatch({
            type: types.ADFS_LOGIN_STATUS_SEND_AUTHPROXY_FAIL,
            authErrorMsg: "[Error] Permission Denied."
          });
        }
      })
      .catch(() => {
        dispatch({
          type: types.ADFS_LOGIN_STATUS_SEND_AUTHPROXY_FAIL,
          authErrorMsg: "[API Timeout] Due to Network issue, sometimes account verification will happen timeout, please help to try again, Sorry for the inconvenience."
        });
      });
  };
};


export const callApiForAuthCheck = (cookiesProps, cookiesObj) => {
  return (dispatch) => {
    const CTBC_ADFS_LOGIN_FQDN = Setup.connectSteam("adfslogin");
    const CTBC_API_TIMEOUT = Setup.apiTimeout();

    const body = {
      authresponse: cookiesObj.authResponse
    };

    Superagent
      .post(CTBC_ADFS_LOGIN_FQDN)
      .set("authsecuritykey", cookiesObj.authSecurityKey)
      .send(body)
      .ok(() => true)
      .timeout(CTBC_API_TIMEOUT)
      .then(res => {
        if (res.statusCode === 200) {
          const isSecure = Setup.getSecureCookieSetting();
          const token = res.body.token;
          const traceid = res.body.traceid;
          let domainName = res.body.username.split("\\");
          const regionDomain = domainName[0];
          const username = domainName[1];
          const displayname = res.body.displayname;

          cookiesProps.set("token", token, { path: "/", secure: isSecure });
          cookiesProps.set("traceid", traceid, { path: "/", secure: isSecure });
          cookiesProps.set("regionDomain", regionDomain, { path: "/", secure: isSecure });
          cookiesProps.set("username", username, { path: "/", secure: isSecure });
          cookiesProps.set("displayname", displayname, { path: "/", secure: isSecure });

          dispatch({
            type: types.ADFS_LOGIN_STATUS_RESPONSE_TO_CTBC_SUCCESS
          });

          Setup.notificationMessage("success", "Notification", "Login Success");

        } else {
          dispatch({
            type: types.ADFS_LOGIN_STATUS_RESPONSE_TO_CTBC_FAIL,
            authErrorMsg: "[Error] Permission Denied."
          });
        }
      })
      .catch(() => {
        dispatch({
          type: types.ADFS_LOGIN_STATUS_RESPONSE_TO_CTBC_FAIL,
          authErrorMsg: "[API Timeout] Due to Network issue, sometimes account verification will happen timeout, please help to try again, Sorry for the inconvenience."
        });
      });
  };
};