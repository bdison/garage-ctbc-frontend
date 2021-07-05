import React from "react";
import { toastr } from "react-redux-toastr";
import _ from "lodash";
import { Cloud, ThumbsUp, XCircle, AlertCircle, TrendingUp, TrendingDown, Activity } from "react-feather";

const hostEnvironment = window.env.REACT_APP_CTBC_ENVIRONMENT;

export const getRequestHeader = (cookies) => {
    let header = {
        "Content-Type": "application/json",
        "Token": cookies.get("token"),
        "Username": cookies.get("username"),
        // "traceid": cookies.get("traceid")
    };
    return header;
};

export const connectSteam = (apidirect) => {
    const EnvConnectSteam = window.env.REACT_APP_CTBC_API_URL;
    const ApiDirectPath = EnvConnectSteam + apidirect;
    return ApiDirectPath;
};

export const connectSteamForADFS = () => {
    return window.env.REACT_APP_CTBC_AUTHPROXY_URL;
};

export const getGithubVersionNumber = () => {
    return window.env.REACT_APP_CTBC_VERSION;
};

export const getPrmUrlLink = () => {
    return window.env.REACT_APP_CTBC_PRM_URL;
};

export const apiTimeout = () => {
    return { response: 30000 };
};

export const getUserName = (cookies) => {
    let username = cookies.get("username");
    return username;
};

export const logoutEvent = (cookies) => {
    if (cookies.get("rememberme") === "true") {
        cookies.remove("token", { path: "/" });
        cookies.remove("traceid", { path: "/" });
        cookies.remove("regionDomain", { path: "/" });
        cookies.remove("displayname", { path: "/" });
    } else {
        cookies.remove("token", { path: "/" });
        cookies.remove("traceid", { path: "/" });
        cookies.remove("regionDomain", { path: "/" });
        cookies.remove("username", { path: "/" });
        cookies.remove("displayname", { path: "/" });
        cookies.remove("rememberme", { path: "/" });
    }
};

export const getSecureCookieSetting = () => {
    switch (hostEnvironment) {
        case "prod":
        case "stg":
        case "beta":
            return true;
        default:
            return false;
    }
};

export const notificationMessage = (notifyType, notifyTitle, notifyMsg) => {

    const toastrInstance =
        notifyType === "info"
            ? toastr.info
            : notifyType === "warning"
                ? toastr.warning
                : notifyType === "error"
                    ? toastr.error
                    : toastr.success;

    const notificationOptions = {
        timeOut: 5000,
        showCloseButton: true,
        progressBar: true,
        position: "top-right"
    };

    toastrInstance(
        notifyTitle,
        notifyMsg,
        notificationOptions
    );
};


export const envSetting = () => {
    return hostEnvironment;
};

export const handlePartnerListFilter = (listData, filterTier, filterType, filterState, filterCountry, filterSales) => {
    let filteredTierList = [];
    let filteredTypeList = [];
    let filteredStateList = [];
    let filterCountryList = [];
    let filteredSalesList = [];
    let filteredPartnerList = [];

    listData.forEach((item) => {
        if (filterTier === "") {
            filteredTierList.push(item);
        }
        if (item.Tier === filterTier) {
            filteredTierList.push(item);
        }
    });
    filteredTierList.forEach((item) => {
        if (filterType === "") {
            filteredTypeList.push(item);
        }
        if (item.PartnerType === filterType) {
            filteredTypeList.push(item);
        }
    });
    filteredTypeList.forEach((item) => {
        if (filterState === "") {
            filteredStateList.push(item);
        }
        if (item.State === filterState) {
            filteredStateList.push(item);
        }
    });
    filteredStateList.forEach((item) => {
        if (filterCountry === "") {
            filterCountryList.push(item);
        }
        if (item.Country === filterCountry) {
            filterCountryList.push(item);
        }
    });
    filterCountryList.forEach((item) => {
        if (filterSales === "") {
            filteredSalesList.push(item);
        }
        if (item.SalesName.split(",").length > 1) {
            if (item.SalesName.includes(filterSales)) {
                filteredSalesList.push(item);
            }
        } else {
            if (item.SalesName === filterSales) {
                filteredSalesList.push(item);
            }
        }
    });
    filteredPartnerList = filteredSalesList;
    return filteredPartnerList;
};

