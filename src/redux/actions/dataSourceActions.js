import * as types from "../constants";

export const setDataSourceScope = (dataSourceName) => {
  return (dispatch) => {
    dispatch({
      type: types.DATA_SOURCE_DEFINE,
      dataSourceName
    });
  };
};

export const initDataSourceRegion = () => {
  return {
    type: types.DATA_SOURCE_REGION_INIT
  };
};

export const getDataSourceRegion = (region) => {
  return ({
    type: types.DATA_SOURCE_REGION_SUCCESS,
    dataSourceRegion: region
  });
};