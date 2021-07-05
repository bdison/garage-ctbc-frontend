import * as types from "../constants";

const initialState = {
  tmBizList: [],
  mspBizList: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.CUSTOMER_STATUS_INIT:
      return {
        tmBizList: [],
        mspBizList: []
      };
    case types.CUSTOMER_TM_STATUS_SUCCESS:
      return {
        ...state,
        tmBizList: actions.apiResult
      };

    case types.CUSTOMER_TM_STATUS_ERROR:
      return {
        ...state,
      };
    case types.CUSTOMER_MSP_STATUS_SUCCESS:
      return {
        ...state,
        mspBizList: actions.apiResult
      };

    case types.CUSTOMER_MSP_STATUS_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}