export const handleFilterObject = (filterField, filterValue) => {
    let filterObject = {};
    switch (filterField) {
        case "Tier":
            filterObject = { "filterTier": filterValue };
            break;
        case "Type":
            filterObject = { "filterType": filterValue };
            break;
        case "State":
            filterObject = { "filterState": filterValue };
            break;
        case "Country":
            filterObject = { "filterCountry": filterValue };
            break;
        default:
            filterObject = { "filterSales": filterValue };
    }
    return filterObject;
};

export const convertDatatoSalesArray = (allPartnerData) => {
    let salesArrayList = [];
    salesArrayList = _.map(_.map(allPartnerData, "SalesName"), (item) => {
        if (!item) {
            return item;
        }
        let itemArray = item.split(",");
        let trimArray = [];
        if (item.split(",") && itemArray.length > 1) {
            itemArray.forEach((item) => {
                if (item.charAt(0) === " ") {
                    trimArray.push(item.substring(1));
                } else {
                    trimArray.push(item);
                }
            });
            return trimArray;
        } else {
            return itemArray;
        }
    });
    return salesArrayList;
};

export const currencySymbolGenerator = (region) => {
    switch (region.toUpperCase().toString()) {
        case "EU":
            return "€";
        default:
            return "$";
    }
};

export const thousandsSeparator = (number) => {
    if (!number) return number;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const zeroToKMGConverter = (number) => {
    if (!number) return number;
    if (number >= 1000000000 || number <= -1000000000) {
        return (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (number >= 1000000 || number <= -1000000) {
        return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (number >= 1000 || number <= -1000) {
        return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return number;
};

export const zeroRoundOffToKMGConverter = (number) =>{
    if (!number) return number;
    if (number >= 1000000000 || number <= -1000000000) {
        return Math.floor(number / 1000000000) + "G";
    }
    if (number >= 1000000 || number <= -1000000) {
        return Math.floor(number / 1000000)+ "M";
    }
    if (number >= 1000 || number <= -1000) {
        return Math.floor(number / 1000) + "K";
    }
    return number;
};

export const paneIconConverter = (paneID) => {
    switch (paneID) {
        case "UpgradeOppty":
            return <ThumbsUp size={35} className="pane_icon" />;

        case "SaasPotential":
            return <Cloud size={35} className="pane_icon" />;

        case "UpcomingRenewal":
            return <XCircle size={35} className="pane_icon" />;

        case "ExpiredCustomer":
            return <AlertCircle size={35} className="pane_icon" />;

        case "SeatIncrease":
            return <TrendingUp size={35} className="pane_icon" />;

        case "SeatDecrease":
            return <TrendingDown size={35} className="pane_icon" />;

        default:
            return <Activity size={35} className="pane_icon" />;
    }
};

export const paneDataConverter = (listKey) => {
    let paneData;
    switch (listKey) {
        case "UpgradeOppty":
            paneData = {
                title: "Upgrade Opportunity",
                columnType: "1"
            };
            break;
        case "SaasPotential":
            paneData = {
                title: "SaaS Potential",
                columnType: "1"
            };
            break;

        case "UpcomingRenewal":
            paneData = {
                title: "Upcoming Renewal",
                columnType: "1"

            };
            break;
        case "ExpiredCustomer":
            paneData = {
                title: "Expired Customer",
                columnType: "1"
            };
            break;

        case "SeatIncrease":
            paneData = {
                title: "Seat Increase",
                columnType: "2"
            };
            break;

        case "SeatDecrease":
            paneData = {
                title: "Seat Decrease",
                columnType: "2"
            };
            break;
        default:
            paneData = {
                title: "--",
                columnType: "0"
            };
            break;
    }
    return paneData;
};

