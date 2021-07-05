import Superagent from "superagent";
import * as types from "../constants";
import { connectSteam, apiTimeout, logoutEvent, notificationMessage, routePathDetailConverter } from "../../utility/common";

const CTBC_API_TIMEOUT = apiTimeout();

export const getPanesListApiDomainGenerator = (paneIndexKey) => {
  return connectSteam("getpartnerlist/All-" + routePathDetailConverter(paneIndexKey).key);
};
export const getPaneCounterDataApiDomainGenerator = (paneIndexKey) => {
  return connectSteam("getpartnerlist/" + routePathDetailConverter(paneIndexKey).key) + "-count";
};

export const initPanesData = () => {
  return {
    type: types.PANE_STATUS_INIT
  };
};

export const getPanesData = (apiDomain, headerObj, cookieProps, pathName) => {
  return (dispatch) => {
    const errorhandling = (errMessage, pathName) => {
      logoutEvent(cookieProps);
      if (pathName !== "/") {
        notificationMessage("warning", "Notification", "Token Expired");
        dispatch({
          type: types.AUTH_ERROR,
          payload: { pathName, errMessage }
        });
      } else if (pathName === "/") {
        dispatch({
          type: types.AUTH_ERROR,
          payload: { pathName, errMessage }
        });
      }
    };

    Superagent
      .get(apiDomain)
      .set(headerObj)
      .ok(() => true)
      .timeout(CTBC_API_TIMEOUT)
      .then(res => {
        switch (res.status) {
          case 200: {
            let apiResult = res.body.result;
            if (apiResult !== null) {
              apiResult = JSON.parse(apiResult);
            } else {
              apiResult = [];
            }

            dispatch({
              type: types.PANE_STATUS_SUCCESS,
              apiResult
            });
            break;
          }
          case 401: {
            errorhandling(res.body.result, pathName);
            break;
          }
          default:
            dispatch({
              type: types.PANE_STATUS_ERROR
            });
            break;
        }
      })
      .catch(err => {
        dispatch({
          type: types.PANE_STATUS_ERROR,
          err
        });
      });
  };
};

export const getPaneCounterData = (apiDomain, headerObj, cookieProps, pathName) => {
  return (dispatch) => {

    const errorhandling = (errMessage, pathName) => {
      logoutEvent(cookieProps);
      if (pathName !== "/") {
        notificationMessage("warning", "Notification", "Token Expired");
        dispatch({
          type: types.AUTH_ERROR,
          payload: { pathName, errMessage }
        });
      } else if (pathName === "/") {
        dispatch({
          type: types.AUTH_ERROR,
          payload: { pathName, errMessage }
        });
      }
    };

    Superagent
      .get(apiDomain)
      .set(headerObj)
      .ok(() => true)
      .timeout(CTBC_API_TIMEOUT)
      .then(res => {
        switch (res.status) {
          case 200: {
            let apiResult = res.body.result;
            if (apiResult !== null) {
              apiResult = JSON.parse(apiResult)[0];
            } else {
              apiResult = [];
            }
            dispatch({
              type: types.PANE_COUNTER_STATUS_SUCCESS,
              apiResult
            });
            break;
          }
          case 401: {
            errorhandling(res.body.result, pathName);
            break;
          }
          default:
            dispatch({
              type: types.PANE_COUNTER_STATUS_ERROR
            });
            break;
        }
      })
      .catch(err => {
        dispatch({
          type: types.PANE_COUNTER_STATUS_ERROR,
          err
        });
      });
  };
};