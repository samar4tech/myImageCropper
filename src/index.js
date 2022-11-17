import React from "react";
import ReactDOM from "react-dom/client";
import ImageContext from "./store/ImageContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ImageContext>
    <App />
  </ImageContext>
);
