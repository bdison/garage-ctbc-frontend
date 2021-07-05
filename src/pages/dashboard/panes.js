import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { Route } from "react-router-dom";
import { paneIconConverter } from "../../utility/common";
import "./dashboard.css";

class PanesRouter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  actions = {
    handleOnClick: (e, routeProps, paneData) => {
      const count = paneData.Count;
      const listPath = "/List/" + paneData.Key;
      const history = routeProps.history;
      paneData.Key && count > 0 ? history.push(listPath) : e.preventDefault();
    }
  }
  render() {
    const { paneArray } = this.props;
    const { handleOnClick } = this.actions;
    return (
      <Route path="/Dashboard" render={routerProps => {
        return (
          <Card className={"mb-0 panes-router-board u-board-shadow " + (paneArray.Count > 0 ? "u-hover-pointer" : "u-hover-not-allowed")}
            onClick={(e) => {
              handleOnClick(e, routerProps, paneArray);
            }}>
            <CardBody>
              <Row>
                <Col>{paneIconConverter(paneArray.Key)}</Col>
                <Col><span className={"pane_number"}>{paneArray.Count}</span></Col>
              </Row>
              <Row>
                <Col><span className={"pane_title"}>{paneArray.Title}</span></Col>
              </Row>
              <Row>
                <Col><span className={"pane_subtitle"}>{paneArray.SubTitle}</span></Col>
              </Row>
            </CardBody>
          </Card>
        );
      }} />
    );
  }
}

export default PanesRouter;