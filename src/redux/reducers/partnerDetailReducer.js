import * as types from "../constants";

const initialState = {
  isProfileDataLoading: true,
  dataSourceRegion: "NABU",
  profileData: {
    ID: null,
    PartnerName: null,
    PartnerType: null,
    Country: null,
    State: null,
    Phone: null,
    IdentityID: null,
    SalesName: null,
    Email: null
  },
  isHistoryDataLoading: true,
  tmHistoricalData: {
    YOYData: [],
    YTDData: [],
    DateData: [],
    SizeofCustomerSegment: {
      SB: {},
      MB: {},
      ENT: {},
      HC: {}
    },
    SizeofRevenueSegment: {
      SB: {},
      MB: {},
      ENT: {},
      HC: {}
    },
    MileageData: {}
  },
  mspHistoricalData: {
    DataRef: {},
    DateData: [],
    MOMData: [],
    YOYData: [],
    YTDData: [],
    SizeofCustomerSegment: {
      BelowTwentyFive: {},
      BelowFifty: {},
      BelowHundred: {},
      BelowTwoHundredFifty: {},
      TwoHundredFiftyUp: {}
    },
    SizeofSeatInUseSegment: {
      BelowTwentyFive: {},
      BelowFifty: {},
      BelowHundred: {},
      BelowTwoHundredFifty: {},
      TwoHundredFiftyUp: {}
    },
    Milestone: {
      CreateTime: "None",
      CreateServicePlan: "None",
      FirstCustomer: "None",
      FirstBilling: "None",
    }
  },
  isMileageDataLoading: true,
  mileageData: {
    Tier: "",
    NextTierRate: "",
    CurrentRevenue: "",
    CurrentRevenueRate: "",
    CurrentNewRevenue: "",
    CurrentNewRevenueRate: ""
  },
  isSupportCaseDataLoading: true,
  supportCaseData: {
    PartnerSupportCase: null,
    CustomerSupportCase: null
  },
  isMspLicenseProfileDataLoading: true,
  mspLicenseProfileData: [],
  newPartnerMask: false,
  contactStatus: "0",
  isAnnotationDataLoading: true,
  annotationData: {
    PredictionTotalRevenue: null,
    PredictionNewRevenue: null,
    PredictionRenewRevenue: null,
    Health: null,
    revenueGauge: []
  },
  isRadarDataLoading: true,
  radarData: {
    Score: ["0", "0", "0", "0", "0"],
    Labels: ["", "", "", "", ""]
  },
  isCrossSellDataLoading: true,
  crossSellData: {
    PredictionMostPotential: "--",
    PredictionRecommend: "--",
    PredictionMostDanger: "--",
    PredictionMigrateToWFSaaS: "--"
  },
  isProductPredictDataLoading: true,
  productPredictData: {
    totalProductPredictData: {
      Labels: [],
      LastYearNewRevenue: [],
      LastYearNewOrder: [],
      LastYearRenewalRevenue: [],
      LastYearRenewalOrder: [],
      ThisYearNewRevenue: [],
      ThisYearNewOrder: [],
      ThisYearRenewalRevenue: [],
      ThisYearRenewalOrder: [],
      PredictProbability: []
    },
    mspProductPredictData: {
      totalSeatsData: {
        Labels: [],
        seats: [],
        regression: [],
        prediction: []
      },
      newCustomersData: {
        Labels: [],
        customer: [],
        regression: [],
        prediction: []
      }
    }
  },
  isRevenueSeatsDataLoading: true,
  revenueSeatsData: {
    TimeLabel: ["", "", "", "", "", "", "", "", "", "", "", ""],
    TMRevenue: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    XSPRevenue: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    TMCustomer: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    XSPCustomer: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    TMRevenuePercentage: 0,
    XSPRevenuePercentage: 0,
    TMCustomerPercentage: 0,
    XSPCustomerPercentage: 0
  },
  isWrongSearchID: false,
  isHighlightDataLoading: true,
  highlightData: {
    summaries: [],
    actions: []
  },
  statusLight: [
    {
      Name: "",
      IsOn: false,
      CreateDate: "",
      ChangeDate: ""
    }
  ],
  specialization: [
    {
      Item: ""
    }
  ],
  isSpecializationDataLoading: true
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.PARTNER_DETAIL_STATUS_INIT:
      return {
        isProfileDataLoading: true,
        dataSourceRegion: "NABU",
        profileData: {
          ID: null,
          PartnerName: null,
          PartnerType: null,
          Country: null,
          State: null,
          Phone: null,
          IdentityID: null,
          SalesName: null,
          Email: null
        },
        isHistoryDataLoading: true,
        tmHistoricalData: {
          YOYData: [],
          YTDData: [],
          DateData: [],
          SizeofCustomerSegment: {
            SB: {},
            MB: {},
            ENT: {},
            HC: {}
          },
          SizeofRevenueSegment: {
            SB: {},
            MB: {},
            ENT: {},
            HC: {}
          },
          MileageData: {}
        },
        mspHistoricalData: {
          DataRef: {},
          DateData: [],
          MOMData: [],
          YOYData: [],
          YTDData: [],
          SizeofCustomerSegment: {
            BelowTwentyFive: {},
            BelowFifty: {},
            BelowHundred: {},
            BelowTwoHundredFifty: {},
            TwoHundredFiftyUp: {}
          },
          SizeofSeatInUseSegment: {
            BelowTwentyFive: {},
            BelowFifty: {},
            BelowHundred: {},
            BelowTwoHundredFifty: {},
            TwoHundredFiftyUp: {}
          },
          Milestone: {
            CreateTime: "None",
            CreateServicePlan: "None",
            FirstCustomer: "None",
            FirstBilling: "None",
          }
        },
        isMileageDataLoading: true,
        mileageData: {
          Tier: "",
          NextTierRate: "",
          CurrentRevenue: "",
          CurrentRevenueRate: "",
          CurrentNewRevenue: "",
          CurrentNewRevenueRate: ""
        },
        isSupportCaseDataLoading: true,
        supportCaseData: {
          PartnerSupportCase: null,
          CustomerSupportCase: null
        },
        isMspLicenseProfileDataLoading: true,
        mspLicenseProfileData: [],
        newPartnerMask: false,
        contactStatus: "0",
        isAnnotationDataLoading: true,
        annotationData: {
          PredictionTotalRevenue: null,
          PredictionNewRevenue: null,
          PredictionRenewRevenue: null,
          Health: null,
          revenueGauge: []
        },
        isRadarDataLoading: true,
        radarData: {
          Score: ["0", "0", "0", "0", "0"],
          Labels: ["", "", "", "", ""]
        },
        isCrossSellDataLoading: true,
        crossSellData: {
          PredictionMostPotential: "--",
          PredictionRecommend: "--",
          PredictionMostDanger: "--",
          PredictionMigrateToWFSaaS: "--"
        },
        isProductPredictDataLoading: true,
        productPredictData: {
          totalProductPredictData: {
            Labels: [],
            LastYearNewRevenue: [],
            LastYearNewOrder: [],
            LastYearRenewalRevenue: [],
            LastYearRenewalOrder: [],
            ThisYearNewRevenue: [],
            ThisYearNewOrder: [],
            ThisYearRenewalRevenue: [],
            ThisYearRenewalOrder: [],
            PredictProbability: []
          },
          mspProductPredictData: {
            totalSeatsData: {
              Labels: [],
              seats: [],
              regression: [],
              prediction: []
            },
            newCustomersData: {
              Labels: [],
              customer: [],
              regression: [],
              prediction: []
            }
          }
        },
        isRevenueSeatsDataLoading: true,
        revenueSeatsData: {
          TimeLabel: ["", "", "", "", "", "", "", "", "", "", "", ""],
          TMRevenue: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
          XSPRevenue: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
          TMCustomer: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
          XSPCustomer: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
          TMRevenuePercentage: 0,
          XSPRevenuePercentage: 0,
          TMCustomerPercentage: 0,
          XSPCustomerPercentage: 0
        },
        isWrongSearchID: false,
        isHighlightDataLoading: true,
        highlightData: {
          summaries: [],
          actions: []
        },
        statusLight: [
          {
            Name: "",
            IsOn: false,
            CreateDate: "",
            ChangeDate: ""
          }
        ],
        specialization: [
          {
            Item: ""
          }
        ],
        isSpecializationDataLoading: true
      };

    case types.PARTNER_DETAIL_STATUS_ERROR:
      return {
        ...state,
        dataSourceRegion: "NABU",
        isProfileDataLoading: true,
        isHistoryDataLoading: true,
        isSupportCaseDataLoading: true,
        newPartnerMask: false,
        isAnnotationDataLoading: true,
        isRadarDataLoading: true,
        isCrossSellDataLoading: true,
        isProductPredictDataLoading: true,
        isRevenueSeatsDataLoading: true,
        isSpecializationDataLoading: true
      };
    case types.PARTNER_DETAIL_STATUS_SUCCESS:

      return {
        ...state,
        dataSourceRegion: actions.dataSourceRegion,
        // Partnerinfo component
        isProfileDataLoading: false,
        profileData: actions.profileData,

        // Historical component
        isHistoryDataLoading: false,
        tmHistoricalData: actions.tmHistoricalData,
        mspHistoricalData: actions.mspHistoricalData,

        // Mileage component
        isMileageDataLoading: false,
        mileageData: actions.mileageData,

        // Support component
        isSupportCaseDataLoading: false,
        supportCaseData: actions.supportCaseData,

        // Msp License Profile component
        isMspLicenseProfileDataLoading: false,
        mspLicenseProfileData: actions.mspLicenseProfileData,

        // Mask component
        newPartnerMask: actions.newPartnerMask,

        // Contact status component
        contactStatus: actions.contactStatus,

        // AlertCard component
        isAnnotationDataLoading: false,
        annotationData: actions.annotationData,

        statusLight: actions.statusLight,

        // Radar component
        isRadarDataLoading: false,
        radarData: actions.radarData,

        // Cross-sell component
        isCrossSellDataLoading: false,
        crossSellData: actions.crossSellData,

        // Product Predict component
        isProductPredictDataLoading: false,
        productPredictData: actions.productPredictData,

        // Revenue Seats component
        isRevenueSeatsDataLoading: false,
        revenueSeatsData: actions.revenueSeatsData,

        // Highlight component
        isHighlightDataLoading: false,
        highlightData: actions.highlightData,

        // specialization component
        isSpecializationDataLoading: false,
        specializationData: actions.specializationData

      };

    case types.PARTNER_DETAIL_HAS_WRONG_SEARCHID:
      return {
        ...state,
        isWrongSearchID: true
      };
    default:
      return state;
  }
}
