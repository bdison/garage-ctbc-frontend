import React from "react";
import { Button, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, FormFeedback, Spinner, CustomInput, Badge } from "reactstrap";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import Select from "react-select";
import { signInSubmit, signInLoading, switchInputStatus } from "../../../redux/actions/loginActions";
import * as Setup from "../../../../src/utility/common";
import { ReactComponent as TMLogo } from "../../../assets/img/brands/trend-icon.svg";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      isRememberMe: true,
      domain: {
        value: "TREND",
        label: "TREND"
      }
    };
  }

  actions = {

    submitForm: (e) => {
      e.preventDefault();
      const regionDomain = this.regionSelect.props.value.value;
      const postAccount = this.state.account.toLowerCase();
      const postPassword = this.state.password;
      const cookieObj = {
        regionDomain: regionDomain,
        postAccount: postAccount,
        postRememberMe: this.state.isRememberMe
      };

      const apiBody = {
        username: regionDomain + ("\\") + postAccount,
        password: postPassword,
        description: "login"
      };

      if (postAccount.length > 0 && postPassword.length > 0) {
        const { cookies } = this.props;
        this.props.signInLoading();
        this.props.signInSubmit(apiBody, cookies, cookieObj);
      } else {
        this.props.switchInputStatus("has-danger");
      }
    },

    handleInputChange: async (event) => {
      const { target } = event;
      const { name } = target;
      this.props.switchInputStatus();
      const value = target.type === "checkbox" ? target.checked : target.value;
      await this.setState({
        [name]: value
      });
    },

    handleSelectChange: async (event) => {
      this.setState({
        domain: event
      });
    }
  }

  componentDidMount = () => {
    document.title = "CTBC Login";
    const { cookies } = this.props;
    const tempUsername = cookies.get("username");
    const tempRememberme = cookies.get("rememberme");
    const tempRegionDomain = cookies.get("regionDomain");

    if (tempRememberme === "true" && tempUsername !== undefined && tempRegionDomain !== undefined) {
      const tempDomain = { value: tempRegionDomain, label: tempRegionDomain };
      this.setState({
        account: tempUsername,
        domain: tempDomain
      });
    }

    if (tempRememberme === "false") {
      this.setState({ isRememberMe: false });
    }
  }
  componentWillUnmount = () => {
    this.props.switchInputStatus();
  }

  render() {
    const { domain, account, isRememberMe } = this.state;
    const { inputStatus, isBtnLoading, authErrorMsg } = this.props;
    const options = [
      { value: "TREND", label: "TREND" },
      { value: "TRENDUS", label: "TRENDUS" },
      { value: "TRENDPH", label: "TRENDPH" },
      { value: "TRENDJP", label: "TRENDJP" },
      { value: "TRENDEU", label: "TRENDEU" }
    ];

    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <h2>CTBC Digital Platform
            {
              Setup.envSetting() !== "prod" ?
                <span style={{ fontSize: "12px" }}> [beta]</span>
                :
                null
            }
          </h2>
          <p className="lead">Sign in by IBM account</p>
        </div>
        <Card>
          <CardBody>
            {
              Setup.envSetting() !== "prod" ?
                <Row>
                  <Col>
                    <Badge className="float-right mb-2" style={{ fontSize: "14px" }} color="danger">BETA VERSION</Badge>
                  </Col>
                </Row>
                :
                null
            }
            <div className="m-sm-4">
              <div className="text-center">
                <TMLogo />
              </div>
              <Form
                onSubmit={(e) => this.actions.submitForm(e)}
              >
                <FormGroup>
                  <Label>Domain</Label>
                  <Select
                    ref={(ref) => this.regionSelect = ref}
                    classNamePrefix="react-select"
                    options={options}
                    value={domain}
                    isDisabled={isBtnLoading}
                    onChange={
                      (event) => {
                        this.actions.handleSelectChange(event);
                      }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Account</Label>
                  <Input
                    bsSize="lg"
                    type="text"
                    name="account"
                    valid={inputStatus === "has-success"}
                    invalid={inputStatus === "has-danger"}
                    value={account}
                    autoComplete="off"
                    disabled={isBtnLoading}
                    onChange={
                      (event) => {
                        this.actions.handleInputChange(event);
                      }
                    }
                  />
                  <FormFeedback>
                    {authErrorMsg}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    bsSize="lg"
                    type="password"
                    name="password"
                    valid={inputStatus === "has-success"}
                    invalid={inputStatus === "has-danger"}
                    autoComplete="off"
                    disabled={isBtnLoading}
                    onChange={
                      (event) => {
                        this.actions.handleInputChange(event);
                      }
                    }
                  />
                  <small>
                    Enter your IBM account w/o Domain to sign in.
                  </small>
                </FormGroup>
                <div>
                  <CustomInput
                    type="checkbox"
                    id="rememberMe"
                    label="Remember me"
                    checked={isRememberMe}
                    disabled={isBtnLoading}
                    onChange={e => this.setState({ isRememberMe: e.target.checked })}
                  />
                </div>
                <div className="text-center mt-4">
                  <Button
                    color="primary"
                    size="lg"
                    type="submit"
                    disabled={isBtnLoading}
                  >
                    {
                      isBtnLoading ?
                        (
                          <Spinner color="#FFFFFF" size="sm" className="mr-2" type="grow" />
                        )
                        :
                        null
                    }
                    <span >Sign in</span>
                  </Button>
                </div>
              </Form>
            </div>
            <div className="float-right" style={{ color: "#A9A9A9", fontSize: "10px" }}>
              {Setup.gitVersionNumber()}
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inputStatus: state.login.inputStatus,
    isBtnLoading: state.login.isBtnLoading,
    authErrorMsg: state.login.authErrorMsg
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signInSubmit: (credential, cookieProps, cookieObj) => dispatch(signInSubmit(credential, cookieProps, cookieObj)),
    signInLoading: () => dispatch(signInLoading()),
    switchInputStatus: (status) => dispatch(switchInputStatus(status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(SignIn));