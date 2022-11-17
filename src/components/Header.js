import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <Container
      className="container-fluid my-3  mx-0 p-4 "
      style={{ maxWidth: "100vw", boxShadow: "0 6px 15px -15px #111" }}
    >
      <Row
        className="d-flex w-100 mx-0"
        style={{ color: "grey", fontSize: "1.4rem" }}
      >
        <Col className="col-1 d-flex justify-content-center align-items-center">
          <span
            className="material-symbols-outlined overflow-hidden"
            style={{ fontWeight: "800" }}
          >
            arrow_back_ios
          </span>
        </Col>
        <Col className="d-flex justify-content-center col-md-11 col-sm-11 col-11 align-items-center">
          Add Image / Icon
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
