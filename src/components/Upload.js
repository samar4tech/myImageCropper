import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "./upload.module.css";
import Cropped from "./Cropped";
import Mymodal from "./Mymodal";
import "react-image-crop/dist/ReactCrop.css";
import { PhotoContext } from "../store/ImageContext";

import { Container, Row, Col } from "react-bootstrap";
function Upload() {
  const photoctx = useContext(PhotoContext);
  const photoBtn = photoctx.imageBtnUse;

  const [image, setImage] = useState(null);
  const [isUploadBtnClicked, setUploadBtnClicked] = useState(false);
  const [isCancelBtnClicked, setCancelBtnClicked] = useState(false);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const rcImageRef = useRef();
  const canvasRef = useRef();
  const anotherCanvasRef = useRef();

  ///////////////////////////////////////
  //////////////////reading the user chosen single file's url////////////////////////
  const imageChangeHandler = (e) => {
    console.log("running 1", e.target.files);

    const { files } = e.target;
    if (files && files.length > 0) {
      console.log("running 2");
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
        setUploadBtnClicked(true);
      });
    }
  };

  ////////////////////////////////
  ///////////////////////////////
  useEffect(() => {
    if (!completedCrop || !rcImageRef) {
      return;
    }

    const rc_image = rcImageRef.current;
    photoctx.userChosenImgFun({ image: rc_image, crop: completedCrop });
    const canvas = canvasRef.current;

    const crop = completedCrop;

    const scaleX = rc_image.naturalWidth / rc_image.width;
    const scaleY = rc_image.naturalHeight / rc_image.height;
    const pixelRatio = window.devicePixelRatio;
    const dImageWidth = crop.width * scaleX;
    const dImageHeight = crop.height * scaleY;
    canvas.width = dImageWidth * pixelRatio;
    canvas.height = dImageHeight * pixelRatio;
    const ctx = canvas.getContext("2d");

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(
      rc_image,
      crop.x * scaleX,
      crop.y * scaleY,
      dImageWidth,
      dImageHeight,
      0,
      0,
      dImageWidth,
      dImageHeight
    );
  }, [completedCrop]);

  ////////////////////////////////another canvas//////////
  ////////////////////////anotherCanvas///////////////
  useEffect(() => {
    if (!completedCrop || !rcImageRef) {
      return;
    }

    if (photoBtn) {
      const canvas2 = anotherCanvasRef.current;

      const scaleXAnother =
        photoctx.userChosenImg.image.naturalWidth /
        photoctx.userChosenImg.image.width;
      const scaleYAnother =
        photoctx.userChosenImg.image.naturalHeight /
        photoctx.userChosenImg.image.height;
      const pixelRatioAnother = window.devicePixelRatio;
      const dImageWidthAnother =
        photoctx.userChosenImg.crop.width * scaleXAnother;
      const dImageHeightAnother =
        photoctx.userChosenImg.crop.height * scaleYAnother;
      canvas2.width = dImageWidthAnother * pixelRatioAnother;
      canvas2.height = dImageHeightAnother * pixelRatioAnother;
      const ctxAnother = canvas2.getContext("2d");

      ctxAnother.setTransform(pixelRatioAnother, 0, 0, pixelRatioAnother, 0, 0);

      ctxAnother.imageSmoothingEnabled = true;
      ctxAnother.drawImage(
        photoctx.userChosenImg.image,
        crop.x * scaleXAnother,
        crop.y * scaleYAnother,
        dImageWidthAnother,
        dImageHeightAnother,
        0,
        0,
        dImageWidthAnother,
        dImageHeightAnother
      );
    }
  }, [photoBtn]);

  ///////////////////////////
  //////////////cancel handler////////////////////
  const cancelHandler = () => {
    setCancelBtnClicked(true);
  };
  ///////////////////////
  const [isCroppedClicked, setIsCroppedClicked] = useState(false);
  const cropBtnHandler = () => {
    setIsCroppedClicked(true);
  };
  //////////////////////////

  ///////////////////////////

  //////////////////////
  const cropHandler = (c) => {
    setCrop(c);
  };

  const completeHandler = (c) => {
    setCompletedCrop(c);
  };

  /////////////////////

  return (
    <Container
      className="container my-3"
      style={{
        maxWidth: "90vw",
        border: `1px solid rgb(237,231,225) `,
        borderRadius: "10px",
      }}
    >
      <Row className="pt-3">
        <Col
          className="col-12 d-flex justify-content-center"
          style={{ color: "grey" }}
        >
          Upload Image
        </Col>
      </Row>
      <Row className="p-3">
        <Col className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex justify-content-center">
          <label className={styled.customUpload}>
            <input onChange={imageChangeHandler} type="file" accept="image/*" />
            Choose from Device
          </label>
        </Col>
      </Row>
      {isUploadBtnClicked && !isCroppedClicked && image && (
        <Cropped
          image={image}
          crop={crop}
          onChange={cropHandler}
          onComplete={completeHandler}
          rcImageRef={rcImageRef}
          canvasRef={canvasRef}
          cropButtonHandler={cropBtnHandler}
        />
      )}
      {!photoctx.imageBtnUse && !isCancelBtnClicked && (
        <Mymodal
          myref={canvasRef}
          isCroppedClicked={isCroppedClicked}
          cancelHandler={cancelHandler}
        />
      )}

      {photoctx.imageBtnUse && (
        <Row className=" d-flex justify-content-center ">
          <Col className="col-12  d-flex justify-content-center ">
            <canvas
              ref={anotherCanvasRef}
              className="w-100 h-65 d-flex justify-content-center align-items-center"
              style={{
                clipPath: `${photoctx.canvas.userChoice}`,
                objectFit: "cover",
                transform: "scale(0.7) ",
              }}
            ></canvas>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Upload;
