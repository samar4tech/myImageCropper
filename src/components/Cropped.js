import React from "react";
import ReactDOM from "react-dom";
import styled from "./cropped.module.css";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { Container, Row, Col } from "react-bootstrap";

const Cropped = (props) => {
  return ReactDOM.createPortal(
    <Container
      className={`container-fluid my-0  ${styled.con}`}
      style={{ minWidth: "100vw", backgroundColor: "white" }}
    >
      <Row
        className="p-4"
        style={{ color: "white", backgroundColor: "rgba(1,1,1,0.8)" }}
      >
        <Col className="col-1 d-flex justify-content-center align-items-center">
          <span
            className="material-symbols-outlined"
            style={{ fontWeight: "800" }}
          >
            arrow_back_ios
          </span>
        </Col>
        <Col className="col-11 d-flex justify-content-end">
          <span onClick={props.cropButtonHandler} style={{ cursor: "pointer" }}>
            CROP
          </span>
        </Col>
      </Row>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "rgba(1,1,1,0.4)", minHeight: "100vh" }}
      >
        <Col className="col-12 my-3 d-flex justify-content-center  ">
          <ReactCrop
            src={props.image}
            crop={props.crop}
            onChange={props.onChange}
            onComplete={props.onComplete}
          >
            <img
              src={props.image}
              style={{ maxWidth: "500px", maxHeight: "500px" }}
              ref={props.rcImageRef}
            />
          </ReactCrop>
        </Col>
      </Row>
    </Container>,
    document.getElementById("cropRoot")
  );
};

export default Cropped;
