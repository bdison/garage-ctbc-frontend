import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { connect } from "react-redux";
import TraditionalBusinessTable from "./traditionalBusinessTable";
import SubscriptionTable from "./subscriptionTable";
import { initAllCustomerData, getAllCustomerTMBizData, getAllCustomerMSPBizData } from "../../redux/actions/customerListActions";
// import { getAllCustomerTMBizDataAPI, getAllCustomerMSPBizDataAPI } from "../../redux/actions/customerListActions";
// import * as Setup from "../../utility/common";

export class customerList extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "TM"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    this.props.initAllCustomerData();
    this.props.getAllCustomerTMBizData();
    this.props.getAllCustomerMSPBizData();

    // const { cookies, locationPathName } = this.props;
    // const headerObj = Setup.getRequestHeader(this.props.cookies);
    // this.props.getAllCustomerTMBizDataAPI(headerObj,cookies, locationPathName );
    // this.props.getAllCustomerMSPBizDataAPI(headerObj,cookies, locationPathName );
  }

  render() {
    const { tmBizList, mspBizList } = this.props;

    const tabEnableCSS = {
      color: "#4A8CC7",
      borderBottomColor: "#4A8CC7",
      borderBottomWidth: "2px"
    };

    const tabDisableCSS = {
      color: "#A9A9A9",
      borderBottomColor: "#FFF",
      borderBottomWidth: "0px"
    };

    return (
      <Container fluid className="p-0">
        <Row>
          <Col>
            <Card className="m-0">
              <CardBody className="topic-list-holder" >
                <h4>Customer List</h4>
                <Nav tabs className="mr-auto" style={{ borderBottomWidth: "0px" }}>
                  <NavItem>
                    <NavLink
                      style={this.state.activeTab === "TM" ? tabEnableCSS : tabDisableCSS}
                      onClick={() => { this.toggle("TM"); }}
                    >
                      Traditional Business ({tmBizList.length})
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={this.state.activeTab === "MSP" ? tabEnableCSS : tabDisableCSS}
                      onClick={() => { this.toggle("MSP"); }}
                    >
                      Subscription ({mspBizList.length})
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="TM">
                    <div className="mt-3 mb-3">
                      <TraditionalBusinessTable />
                    </div>
                  </TabPane>
                  <TabPane tabId="MSP">
                    <div className="mt-3 mb-3">
                      <SubscriptionTable />
                    </div>
                  </TabPane>
                </TabContent>

              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tmBizList: state.customerlist.tmBizList,
    mspBizList: state.customerlist.mspBizList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initAllCustomerData: () => dispatch(initAllCustomerData()),
    getAllCustomerTMBizData: () => dispatch(getAllCustomerTMBizData()),
    getAllCustomerMSPBizData: () => dispatch(getAllCustomerMSPBizData()),
    // getAllCustomerTMBizDataAPI: (apiDomain, cookieProps, pathName) => dispatch(getAllCustomerTMBizDataAPI(apiDomain, cookieProps, pathName)),
    // getAllCustomerMSPBizDataAPI: (apiDomain, cookieProps, pathName) => dispatch(getAllCustomerMSPBizDataAPI(apiDomain, cookieProps, pathName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(customerList);
