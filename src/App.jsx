import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import CacheBuster from "./components/utils/CacheBuster";
import StatusPage from "./components/pages/StatusPage";

class App extends Component {
  state = {};

  navbarCallback(command, params = undefined) {
    console.log("navbarCallback(", command, ",", params, ")");
    switch (command) {
      default:
        console.log("unknown command: ", command);
        break;
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar navbarCallback={this.navbarCallback.bind(this)} />
          <CacheBuster>
            {({
              loading,
              isLatestVersion,
              currentVersion,
              latestVersion,
              refreshCacheAndReload,
            }) => {
              if (!loading && !isLatestVersion) {
                return (
                  <div
                    style={{
                      color: "var(--danger-color)",
                      marginLeft: "auto",
                      marginRight: "auto",
                      padding: "1em",
                    }}
                    onClick={refreshCacheAndReload}
                  >
                    There is a new version of HetorusNL Status Page available!
                    <br />
                    You are using {currentVersion} and {latestVersion} is
                    available.
                    <br /> Click on this message to reload the window. <br />
                    If this doesn't work try pressing Ctrl+F5 to force refresh
                  </div>
                );
              }
              return null;
            }}
          </CacheBuster>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <div>
                    <h1 style={{ textAlign: "center", marginTop: "0.5em" }}>
                      Websites status
                    </h1>
                    <StatusPage configFile="config/pages.json" />
                  </div>
                  <div>
                    <h1 style={{ textAlign: "center", marginTop: "0.5em" }}>
                      SSO Websites status
                    </h1>
                    <StatusPage configFile="config/pages_sso.json" usesSSO />
                  </div>
                </Fragment>
              )}
            />
            <Route
              exact
              path="/about"
              render={(props) => (
                <div className="container" style={{ margin: "0 auto 0 auto" }}>
                  <About />
                </div>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
