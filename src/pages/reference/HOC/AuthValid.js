import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withCookies } from "react-cookie";
import { checkSignInToken, initAuthReducer } from "../../../redux/actions/authActions";

export default function (ComposedComponent) {
  class AuthValid extends Component {
    constructor(props) {
      super(props);
      this.mount = false;
    }

    componentDidMount() {
      this.mount = true;
      const { cookies, location } = this.props;
      if (this.mount) {
        setTimeout(() => {
          this.props.checkSignInToken(cookies, location.pathname);
        }, 10);
      }
    }

    componentWillUnmount() {
      if (this.mount) {
        this.props.initAuthReducer();
      }
      this.mount = false;
    }
    render() {
      const { isLoaded, isSignedIn, locationPathName } = this.props;
      if (!isLoaded || !this.mount) return null;

      if (isSignedIn) {
        switch (locationPathName) {
          case "/":
          case "/AuthHandling":
          case "/ResponseHandling":
            return <Redirect to="/Dashboard" />;
          default:
            return <ComposedComponent {...this.props} />;
        }
      } else {
        switch (locationPathName) {
          case "/":
          case "/AuthHandling":
          case "/ResponseHandling":
            return <ComposedComponent {...this.props} />;
          default:
            return <Redirect to="/" />;
        }
      }
    }
  }
  const mapStateToProps = (state) => {
    return {
      isSignedIn: state.auth.isSignedIn,
      isLoaded: state.auth.isLoaded,
      authErr: state.auth.authErrMsg,
      locationPathName: state.auth.locationPathName
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      checkSignInToken: (cookieProps, pathName) => dispatch(checkSignInToken(cookieProps, pathName)),
      initAuthReducer: () => dispatch(initAuthReducer())
    };
  };
  return connect(mapStateToProps, mapDispatchToProps)(withCookies(AuthValid));
}