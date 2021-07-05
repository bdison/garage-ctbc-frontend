import React from "react";
import { Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import "./common.css";

const BadgePartnerType = (param) => {
  switch (param) {
    case "Reseller":
      return <Badge style={{ color: "#7883e5", border: "2px solid #7883e5", backgroundColor: "white", width: "58px", fontWeight: 900, letterSpacing: "0.4px" }}>{param}</Badge>;
    case "MSP":
      return <Badge style={{ color: "#06846F", border: "2px solid #06846F", backgroundColor: "white", width: "58px", fontWeight: 900, letterSpacing: "0.4px" }}>{param}</Badge>;
    default:
      return <Badge style={{ color: "#DB3A00", border: "2px solid #DB3A00", backgroundColor: "white", width: "58px", fontWeight: 900, letterSpacing: "0.4px" }}>{param}</Badge>;
  }
};

const ContactStatusIcon = (param) => {
  switch (param) {
    case "1":
      return <FontAwesomeIcon icon={faToggleOn} fixedWidth style={{ color: "#33ba72" }} />;
    default:
      return <FontAwesomeIcon icon={faToggleOff} fixedWidth style={{ color: "#cccccc" }} />;
  }
};

const checkHealthStatus = (param) => {
  switch (param) {
    case "0":
      return <Badge style={{ color: "#666666", border: "2px solid #eeeeee", backgroundColor: "#eeeeee", width: "70px", fontWeight: 900, letterSpacing: "0.4px" }}>Undefined</Badge>;
    case "1":
      return <Badge style={{ border: "2px solid #028840", backgroundColor: "#028840", width: "70px", fontWeight: 900, letterSpacing: "0.4px" }}>Healthy</Badge>;
    case "2":
      return <Badge style={{ border: "2px solid #037EAB", backgroundColor: "#037EAB", width: "70px", fontWeight: 900, letterSpacing: "0.4px" }}>Normal</Badge>;
    default:
      return <Badge style={{ border: "2px solid #cd363a", backgroundColor: "#cd363a", width: "70px", fontWeight: 900, letterSpacing: "0.4px" }}>Unhealthy</Badge>;
  }
};

const checkPredictStatus = (param) => {
  switch (param) {
    case "Grows":
      return <Badge style={{ border: "2px solid #33ba72", backgroundColor: "#33ba72", width: "70px", fontWeight: 900, letterSpacing: "0.4px" }}>Increase</Badge>;
    case "Drops":
      return <Badge style={{ border: "2px solid #e15054", backgroundColor: "#e15054", width: "70px", fontWeight: 900, letterSpacing: "0.4px" }}>Decrease</Badge>;
    case "Same":
      return <Badge style={{ border: "2px solid #0096cc", backgroundColor: "#0096cc", width: "70px", fontWeight: 900, letterSpacing: "0.4px" }}>Unchange</Badge>;
    default:
      return <Badge style={{ color: "#888888", border: "2px solid #eeeeee", backgroundColor: "#eeeeee", width: "70px", fontWeight: 900, letterSpacing: "0.4px" }}>--</Badge>;
  }
};

const predictStatusGenerator = (param) => {
  switch (param) {
    case "Grows":
      return (
        <div className="predict-bottom increase-color status-bottom-font">
          Increase
        </div>
      );
    case "Drops":
      return (
        <div className="predict-bottom decrease-color status-bottom-font">
          Decrease
        </div>
      );
    case "Same":
      return (
        <div className="predict-bottom unchange-color status-bottom-font">
          Unchange
        </div>
      );
    default:
      return (
        <div className="predict-bottom status-bottom-font">
          --
        </div>
      );
  }
};

export default { BadgePartnerType, ContactStatusIcon, checkHealthStatus, checkPredictStatus, predictStatusGenerator };
