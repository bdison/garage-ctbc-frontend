import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { connect } from "react-redux";
import Panes from "./panes";
import "./dashboard.css";

class ListBoard extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: "tabNewRevenue"
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const { activeTab } = this.state;
        const { ListCounterData } = this.props;

        return (
            <Card className="mb-1">
                <CardHeader>
                    <CardTitle tag="h5" className="mb-0">Increase Revenue</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <div className={"tab mb-0"}>
                                <Nav tabs>
                                    <NavItem style={{ width: "33%" }}>
                                        <NavLink
                                            className={(activeTab === "tabNewRevenue" ? "nav_active" : "nav_deactive")}
                                            onClick={() => {
                                                this.toggle("tabNewRevenue");
                                            }}
                                        >
                                            New Revenue
                                        </NavLink>
                                    </NavItem>
                                    <NavItem style={{ width: "34%" }}>
                                        <NavLink
                                            className={(activeTab === "tabRenewalRevenue" ? "nav_active" : "nav_deactive")}
                                            onClick={() => {
                                                this.toggle("tabRenewalRevenue");
                                            }}
                                        >
                                            Renewal Revenue
                                        </NavLink>
                                    </NavItem>
                                    <NavItem style={{ width: "33%" }}>
                                        <NavLink
                                            className={(activeTab === "tabMspRevenue" ? "nav_active" : "nav_deactive")}
                                            onClick={() => {
                                                this.toggle("tabMspRevenue");
                                            }}
                                        >
                                            MSP Revenue
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="tabNewRevenue">
                                        <Row>
                                            {
                                                ListCounterData.NewRevenueField.map((item) => (
                                                    <Col key={item.Key}>
                                                        <Panes paneArray={item} />
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="tabRenewalRevenue">
                                        <Row>
                                            {
                                                ListCounterData.RenewalRevenueField.map((item) => (
                                                    <Col key={item.Key}>
                                                        <Panes paneArray={item} />
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="tabMspRevenue">
                                        <Row>
                                            {
                                                ListCounterData.MSPRevenueField.map((item) => (
                                                    <Col key={item.Key}>
                                                        <Panes paneArray={item} />
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ListCounterData: state.dashboard.uccDashboard.ListCounterData
    };
};

export default connect(mapStateToProps, null)(ListBoard);