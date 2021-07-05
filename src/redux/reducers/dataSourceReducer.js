import * as types from "../constants";
const initialState = {
  // TOP20, ALL
  dataSourceName: "TOP20",
  // NABU, EU
  dataSourceRegion:"NABU"
};

const dataSourceReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.DATA_SOURCE_DEFINE:
      return {
        ...state,
        dataSourceName: actions.dataSourceName
      };
    case types.DATA_SOURCE_REGION_INIT:
      return{
        ...state,
        dataSourceRegion:"NABU"
      };
    case types.DATA_SOURCE_REGION_SUCCESS:
      return{
        ...state,
        dataSourceRegion: actions.dataSourceRegion
      };
    default:
      return state;
  }
};

export default dataSourceReducer;