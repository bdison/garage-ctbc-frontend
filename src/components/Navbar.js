import React from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../redux/actions/sidebarActions";
import { Link } from "react-router-dom";
import { Collapse, Navbar, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Settings, Menu as MenuIcon } from "react-feather";
import { withCookies } from "react-cookie";
import * as Setup from "../../src/utility/common";

class NavbarComponent extends React.Component {
  render() {
    const { cookies, dispatch } = this.props;

    return (
      <Navbar
        style={{ borderBottom: "4px solid #198038" }} //#DB3D44
        color="white" light expand className="p-0">
        <span
          className="d-flex mr-0"
          onClick={() => {
            dispatch(toggleSidebar());
          }}
          style={{
            width: "40px",
            padding: "3px",
            cursor: "pointer",
            marginLeft: "10px"
          }}
        >
          <MenuIcon className="float-right" />
        </span>

        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <span className="d-inline-block d-sm-none">
                <DropdownToggle nav caret>
                  <Settings size={18} className="align-middle" />
                </DropdownToggle>
              </span>
              <span className="d-none d-sm-inline-block">
                <DropdownToggle nav caret>
                  <span className="text-dark">{Setup.getUserName(cookies)}</span>
                </DropdownToggle>
              </span>
              <DropdownMenu right>
                <Link to="/">
                  <DropdownItem
                    onClick={() => {
                      Setup.logoutEvent(cookies);
                    }}
                  >
                    Sign out
                  </DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default withCookies(
  connect(store => ({
    app: store.app
  }), null)(NavbarComponent)
);
