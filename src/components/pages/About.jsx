import React, { Fragment } from "react";
import packageJson from "../../../package.json";

const About = () => {
  return (
    <Fragment>
      <h1>About This App</h1>
      <p>
        Status page showing the website status for normal websites and
        SSO-protected websites
      </p>
      <p>Version: {packageJson.version}</p>
    </Fragment>
  );
};

export default About;
