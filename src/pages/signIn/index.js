import React from "react";
import { Button, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, FormFeedback, Spinner, CustomInput, Badge } from "reactstrap";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { signInSubmit, signInLoading, switchInputStatus } from "../../redux/actions/loginActions";
import * as Setup from "../../utility/common";
import { ReactComponent as TMLogo } from "../../assets/img/brands/logo_colordont_5.svg";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      isRememberMe: true
    };
  }

  actions = {
    submitForm: (e) => {
      e.preventDefault();
      const postAccount = this.state.account.toLowerCase();
      const postPassword = this.state.password;
      const cookieObj = {
        postAccount: postAccount,
        postRememberMe: this.state.isRememberMe
      };

      const apiBody = {
        username: postAccount,
        password: postPassword
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
    }
  }

  componentDidMount = () => {
    document.title = "CTBC Login";
    const { cookies } = this.props;
    const tempUsername = cookies.get("username");
    const tempRememberme = cookies.get("rememberme");

    if (tempRememberme === "true" && tempUsername !== undefined) {
      this.setState({
        account: tempUsername,
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
    const { account, isRememberMe } = this.state;
    const { inputStatus, isBtnLoading, authErrorMsg } = this.props;

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
          <p className="lead">Know you partner better and faster.</p>
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
              {/* {Setup.getGithubVersionNumber()} */}
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