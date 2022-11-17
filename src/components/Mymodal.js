import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import styled from "./mymodal.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { PhotoContext } from "../store/ImageContext";

function Mymodal(props) {
  const [clipPathSetting, setClipPath] = useState(null);
  const photoctx = useContext(PhotoContext);

  /////////////////////////////image button handler////////

  const useImageHandler = () => {
    photoctx.clickUseImageBtn();
  };

  //////////////////////cancel handler/////////////////////
  const cancelHandler = () => {
    props.cancelHandler();
  };
  ///////////////////////////////choice handler//////////////////////
  const choiceHandler = (userChoice) => {
    switch (userChoice) {
      case "original": {
        setClipPath("");

        photoctx.setDomElem({
          refer: props.myref,
          userChoice: clipPathSetting,
        });

        break;
      }
      case "rectangle": {
        setClipPath("inset(0% 0% 0% 0% round 5%)");
        photoctx.setDomElem({
          refer: props.myref,
          userChoice: "inset(0% 0% 0% 0% round 5%)",
        });
        break;
      }
      case "square": {
        setClipPath("inset(0% 0% 0% 0% round 10%)");
        photoctx.setDomElem({
          refer: props.myref,
          userChoice: "inset(0% 0% 0% 0% round 10%)",
        });
        break;
      }
      case "circle": {
        setClipPath("circle(50%)");
        photoctx.setDomElem({ refer: props.myref, userChoice: "circle(50%)" });

        break;
      }
      case "heart": {
        setClipPath(
          "path('M213.1,6.7c-32.4-14.4-73.7,0-88.1,30.6C110.6,4.9,67.5-9.5,36.9,6.7C2.8,22.9-13.4,62.4,13.5,110.9 C33.3,145.1,67.5,170.3,125,217c59.3-46.7,93.5-71.9,111.5-106.1C263.4,64.2,247.2,22.9,213.1,6.7z')"
        );
        photoctx.setDomElem({
          refer: props.myref,
          userChoice:
            "path('M213.1,6.7c-32.4-14.4-73.7,0-88.1,30.6C110.6,4.9,67.5-9.5,36.9,6.7C2.8,22.9-13.4,62.4,13.5,110.9 C33.3,145.1,67.5,170.3,125,217c59.3-46.7,93.5-71.9,111.5-106.1C263.4,64.2,247.2,22.9,213.1,6.7z')",
        });
        break;
      }
      default: {
        setClipPath("");
        break;
      }
    }
  };
  const visibility = props.isCroppedClicked ? " " : "d-none";
  return ReactDOM.createPortal(
    <Container
      className={`container-fluid my-0  ${styled.con} ${visibility} d-flex justify-content-center align-items-center`}
      style={{
        minWidth: "100vw",
        backgroundColor: "rgba(1,1,1,0.3)",
        minHeight: "100vh",
      }}
    >
      <Container
        className=" mt-5 "
        style={{ backgroundColor: "white", maxWidth: "50vw" }}
      >
        <Row className="w-100 mx-auto mt-3">
          <Col className="col-12 d-flex justify-content-end p-3 ">
            <span
              onClick={cancelHandler}
              className="material-symbols-rounded overflow-hidden"
              style={{ cursor: "pointer" }}
            >
              cancel
            </span>
          </Col>
        </Row>
        <Row
          className={`d-flex justify-content-center mb-1 text-secondary ${styled.uploaded}`}
        >
          Uploaded Image
        </Row>
        <Row className=" d-flex justify-content-center ">
          <Col className="col-12  d-flex justify-content-center ">
            <canvas
              ref={props.myref}
              className="w-70 h-70 d-flex justify-content-center align-items-center"
              style={{
                clipPath: clipPathSetting,
                objectFit: "cover",
                transform: "scale(0.7) ",
              }}
            ></canvas>
          </Col>
        </Row>

        {/* ///////////////////choice section//////////////// */}
        <Row
          className={`my-2 d-flex mx-auto align-items-center w-50 pb-2 ${styled.row}`}
        >
          <Col
            className="col-3 d-flex justify-content-center p-0 border border-secondary  "
            style={{
              borderRadius: "10px",
              textShadow: "none",
            }}
          >
            <span
              onClick={choiceHandler.bind(null, "original")}
              className={`text-secondary d-flex justify-content-center align-items-center  overflow-hidden ${styled.borderChoice} ${styled.original}`}
            >
              Original
            </span>
          </Col>
          <Col
            className="col-2  border border-secondary p-0 "
            style={{ borderRadius: "10px" }}
          >
            <span
              onClick={choiceHandler.bind(null, "heart")}
              className={`material-symbols-outlined d-flex justify-content-center align-items-center   overflow-hidden ${styled.borderChoice}`}
            >
              favorite
            </span>
          </Col>
          <Col
            className="col-2  border border-secondary  p-0"
            style={{ borderRadius: "10px" }}
          >
            <span
              onClick={choiceHandler.bind(null, "square")}
              className={`material-symbols-outlined d-flex justify-content-center align-items-center   overflow-hidden ${styled.borderChoice}`}
            >
              crop_5_4
            </span>
          </Col>
          <Col
            className="col-2  border border-secondary p-0"
            style={{ borderRadius: "10px" }}
          >
            <span
              onClick={choiceHandler.bind(null, "rectangle")}
              className={`material-symbols-outlined d-flex justify-content-center align-items-center   overflow-hidden ${styled.borderChoice}`}
            >
              crop_16_9
            </span>
          </Col>
          <Col
            className="col-2  border border-secondary p-0"
            style={{ borderRadius: "10px" }}
          >
            <span
              onClick={choiceHandler.bind(null, "circle")}
              className={`material-symbols-outlined d-flex justify-content-center align-items-center   overflow-hidden ${styled.borderChoice}`}
            >
              radio_button_unchecked
            </span>
          </Col>
        </Row>
        <Row className="mb-3 p-3">
          <button
            onClick={useImageHandler}
            className="btn btn-lg "
            style={{ color: "white", backgroundColor: "#128c7e" }}
          >
            Use this image
          </button>
        </Row>
      </Container>
    </Container>,
    document.getElementById("modalRoot")
  );
}

export default Mymodal;
