import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const InformationTip = ({ tipName, tipContent, tipPlace }) => {
    return (
        <>
            <span data-tip={tipContent} data-for={`${tipName}-TitleTip`} style={{ backgroundColor: "white", height: "20px", width: "20px", marginLeft: "2px" }}><FontAwesomeIcon style={{ color: "#BBBBBB", cursor: "pointer" }} icon={faInfoCircle} /></span>
            <ReactTooltip id={`${tipName}-TitleTip`} html={true} place={tipPlace ? tipPlace : null} />
        </>
    );
};

export default InformationTip;