import Superagent from "superagent";
import * as types from "../constants";
import * as Setup from "../../utility/common";

const CTBC_GET_PARTNER_DETAIL_FQDN = Setup.connectSteam("getpartnerdetail/");
const CTBC_API_TIMEOUT = Setup.apiTimeout();

export const initPartnerDetailData = () => {
    return {
        type:types.PARTNER_DETAIL_STATUS_INIT
    };
};

export const getPartnerDetailData = (headerObj, cookieProps, pathName, searchID) => {
    return (dispatch) => {
        const errorhandling = (errMessage, pathName) => {
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

        Superagent
            .get(CTBC_GET_PARTNER_DETAIL_FQDN + searchID)
            .set(headerObj)
            .ok(() => true)
            .timeout(CTBC_API_TIMEOUT)
            .then(res => {
                switch (res.status) {
                    case 200: {
                        try {
                            let apiResult = JSON.parse(res.body.result);
                            // Data source region
                            let dataSourceRegion = apiResult[0].dataSourceRegion;
                            
                            // Partnerinfo component
                            let profileData = apiResult[0].profileData;

                            // Historical component
                            let tmHistoricalData = apiResult[0].historicalData.tmHistoricalClass;
                            let mspHistoricalData = apiResult[0].historicalData.xspHistoricalClass;

                            // Mileage component
                            let mileageData = apiResult[0].mileageData;

                            // Support component
                            let supportCaseData = apiResult[0].supportCaseData;

                            // MSP License Profile component
                            let mspLicenseProfileData = apiResult[0].xspLicenseProfileData;

                            // Mask component
                            let newPartnerMask = apiResult[0].IsNewPartner === "Y" ? true : false;

                            // Contact Status
                            let contactStatus = apiResult[0].ContactStatus;

                            // AlertCard component
                            let annotationData = apiResult[0].alertCardData;

                            // Radar component
                            let radarData = apiResult[0].radarData;

                            // Cross-sell component
                            let crossSellData = apiResult[0].crossSellData;

                            // Product Predict component
                            let productPredictData = apiResult[0].productPredictData;

                            // Revenue Seats component
                            let revenueSeatsData = apiResult[0].revenueSeatsData;

                            // Highligh component
                            let highlightData = apiResult[0].highlightData;

                            // StatusLight component
                            let statusLight = apiResult[0].statusLightSetData;

                            // specialization component
                            let specializationData = apiResult[0].specializationData;

                            dispatch({
                                type: types.PARTNER_DETAIL_STATUS_SUCCESS,
                                dataSourceRegion:dataSourceRegion,
                                profileData: profileData,
                                tmHistoricalData: tmHistoricalData,
                                mspHistoricalData: mspHistoricalData,
                                mileageData: mileageData,
                                supportCaseData: supportCaseData,
                                newPartnerMask: newPartnerMask,
                                contactStatus: contactStatus,
                                annotationData: annotationData,
                                radarData: radarData,
                                crossSellData: crossSellData,
                                productPredictData: productPredictData,
                                revenueSeatsData: revenueSeatsData,
                                highlightData: highlightData,
                                mspLicenseProfileData: mspLicenseProfileData,
                                statusLight: statusLight,
                                specializationData: specializationData
                            });

                        } catch (e) {
                            dispatch({
                                type: types.PARTNER_DETAIL_HAS_WRONG_SEARCHID
                            });
                        }

                        break;
                    }
                    case 401: {
                        errorhandling(res.body.result, pathName);
                        break;
                    }
                    default:
                        dispatch({
                            type: types.PARTNER_DETAIL_STATUS_ERROR
                        });
                        break;
                }
            })
            .catch(err => {
                dispatch({
                    type: types.PARTNER_DETAIL_STATUS_ERROR,
                    err
                });
            });
    };
};