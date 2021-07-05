import React from "react";
import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";


class ProfileBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { ProfileData } = this.props;
        return (
            <Row>
                <Col className="ml-2 mb-2">
                    <h5><b>Hi, {ProfileData.PartnerName}</b></h5>
                    <span>You currently run in the <b style={{ background: "#FD8346", color: "#DC4A02", padding: "0px 2px" }}> {ProfileData.PartnerType}</b> business type.</span>
                </Col>
                <Col className=" pb-3 d-flex justify-content-end">
                    <NavLink to="/CustomerList">
                        <Button color="primary">Customer List</Button>
                    </NavLink>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ProfileData: state.dashboard.uccDashboard.ProfileData
    };
};

export default connect(mapStateToProps, null)(ProfileBoard);