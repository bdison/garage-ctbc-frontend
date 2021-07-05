import Superagent from "superagent";
import * as types from "../constants";
import * as Setup from "../../utility/common";

const UCC_GET_CUSTOMER_TRADITIONAL_BIZ_FQDN = Setup.connectSteam("getucccustomerlist/AllListTraditionalBiz");
const UCC_GET_CUSTOMER_MSP_BIZ_FQDN = Setup.connectSteam("getucccustomerlist/AllListMSP");
const CTBC_API_TIMEOUT = Setup.apiTimeout();

export const initAllCustomerData = () => {
    return {
        type: types.PARTNER_DETAIL_STATUS_INIT
    };
};

export const getAllCustomerTMBizData = () => {
    return (dispatch) => {

        const apiResult = [
            {
                "CustomerName": "End Customer Inc.",
                "ExpirationDate": "2020-02-09",
                "LastOrderDate": "2020-02-04",
                "UpgradeOpptySignal": 1,
                "SaaSPotentialSignal": 0,
                "ExpiringOrderSignal": 1,
                "LostOrderSignal": 1,
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test5",
                "ExpirationDate": "2020-03-24",
                "LastOrderDate": "2020-02-11",
                "UpgradeOpptySignal": 0,
                "SaaSPotentialSignal": 0,
                "ExpiringOrderSignal": 1,
                "LostOrderSignal": 1,
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test4",
                "ExpirationDate": "2020-03-24",
                "LastOrderDate": "2020-02-11",
                "UpgradeOpptySignal": 0,
                "SaaSPotentialSignal": 0,
                "ExpiringOrderSignal": 1,
                "LostOrderSignal": 1,
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test3",
                "ExpirationDate": "2020-03-24",
                "LastOrderDate": "2020-02-11",
                "UpgradeOpptySignal": 0,
                "SaaSPotentialSignal": 0,
                "ExpiringOrderSignal": 1,
                "LostOrderSignal": 1,
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test2",
                "ExpirationDate": "2020-03-24",
                "LastOrderDate": "2020-02-11",
                "UpgradeOpptySignal": 0,
                "SaaSPotentialSignal": 0,
                "ExpiringOrderSignal": 1,
                "LostOrderSignal": 1,
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test1",
                "ExpirationDate": "2020-03-24",
                "LastOrderDate": "2020-02-11",
                "UpgradeOpptySignal": 0,
                "SaaSPotentialSignal": 0,
                "ExpiringOrderSignal": 1,
                "LostOrderSignal": 1,
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test12",
                "ExpirationDate": "2020-03-24",
                "LastOrderDate": "2020-02-11",
                "UpgradeOpptySignal": 0,
                "SaaSPotentialSignal": 0,
                "ExpiringOrderSignal": 1,
                "LostOrderSignal": 1,
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test13",
                "ExpirationDate": "2020-03-24",
                "LastOrderDate": "2020-02-11",
                "UpgradeOpptySignal": 0,
                "SaaSPotentialSignal": 0,
                "ExpiringOrderSignal": 1,
                "LostOrderSignal": 1,
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test14",
                "ExpirationDate": "2020-03-24",
                "LastOrderDate": "2020-02-11",
                "UpgradeOpptySignal": 0,
                "SaaSPotentialSignal": 0,
                "ExpiringOrderSignal": 1,
                "LostOrderSignal": 1,
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test15",
                "ExpirationDate": "2020-03-24",
                "LastOrderDate": "2020-02-11",
                "UpgradeOpptySignal": 0,
                "SaaSPotentialSignal": 0,
                "ExpiringOrderSignal": 1,
                "LostOrderSignal": 1,
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test16",
                "ExpirationDate": "2020-03-24",
                "LastOrderDate": "2020-02-11",
                "UpgradeOpptySignal": 0,
                "SaaSPotentialSignal": 0,
                "ExpiringOrderSignal": 1,
                "LostOrderSignal": 1,
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test17",
                "ExpirationDate": "2020-03-24",
                "LastOrderDate": "2020-02-11",
                "UpgradeOpptySignal": 0,
                "SaaSPotentialSignal": 0,
                "ExpiringOrderSignal": 1,
                "LostOrderSignal": 1,
                "DataLastModifyTime": "2020-02-10 03:25:45"
            }
        ];

        dispatch({
            type: types.CUSTOMER_TM_STATUS_SUCCESS,
            apiResult
        });
    };
};

