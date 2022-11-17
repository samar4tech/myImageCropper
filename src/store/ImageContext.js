import React, { useState } from "react";

export const PhotoContext = React.createContext({
  canvas: "",
  setDomElem: (elem) => {},
  imageBtnUse: false,
  clickUseImageBtn: () => {},
  userChosenImg: "",
  userChosenImgFun: (img) => {},
});

function ImageContext(props) {
  const [selectElem, setSelectedElem] = useState("");
  const [isClicked, setClicked] = useState(false);
  const [userImg, setUserImg] = useState(null);

  const imgSet = (domElem) => {
    setSelectedElem(domElem);
  };
  const clicked = () => {
    setClicked(true);
  };
  const imgSettingFun = (img) => {
    setUserImg(img);
  };

  const contextValue = {
    canvas: selectElem,
    setDomElem: imgSet,
    imageBtnUse: isClicked,
    clickUseImageBtn: clicked,
    userChosenImg: userImg,
    userChosenImgFun: imgSettingFun,
  };
  return (
    <PhotoContext.Provider value={contextValue}>
      {props.children}
    </PhotoContext.Provider>
  );
}

export default ImageContext;
