import React from "react";
import { Row, Col, Button, Card, CardBody, UncontrolledAlert } from "reactstrap";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { ReactComponent as TMLogoBtn } from "../../assets/img/brands/core-blue50-black.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import * as Setup from "../../utility/common";
import "./login.css";

class ADFSLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    document.title = "Garage";
  }

  redirectToADFS = () => {
    this.props.history.push("/AuthHandling");
  }

  render() {
    const { authErrorMsg } = this.props;

    return (
      <div>
        <Card className="mb-1">
          <CardBody>
            <Row style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}>
              <Col>
                <h2>CTBC Digital Platform</h2>
                <p className="lead">Know you partner better and faster.</p>
                <div style={{ marginTop: "30px" }}>
                  <Button className="adfsLoginBtn" onClick={this.redirectToADFS}>
                    <TMLogoBtn style={{ width: "30px", marginRight: "10px" }} />
                    <span>Trenders - ADFS</span>
                  </Button>
                </div>
              </Col>
            </Row>
            <div className="float-right" style={{ color: "#A9A9A9", fontSize: "10px" }}>
              {Setup.getGithubVersionNumber()}
            </div>
          </CardBody>
        </Card>
        {
          authErrorMsg !== "" ?
            <UncontrolledAlert color={"danger"} style={{ marginTop: "10px" }}>
              <div className="alert-icon">
                <FontAwesomeIcon icon={faBell} fixedWidth />
              </div>
              <div className="alert-message">
                <strong>{authErrorMsg}</strong>
              </div>
            </UncontrolledAlert>
            :
            null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authErrorMsg: state.adfslogin.authErrorMsg
  };
};

export default connect(mapStateToProps, null)(withCookies(ADFSLogin));