import * as types from "../constants";

const initialState = {
  topicListLoading: true,
  topicList: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type){
    case types.TOPIC_LIST_INIT:
      return {
        ...state,
        topicListLoading: true,
        topicList: []
      };
    case types.TOPIC_LIST_SUCCESS:
      return {
        ...state,
        topicListLoading: false,
        topicList: actions.apiResult
      };
    case types.TOPIC_LIST_ERROR:
      return {
        ...state,
        topicListLoading: false,
        topicList: []
      };
    default:
      return state;
  }
}