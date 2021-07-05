import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import login from "./loginReducer";
import adfslogin from "./adfsLoginReducer";
import dashboard from "./dashboardReducer";
import auth from "./authReducer";
import datasource from "./dataSourceReducer";
import partnerdetail from "./partnerDetailReducer";
import topiclist from "./topicListReducer";
import customerlist from "./customerListReducer";
// import pane from "./paneReducer";

import { reducer as toastr } from "react-redux-toastr";

export default combineReducers({
  sidebar,
  layout,
  theme,
  toastr,
  login,
  auth,
  datasource,
  adfslogin,
  dashboard,
  topiclist,
  partnerdetail,
  customerlist
});
