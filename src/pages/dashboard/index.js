import React from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { initDashboardData, getDashboardData } from "../../redux/actions/dashboardActions";
import ProfileBoard from "./profileBoard";
import ListBoard from "./listBoard";
import RevenueBoard from "./revenueBoard";
import SpiffBoard from "./spiffBoard";
import GoogleChart from "./googleChart";
import * as Setup from "../../utility/common";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    document.title = "Garage";
    this.props.initDashboardData();
    // this.props.getDashboardData();

    const { cookies, locationPathName } = this.props;
    const GET_DASHBOARD_DETAIL_FQDN = Setup.connectSteam("three_mounth_predict");
    this.props.getDashboardData(GET_DASHBOARD_DETAIL_FQDN, cookies, locationPathName);
  }

  render() {
    return (
      <Container fluid className="p-0" >
        <ProfileBoard/>
        <Row>
          <Col xl="6">
            <ListBoard />
            <RevenueBoard />
          </Col>
          <Col xl="6">
            {/* <ListBoard /> */}
            {/* <RevenueBoard /> */}
            <SpiffBoard />
            <GoogleChart />
          </Col>
        </Row>
      </Container>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    initDashboardData: () => dispatch(initDashboardData()),
    getDashboardData: (apiDomain, cookieProps, pathName) => dispatch(getDashboardData(apiDomain, cookieProps, pathName))
    // getDashboardData: () => dispatch(getDashboardData())
  };
};

export default connect(null, mapDispatchToProps)(withCookies(Dashboard));