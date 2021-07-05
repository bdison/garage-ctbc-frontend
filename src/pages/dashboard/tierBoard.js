import React from "react";
import { Row, Col, Card, CardBody, Media } from "reactstrap";
import { connect } from "react-redux";
import Progress from "react-circle-progress-bar";
import TierRevenueDetail from "./tierRevenueDetail";
import { currencySymbolGenerator, zeroToKMGConverter } from "../../utility/common";

class TierBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const region = "NABU";
        const { TierData } = this.props;
        return (
            <Card className="mb-1">
                <CardBody style={{ textAlign: "center" }}>
                    {
                        TierData !== {} ?
                            <>
                                <Row>
                                    <Col>
                                        <h2 className="font-interstate" >Current Tier: {TierData.CurrentlyGauge.CurrentTier} Tier</h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl="8">
                                        <Progress
                                            progress={TierData.CurrentlyGauge.OverallRate * 100}
                                            strokeWidth={16}
                                            subtitle={TierData.CurrentlyGauge.NextTier + " Tier"}
                                            className="circle_progress "
                                            style={{ width: "100%" }}
                                            reduction={0.2}
                                            background={"#F4F4F4"}
                                        />
                                    </Col>
                                    <Col xl="4" style={{ display: "grid" }}>
                                        <Media body>
                                            <div>
                                                <span>New Rev</span>
                                                <h2>{currencySymbolGenerator(region) + zeroToKMGConverter(TierData.CurrentlyGauge.NewRevenueLeft)}</h2>
                                            </div>
                                        </Media>
                                        <Media body>
                                            <div>
                                                <span>Total Rev</span>
                                                <h2>{currencySymbolGenerator(region) + zeroToKMGConverter(TierData.CurrentlyGauge.TotalRevenueLeft)}</h2>
                                            </div>
                                        </Media>
                                        <Media body>
                                            {
                                                TierData.CurrentlyGauge.CurrentTier && TierData.CurrentlyGauge.NextTier !== "-" ?
                                                    <>
                                                        <span>unitl the next</span>
                                                        <div><h2>{TierData.CurrentlyGauge.NextTier} Tier</h2></div></> : <span>remain in the current tier</span>
                                            }
                                        </Media>
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        TierData.AttainmentGauge.map((item, index) => (
                                            <Col key={"attainment_goal_progress_" + index}>
                                                <Row>
                                                    <Progress
                                                        progress={item.AttainmentRate * 100}
                                                        strokeWidth={20}
                                                        subtitle={item.Subject + " Rev"}
                                                        className="circle_progress w-100 font-interstate"
                                                        reduction={0.2}
                                                        background={"#F4F4F4"}
                                                    />
                                                </Row>
                                                <Row style={{ transform: "translateY(-100%)" }} className="d-flex justify-content-center">
                                                    <div style={{ margin: "0 0 5% 15%" }} className="goal-label ">
                                                        $ {zeroToKMGConverter(item.RetainGoal)}
                                                        {/* {
                                                            TierData.CurrentlyGauge.CurrentTier && TierData.CurrentlyGauge.NextTier !== null ?
                                                                (item.Subject === "Renewal" ? zeroToKMGConverter(item.RetainGoal) : zeroToKMGConverter(item.UpgradeGoal)) : (
                                                                    zeroToKMGConverter(item.RetainGoal)
                                                                )
                                                        } */}
                                                    </div>
                                                </Row>
                                            </Col>
                                        ))
                                    }
                                </Row>
                                <Row>
                                    {
                                        TierData.AttainmentGauge.map((item, index) => (
                                            <Col key={index}>
                                                <TierRevenueDetail dataSource={item} />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </>
                            : null
                    }
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        TierData: state.dashboard.uccDashboard.TierData
    };
};

export default connect(mapStateToProps, null)(TierBoard);