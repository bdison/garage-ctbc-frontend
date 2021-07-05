import React from "react";
import { Card, CardBody, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { ReactComponent as TMLogo } from "../../assets/img/brands/trend-icon.svg";
import { Redirect } from "react-router-dom";
import { initAuthStatus, checkSecurityKey } from "../../redux/actions/adfsLoginActions";
import * as Setup from "../../utility/common";

const routeHandling = (status, securityKey) => {
  switch (status) {
    case true:
      window.location.href = Setup.connectSteamForADFS() + "?SK=" + securityKey;
      break;

    case false:
      return (<Redirect to="/" />);

    default:
    // Wait to verify SK.
  }
};

class AuthHandling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    document.title = "Garage";
    this.props.checkSecurityKey();
    this.props.initAuthStatus();
  }

  render() {
    const { passToAuthProxy, passToAuthProxySecurityKey } = this.props;

    return (
      <>
        {
          routeHandling(passToAuthProxy, passToAuthProxySecurityKey)
        }
        <Card>
          <CardBody style={{ textAlign: "center" }}>
            <TMLogo style={{ width: "30px", marginRight: "10px" }} />
            <span style={{ color: "black" }}>Authenticate checking...</span>
            <br />
            <Spinner style={{ color: "black" }} />
          </CardBody>
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    passToAuthProxy: state.adfslogin.passToAuthProxy,
    passToAuthProxySecurityKey: state.adfslogin.passToAuthProxySecurityKey
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initAuthStatus: () => dispatch(initAuthStatus()),
    checkSecurityKey: () => dispatch(checkSecurityKey())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(AuthHandling));