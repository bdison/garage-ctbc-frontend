import * as types from "../constants";

const initialState = {
  uccDashboard: {
    ProfileData: {},
    TierData: {
      CurrentlyGauge: {
        CurrentTier: null,
        NextTier: null,
        OverallRate: null,
        NewRevenueLeft: null,
        TotalRevenueLeft: null
      },
      AttainmentGauge: [
        {
          Subject: "New",
          RetainGoal: null,
          UpgradeGoal: null,
          AttainmentRate: null,
          RevenueYoYRate: null,
          RevenueValue: null
        },
        {
          Subject: "Renewal",
          RetainGoal: null,
          UpgradeGoal: null,
          AttainmentRate: null,
          RevenueYoYRate: null,
          RevenueValue: null
        },        {
          Subject: "Total",
          RetainGoal: null,
          UpgradeGoal: null,
          AttainmentRate: null,
          RevenueYoYRate: null,
          RevenueValue: null
        }
      ]
    },
    ListCounterData: {
      NewRevenueField: [
        {
          Key: "UpgradeOppty",
          Title: "Upgrade Oppty",
          SubTitle: "upgrade",
          Count: null
        },
        {
          Key: "SaasPotential",
          Title: "SaaS Potential",
          SubTitle: "state SaaS",
          Count: null
        }
      ],
      RenewalRevenueField: [
        {
          Key: "UpcomingRenewal",
          Title: "Upcoming Renewal",
          SubTitle: "renew",
          Count: null
        },
        {
          Key: "ExpiredCustomer",
          Title: "Expired Customer",
          SubTitle: "remdedy",
          Count: null
        }
      ],
      MSPRevenueField: [
        {
          Key: "SeatIncrease",
          Title: "Seat Increase",
          SubTitle: "add seat",
          Count: null
        },
        {
          Key: "SeatDecrease",
          Title: "Seat Decrease",
          SubTitle: "reduce loss",
          Count: null
        }
      ]
    },
    RevenueCustomerData:
      {
        "RunChartDataSet": {
          "TimeLabel": [],
          "ResellerRevenue": [],
          "MSPRevenue": [],
          "ResellerCustomer": [],
          "MSPCustomer": [],
        },
        "PercentageRateDiff": {
          "ResellerRevenuePercentage": null,
          "MSPRevenuePercentage": null,
          "ResellerCustomerPercentage": null,
          "MSPCustomerPercentage": null
        }
      }
  },
  dashboardIsLoading: true
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.DASHBOARD_STATUS_INIT:
      return {
        ...state
      };

    case types.DASHBOARD_STATUS_SUCCESS:
      return {
        ...state,
        uccDashboard: actions.apiResult,
        dashboardIsLoading: false
      };

    case types.DASHBOARD_STATUS_ERROR:
      return {
        uccDashboard: {
          ProfileData: {},
          TierData: { CurrentlyGauge: { CurrentTier: null, NextTier: null, OverallRate: null, NewRevenueLeft: null, TotalRevenueLeft: null },
            AttainmentGauge: [
              {
                Subject: "New",
                RetainGoal: null,
                UpgradeGoal: null,
                AttainmentRate: null,
                RevenueYoYRate: null,
                RevenueValue: null
              },
              {
                Subject: "Renewal",
                RetainGoal: null,
                UpgradeGoal: null,
                AttainmentRate: null,
                RevenueYoYRate: null,
                RevenueValue: null
              },        {
                Subject: "Total",
                RetainGoal: null,
                UpgradeGoal: null,
                AttainmentRate: null,
                RevenueYoYRate: null,
                RevenueValue: null
              }
            ]
          },
          ListCounterData: {
            NewRevenueField: [
              {
                Key: "UpgradeOppty",
                Title: "Upgrade Oppty",
                SubTitle: "upgrade",
                Count: "--"
              },
              {
                Key: "SaasPotential",
                Title: "SaaS Potential",
                SubTitle: "state SaaS",
                Count: "--"
              }
            ],
            RenewalRevenueField: [
              {
                Key: "UpcomingRenewal",
                Title: "Upcoming Renewal",
                SubTitle: "renew",
                Count: "--"
              },
              {
                Key: "ExpiredCustomer",
                Title: "Expired Customer",
                SubTitle: "remdedy",
                Count: null
              }
            ],
            MSPRevenueField: [
              {
                Key: "SeatIncrease",
                Title: "Seat Increase",
                SubTitle: "add seat",
                Count: "--"
              },
              {
                Key: "SeatDecrease",
                Title: "Seat Decrease",
                SubTitle: "reduce loss",
                Count: "--"
              }
            ]
          },
          RevenueCustomerData: { "RunChartDataSet": { "TimeLabel": [], "ResellerRevenue": [], "MSPRevenue": [], "ResellerCustomer": [], "MSPCustomer": [], }, "PercentageRateDiff": { "ResellerRevenuePercentage": null, "MSPRevenuePercentage": null, "ResellerCustomerPercentage": null, "MSPCustomerPercentage": null } }
        },
        dashboardIsLoading: false
      };

    default:
      return state;
  }
}
