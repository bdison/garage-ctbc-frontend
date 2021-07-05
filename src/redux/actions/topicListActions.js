import * as types from "../constants";
import * as Setup from "../../utility/common";
import Superagent from "superagent";
import {  apiTimeout, logoutEvent, notificationMessage } from "../../utility/common";

const CTBC_API_TIMEOUT = apiTimeout();

const errorhandling = (errMessage, pathName,cookieProps,dispatch) => {
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

export const initTopicListData = () => {
  return {
    type: types.TOPIC_LIST_INIT
  };
};
export const mockTopicListData = (columnType) => {
  return (dispatch) => {
    
    let apiResult = [];
    if(columnType === "1"){
      apiResult =[
        {
          "SerialId": 243,
          "CustomerId": "CUSTA060999",
          "CustomerName": "Congregation or Veshalom, Inc.",
          "CustomerCSN": "763422",
          "LastOrderDate": "2019-04-08",
          "ProductName": "CSSBWWM9O",
          "ExpirationDate": "2020-04-15",
          "TotalRenewableSeat": 10,
          "LastRenewType": "On-time Renew",
          "DataLastModifyTime": "2020-03-19 08:42:26"
        },
        {
          "SerialId": 113,
          "CustomerId": "CUSTA060999",
          "CustomerName": "Congregation or Veshalom, Inc.",
          "CustomerCSN": "763422",
          "LastOrderDate": "2019-04-08",
          "ProductName": "CSSBWWM9X",
          "ExpirationDate": "2020-04-15",
          "TotalRenewableSeat": 10,
          "LastRenewType": "On-time Renew",
          "DataLastModifyTime": "2020-03-19 08:42:26"
        },
        {
          "SerialId": 231,
          "CustomerId": "CUSTA061649",
          "CustomerName": "Holiday Connections Inc",
          "CustomerCSN": "764072",
          "LastOrderDate": "2019-06-20",
          "ProductName": "WFSBWXE3X",
          "ExpirationDate": "2020-06-16",
          "TotalRenewableSeat": 10,
          "LastRenewType": "On-time Renew",
          "DataLastModifyTime": "2020-03-19 08:42:26"
        }
      ];
    }
    if(columnType === "2"){
      apiResult = [
        {
          "SerialId": 4556,
          "CustomerId":"CUSTA061649",
          "CustomerName": "End Customer Inc.",
          "ProductName":"WFBSS Advanced",
          "Type":"Suite",
          "ProvisionedUnit":294,
          "UsedUnit":197,
          "UsedUnitMoM":0.100,
          "DataLastModifyTime": "2020-02-10 03:25:45"
        },
        {
          "SerialId": 4526,
          "CustomerId":"CUSTA061649",
          "CustomerName": "End Customer Inc.",
          "ProductName":"WFBSS Standard",
          "Type":"Suite",
          "ProvisionedUnit":294,
          "UsedUnit":197,
          "UsedUnitMoM":0.100,
          "DataLastModifyTime": "2020-02-10 03:25:45"
        }
      ];
    }
    setTimeout(()=>dispatch({
      type:types.TOPIC_LIST_SUCCESS,
      apiResult
    }),1500);
  };
};
export const getTopicListData = (apiDomain, cookieProps, pathName)=>{
  return (dispatch) =>{
    Superagent
      .get(apiDomain)
      .set(Setup.getRequestHeader(cookieProps))
      .ok(() => true)
      .timeout(CTBC_API_TIMEOUT)
      .then(res => {
        switch(res.status){
          case 200: {
            let apiResult = [];
            if(res.body.result !== null){
              apiResult = JSON.parse(res.body.result);
            }
            dispatch({
              type:types.TOPIC_LIST_SUCCESS,
              apiResult
            });
            break;
          }
          case 401: {
            errorhandling(res.body.result, pathName,cookieProps,dispatch);
            break;
          }
          default:
            dispatch({type:types.TOPIC_LIST_ERROR});
        }
      }).catch(err => dispatch({type:types.TOPIC_LIST_ERROR, err}));
  };
};