export const getAllCustomerMSPBizData = () => {
    return (dispatch) => {

        const apiResult = 
        [
            {
                "CustomerName": "End Customer Inc.",
                "SeatIncreaseSignal": 1,
                "SeatDecreaseSignal": 0,
                "ProductList": [
                    {
                        "Name": "WFBSS Advanced",
                        "Type": "Suite",
                        "ProvisionedUnit": 294,
                        "UsedUnit": 197,
                        "UsedUnitMoM": 0.100
                    }
                ],
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test",
                "SeatIncreaseSignal": 1,
                "SeatDecreaseSignal": 1,
                "ProductList": [
                    {
                        "Name": "WFBSS Advanced",
                        "Type": "Suite",
                        "ProvisionedUnit": 294,
                        "UsedUnit": 197,
                        "UsedUnitMoM": 0.100
                    },
                    {
                        "Name": "YOYOYO Product",
                        "Type": "Suite",
                        "ProvisionedUnit": 10,
                        "UsedUnit": 2,
                        "UsedUnitMoM": 0.300
                    }
                ],
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test no product",
                "SeatIncreaseSignal": 0,
                "SeatDecreaseSignal": 0,
                "ProductList": [
                ],
                "DataLastModifyTime": "2020-02-10 03:25:45"
            },
            {
                "CustomerName": "Darren Test no product 11",
                "SeatIncreaseSignal": 0,
                "SeatDecreaseSignal": 0,
                "ProductList": [
                ],
                "DataLastModifyTime": "2020-02-10 03:25:45"
            }
        ];

        dispatch({
            type: types.CUSTOMER_MSP_STATUS_SUCCESS,
            apiResult
        });
    };
};

const errorhandling = (dispatch, cookieProps, errMessage, pathName) => {
    Setup.logoutEvent(cookieProps);
    if (pathName !== "/") {
        Setup.notificationMessage("warning", "Notification", "Token Expired");
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

export const getAllCustomerTMBizDataAPI = (headerObj, cookieProps, pathName) => {
    return (dispatch) => {
        Superagent
            .get(UCC_GET_CUSTOMER_TRADITIONAL_BIZ_FQDN)
            .set(headerObj)
            .ok(() => true)
            .timeout(CTBC_API_TIMEOUT)
            .then(res => {
                switch (res.status) {
                    case 200: {
                        try {
                            let apiResult = JSON.parse(res.body.result);
                            // console.log("apiResult:", JSON.stringify(apiResult));

                            dispatch({
                                type: types.PARTNER_DETAIL_STATUS_SUCCESS,
                                apiResult
                            });

                        } catch (e) {
                            dispatch({
                                type: types.CUSTOMER_TM_STATUS_ERROR
                            });
                        }

                        break;
                    }
                    case 401: {
                        errorhandling(dispatch, cookieProps, res.body.result, pathName);
                        break;
                    }
                    default:
                        dispatch({
                            type: types.CUSTOMER_TM_STATUS_ERROR
                        });
                        break;
                }
            })
            .catch(err => {
                dispatch({
                    type: types.CUSTOMER_TM_STATUS_ERROR,
                    err
                });
            });
    };
};

export const getAllCustomerMSPBizDataAPI = (headerObj, cookieProps, pathName) => {
    return (dispatch) => {
        Superagent
            .get(UCC_GET_CUSTOMER_MSP_BIZ_FQDN)
            .set(headerObj)
            .ok(() => true)
            .timeout(CTBC_API_TIMEOUT)
            .then(res => {
                switch (res.status) {
                    case 200: {
                        try {
                            let apiResult = JSON.parse(res.body.result);
                            // console.log("apiResult:", JSON.stringify(apiResult));

                            dispatch({
                                type: types.CUSTOMER_MSP_STATUS_SUCCESS,
                                apiResult
                            });

                        } catch (e) {
                            dispatch({
                                type: types.CUSTOMER_MSP_STATUS_ERROR
                            });
                        }

                        break;
                    }
                    case 401: {
                        errorhandling(dispatch, cookieProps, res.body.result, pathName);
                        break;
                    }
                    default:
                        dispatch({
                            type: types.CUSTOMER_MSP_STATUS_ERROR
                        });
                        break;
                }
            })
            .catch(err => {
                dispatch({
                    type: types.CUSTOMER_MSP_STATUS_ERROR,
                    err
                });
            });
    };
};