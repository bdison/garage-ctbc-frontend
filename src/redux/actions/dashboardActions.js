import * as types from "../constants";
import Superagent from "superagent";
import * as Setup from "../../utility/common";

const CTBC_API_TIMEOUT = Setup.apiTimeout();

export const initDashboardData = () => {
  return {
    type: types.DASHBOARD_STATUS_INIT
  };
};

const parseStringToObject = (stringArray) => {
  return JSON.parse(stringArray);
};

const errorhandling = (errMessage, pathName, cookieProps, dispatch) => {
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

export const getDashboardData = (apiDomain, cookieProps, pathName) => {
// export const getDashboardData = () => {
  return (dispatch) => {
    Superagent
      .post(apiDomain)
      .set(Setup.getRequestHeader(cookieProps))
      .send('{"target":"three_mounth_predict"}')
      .ok(() => true)
      .timeout(CTBC_API_TIMEOUT)
      .then(res => {
        switch (res.status) {
          case 200: {
            console.log(res.body.data.output)
            const RevenueCustomerData = parseStringToObject(res.body.data);
            const TierData = { "CurrentlyGauge": { "CurrentTier": "Silver", "NextTier": "Gold", "OverallRate": 0.030, "NewRevenueLeft": 590500, "TotalRevenueLeft": 208260 }, "AttainmentGauge": [ { "Subject": "New", "RetainGoal": 20000, "UpgradeGoal": 100000, "AttainmentRate": 0.160, "RevenueYoYRate": 2.000, "RevenueValue": 40500 }, { "Subject": "Renewal", "RetainGoal": 20000, "UpgradeGoal": null, "AttainmentRate": 0.510, "RevenueYoYRate": -0.300, "RevenueValue": 1540 }, { "Subject": "Total", "RetainGoal": 50000, "UpgradeGoal": 250000, "AttainmentRate": 0.160, "RevenueYoYRate": 2.000, "RevenueValue": 41500 } ] };
            const ListCounterData = { "NewRevenueField": [ { "Key": "UpgradeOppty", "Title": "Upgrade Oppty", "SubTitle": "upgrade", "Count": 45 }, { "Key": "SaaSPotential", "Title": "SaaS Potential", "SubTitle": "start SaaS", "Count": 7 } ], "RenewalRevenueField": [ { "Key": "ExpiringOrder", "Title": "Expiring Order", "SubTitle": "renew", "Count": 59 }, { "Key": "LostOrder", "Title": "Lost Order", "SubTitle": "remedy", "Count": 3 } ], "MSPRevenueField": [ { "Key": "SeatIncrease", "Title": "Seat Increase", "SubTitle": "add seats", "Count": 5 }, { "Key": "SeatDecrease", "Title": "Seat Decrease", "SubTitle": "reduce loss", "Count": 0 } ] };
            const ProfileData = { "Id": "4e4142552d55532d313635373739", "PartnerName": "AAAA Company Inc.", "PartnerType": "Hybrid", "ContactName": "Sales Team", "ContactEmail": "salesteam@.com", "ContactNumber": "1-888-977-4200" };
            // const TierData = parseStringToObject(res.body.result.TierData);
            // const ListCounterData = parseStringToObject(res.body.result.ListCounterData);
            // const ProfileData = parseStringToObject(res.body.result.ProfileData);
            const apiResult = {RevenueCustomerData, TierData, ListCounterData, ProfileData};
            dispatch({
              type: types.DASHBOARD_STATUS_SUCCESS,
              apiResult
            });
            break;
          }
          case 401: {
            errorhandling(res.body.result, pathName, cookieProps, dispatch);
            break;
          }
          default:
            dispatch({
              type: types.DASHBOARD_STATUS_ERROR
            });
            break;
        }
      })
      .catch(err => {
        dispatch({
          type: types.DASHBOARD_STATUS_ERROR,
          err
        });
      });

    const fakeResponse = {
      "ProfileData": {
        "Id": "4e4142552d55532d313635373739",
        "PartnerName": "AAAA Company Inc.",
        "PartnerType": "Hybrid",
        "ContactName": "Sales Team",
        "ContactEmail": "salesteam@ibm.com",
        "ContactNumber": "1-888-977-4200"
      },
      "TierData": {
        "CurrentlyGauge": {
          "CurrentTier": "Silver",
          "NextTier": "Gold",
          "OverallRate": 0.030,
          "NewRevenueLeft": 590500,
          "TotalRevenueLeft": 208260
        },
        "AttainmentGauge": [
          {
            "Subject": "New",
            "RetainGoal": 20000,
            "UpgradeGoal": 100000,
            "AttainmentRate": 0.160,
            "RevenueYoYRate": 2.000,
            "RevenueValue": 40500
          },
          {
            "Subject": "Renewal",
            "RetainGoal": 20000,
            "UpgradeGoal": null,
            "AttainmentRate": 0.510,
            "RevenueYoYRate": -0.300,
            "RevenueValue": 1540
          },
          {
            "Subject": "Total",
            "RetainGoal": 50000,
            "UpgradeGoal": 250000,
            "AttainmentRate": 0.160,
            "RevenueYoYRate": 2.000,
            "RevenueValue": 41500
          }
        ]
      },
      "ListCounterData": {
        "NewRevenueField": [
          {
            "Key": "UpgradeOppty",
            "Title": "Upgrade Oppty",
            "SubTitle": "upgrade",
            "Count": 45
          },
          {
            "Key": "SaaSPotential",
            "Title": "SaaS Potential",
            "SubTitle": "start SaaS",
            "Count": 7
          }
        ],
        "RenewalRevenueField": [
          {
            "Key": "ExpiringOrder",
            "Title": "Expiring Order",
            "SubTitle": "renew",
            "Count": 59
          },
          {
            "Key": "LostOrder",
            "Title": "Lost Order",
            "SubTitle": "remedy",
            "Count": 3
          }
        ],
        "MSPRevenueField": [
          {
            "Key": "SeatIncrease",
            "Title": "Seat Increase",
            "SubTitle": "add seats",
            "Count": 5
          },
          {
            "Key": "SeatDecrease",
            "Title": "Seat Decrease",
            "SubTitle": "reduce loss",
            "Count": 0
          }
        ]
      },
      "RevenueCustomerData": {
        "RunChartDataSet": {
          "TimeLabel": [
            "2018.02",
            "2018.03",
            "2018.04",
            "2018.05",
            "2018.06",
            "2018.07",
            "2018.08",
            "2018.09",
            "2018.10",
            "2018.11",
            "2018.12",
            "2019.01",
            "2019.02",
            "2019.03",
            "2019.04",
            "2019.05",
            "2019.06",
            "2019.07",
            "2019.08",
            "2019.09",
            "2019.10",
            "2019.11",
            "2019.12",
            "2020.01"
          ],
          "ResellerRevenue": [
            3001045,
            2622372,
            1619003,
            3170438,
            3006111,
            2793712,
            1885925,
            2953607,
            2123824,
            3960489,
            3226305,
            2464289,
            1779940,
            2766691,
            1807926,
            2596738,
            3513814,
            2962317,
            2131076,
            3618346,
            3144047,
            2051226,
            3064615,
            1888001
          ],
          "MSPRevenue": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "ResellerCustomer": [
            640,
            661,
            517,
            628,
            603,
            515,
            500,
            509,
            578,
            434,
            465,
            580,
            477,
            509,
            496,
            502,
            481,
            466,
            452,
            484,
            475,
            411,
            400,
            435
          ],
          "MSPCustomer": [
            12,
            30,
            0,
            23,
            25,
            9,
            11,
            0,
            23,
            0,
            0,
            33,
            14,
            2,
            245,
            2,
            0,
            14,
            23,
            55,
            0,
            78,
            56,
            49
          ]
        },
        "PercentageRateDiff": {
          "ResellerRevenuePercentage": 0.3,
          "MSPRevenuePercentage": 0.7,
          "ResellerCustomerPercentage": 1,
          "MSPCustomerPercentage": 0
        }
      }
    };

    dispatch({
      type: types.DASHBOARD_STATUS_SUCCESS,
      apiResult: fakeResponse
    });

  };
};
