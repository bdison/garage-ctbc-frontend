import React from "react";
import { Card, CardBody, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { ReactComponent as TMLogo } from "../../assets/img/brands/trend-icon.svg";
import { Redirect } from "react-router-dom";
import { initResponseAuthStatus, callApiForAuthCheck } from "../../redux/actions/adfsLoginActions";

class ResponseHandling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    document.title = "Garage";
    this.props.initResponseAuthStatus();

    const query = new URLSearchParams(this.props.location.search);
    const tmpSecurityKey = query.get("SK");
    const tmpAuthResponse = query.get("AR");

    // Call API
    const { cookies } = this.props;
    const cookiesObj = {
      authSecurityKey: tmpSecurityKey,
      authResponse: tmpAuthResponse
    };
    this.props.callApiForAuthCheck(cookies, cookiesObj);
  }

  render() {
    const { passToCTBC } = this.props;
    switch (passToCTBC) {
      case false:
        return (<Redirect to="/" />);

      case true:
        return (<Redirect to="/Dashboard" />);

      default:
        return (
          <>
            <Card>
              <CardBody style={{ textAlign: "center", color: "black" }}>
                <TMLogo style={{ width: "30px", marginRight: "10px" }} />
                <span>Authenticate checking...</span>
                <br />
                <Spinner />
              </CardBody>
            </Card>
          </>
        );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    passToCTBC: state.adfslogin.passToCTBC
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initResponseAuthStatus: () => dispatch(initResponseAuthStatus()),
    callApiForAuthCheck: (cookiesProps, cookiesObj) => dispatch(callApiForAuthCheck(cookiesProps, cookiesObj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(ResponseHandling));