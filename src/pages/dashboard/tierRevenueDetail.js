import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { currencySymbolGenerator, zeroRoundOffToKMGConverter } from "../../utility/common";
import "./dashboard.css";

class TierRevenueDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataSource } = this.props;
    let yoyRange =  dataSource.RevenueYoYRate * 100 > -1 && dataSource.RevenueYoYRate * 100 < 1 && dataSource.RevenueYoYRate !== 0.000 ? Number((dataSource.RevenueYoYRate * 100).toFixed(1)) : Math.round(Number((dataSource.RevenueYoYRate * 100)));
    const region = "NABU";
    
    return (
      <Card className="mb-0 u-board-shadow tier-revenue-board">
        <CardBody className="pt-2">
          <Row style={{ marginTop: "2px"}}>
            <Col>
              <div className={"tier-revenue-bar " + (yoyRange >= 0 ? "tier_revenue_bar_passive" : "tier_revenue_bar_negative") }>
                YoY {yoyRange >= 0 ? (yoyRange !== 501 ? "+" + yoyRange : ">=500") : yoyRange}%
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: "10px"}}>
            <Col><span className="tier_revenue_context font-interstate">{currencySymbolGenerator(region) + zeroRoundOffToKMGConverter(dataSource.RevenueValue)}</span></Col>
          </Row>
          <Row style={{ marginTop: "2px"}}>
            <Col><span className="tier_revenue_subtitle">{dataSource.Subject} Revenue</span></Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default TierRevenueDetail;