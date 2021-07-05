import * as types from "../constants";

const initialState = {
  paneList: [],
  paneLoading: true,
  paneCounterList: [],
  paneCounterListLoading: true
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.PANE_STATUS_INIT:
      return {
        ...state,
        paneList: [],
        paneLoading: true,
        paneCounterList: [],
        paneCounterListLoading: true
      };

    case types.PANE_STATUS_SUCCESS:
      return {
        ...state,
        paneList: actions.apiResult,
        paneLoading: false
      };

    case types.PANE_STATUS_ERROR:
      return {
        ...state,
        paneLoading: false
      };

    case types.PANE_COUNTER_STATUS_SUCCESS:
      return {
        ...state,
        paneCounterList: actions.apiResult,
        paneCounterListLoading: false,
      };

    case types.PANE_COUNTER_STATUS_ERROR:
      return {
        ...state,
        paneCounterListLoading: false
      };

    default:
      return state;
  }
}
