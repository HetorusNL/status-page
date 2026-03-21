import React, { Fragment } from "react";

import spinner from "./spinner.svg";

const Spinner = ({ width, height, maxWidth, maxHeight, backgroundColor }) => (
  <Fragment>
    <div
      style={{
        width: width ? width : "100%",
        height: height ? height : "100%",
        margin: "auto",
        display: "block",
        // position: "absolute",
        textAlign: "center",
        backgroundColor: backgroundColor ? backgroundColor : "#00000077",
      }}
    >
      <img
        src={spinner}
        alt="Loading..."
        style={{
          maxWidth: maxWidth ? maxWidth : "75%",
          maxHeight: maxHeight ? maxHeight : "75%",
          height: "auto",
        }}
      />
    </div>
  </Fragment>
);

export default Spinner;
