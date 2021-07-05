import ReactGA from "react-ga";
import { createHashHistory as createHistory } from "history";
import * as Setup from "./common";

export const initGA = () => {
  switch (Setup.envSetting()) {
    case "prod":
    case "stg":
      // Production env
      // ReactGA.initialize("UA-59452625-6");
      break;

    case "dev":
      // Test env
      // ReactGA.initialize("UA-143324195-1");
      break;

    default:
      // Beta env
      // ReactGA.initialize("UA-59383857-6");
      break;
  }
};

// googleanlystic
export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = "", action = "") => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = "", fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};

export const history = createHistory();
initGA();
history.listen((location) => {
  ReactGA.pageview(location.pathname + location.search);
});

export const handleGAModalOpenEvent = (paneTitle) => {
  let viewPath;
  switch (paneTitle) {
    case "1st Customer (60 days)":
      viewPath = "/First_Customer_in_60_Days";
      break;
    default:
      viewPath = `/${paneTitle.replace(/ /g, "_")}`;
      break;
  }
  ReactGA.modalview(viewPath);
};

export const handleGAPartnerLinkClickEvent = (eventLocation) => {
  ReactGA.modalview("/Partner_Detail/");
  handleGANavigateEvent(eventLocation);
};

const locationLabelGenerator = (hash) => {
  let eventLabel = hash.replace("#", "");
  return eventLabel;
};

export const handleGANavigateEvent = (eventLocation) => {
  let eventLabel = locationLabelGenerator(eventLocation);
  ReactGA.event({
    category: "Navigate",
    action: "Navigate to detail page",
    label: `${eventLabel}`
  });
};

export const handleGADownloadCSVEvent = (eventLocation) => {
  let eventLabel = locationLabelGenerator(eventLocation);
  ReactGA.event({
    category: "DownlodCSV",
    action: "Download",
    label: `${eventLabel}`
  });
};

export const handleGAFilterEvent = (column, eventLocation) => {
  let eventLabel = locationLabelGenerator(eventLocation);
  // if (eventLocation.substring(0, 1) === "#") {
  //   eventLabel = eventLocation.replace("#", "");
  // } else if (eventLocation.substring(0, 4) === "Pane") {
  //   eventLabel = eventLocation.replace("Pane", "/modal/").replace(/ /g, "_");
  // }
  ReactGA.event({
    category: "Filter",
    action: `Filter the ${column}`,
    label: `${eventLabel}`
  });
};

export const handleGASortEvent = (field, eventLocation) => {
  switch (field) {
    case "PartnerName":
      field = "Partner";
      break;
    case "Health":
      field = "Predict";
      break;
    case "LastOrderDay":
      field = "LastOrderDate";
      break;
    case "State":
      field = "State";
      break;
    case "Country":
      field = "Country";
      break;
    case "SalesName":
      field = "Sales";
      break;
    case "product_type":
      field = "ProductType";
      break;
    case "MILThisYearTotalRevenueYTD":
      field = "ThisYearTotalRevenueYTD";
      break;
    case "MILLastYearTotalRevenueYTD":
      field = "LastYearTotalRevenueYTD";
      break;
    case "MILThisYearTotalOrdersYTD":
      field = "ThisYearTotalOrdersYTD";
      break;
    case "MILLastYearTotalOrdersYTD":
      field = "LastYearTotalOrdersYTD";
      break;
    case "SaasOpptyList":
      field = "SaaSOpportunity";
      break;
    case "UpgradeOpptyList":
      field = "UpgradeOpportunity";
      break;
    case "ThisYearMaxorderProductYTD":
      field = "MaxInvoice";
      break;
    default:
      break;
  }
  let eventLabel = locationLabelGenerator(eventLocation);
  ReactGA.event({
    category: "Sort",
    action: `Sort the ${field}`,
    label: `${eventLabel}`
  });
};
export const handleGADrilldown = (title, partnerType) => {
  let subject;
  switch (title) {
    case "Active":
    case "Idle":
      subject = `${title}License`;
      break;
    default:
      subject = title;
      break;
  }
  ReactGA.event({
    category: "Drilldown",
    action: `Drill down ${subject}`,
    label: `/Partner_Detail/${partnerType}`
  });
};
const tabTitleConverter = (sourceType) => {
  let tabTitle;
  switch (sourceType.toLowerCase()) {
    case "tm":
      tabTitle = "Reseller";
      break;
    case "total":
      tabTitle = "Total";
      break;
    default:
      tabTitle = "MSP";
      break;
  }
  return tabTitle;
};
export const handleGAToggleTab = (sourceType, block, partnerType) => {
  let souceTitle = tabTitleConverter(sourceType);
  ReactGA.event({
    category: "ToggleTab",
    action: `Toggle ${souceTitle} tab in ${block}`,
    label: `/Partner_Detail/${partnerType}`
  });
};

export const handleGAToggleLegend = (chartTitle, partnerType) => {
  ReactGA.event({
    category: "ToggleLegend",
    action: `Toggle the legend of ${chartTitle}`,
    label: `/Partner_Detail/${partnerType}`
  });
};

export const handleGAToggleContact = () => {
  ReactGA.event({
    category: "ToggleSwitch",
    action: "Toggle the contact switch",
    label: "/Partner_Detail"
  });
};

export const handleGASwitchSource = (source) => {
  let sourceButton;
  source === "TOP20" ? sourceButton = "Top20Percent" : sourceButton = "All";
  ReactGA.event({
    category: "SwitchSource",
    action: `Switch to ${sourceButton}`,
    label: "/Dashboard"
  });
};