import React from "react";
import { Container, Row, Col } from "reactstrap";
import tmlogo from "../assets/img/brands/IBM_HeroLogos.png";

const Footer = () => (
  <footer className="footer">
    <Container fluid>
      <Row className="text-muted">
        <Col xs="6" className="text-left">
          <img style={{ width: "35px" }} src={tmlogo} alt={"IBM garage"} />
        </Col>
        <Col xs="6" className="text-right">
            <span>&copy; {new Date().getFullYear()} -{" "}  IBM Gargage</span>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
