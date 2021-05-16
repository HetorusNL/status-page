import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import PageItem from "../pages/PageItem";

const StatusPage = ({ configFile, usesSSO }) => {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [errors, setErrors] = useState(false);
  const [ssoProtectedPages, setSsoProtectedPages] = useState(false);

  async function fetchData() {
    console.log(configFile, usesSSO);
    const res = await fetch(configFile, { cache: "no-store" });
    await res
      .json()
      .then((res) => {
        if (Array.isArray(res)) setPages(res);
        else setErrors(true);
      })
      .catch((err) => setErrors(err));
    setLoading(false);
  }

  // disable eslint warning, since we don't want to
  // put fetchData in dependency array of useEffect
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    const pagesStyle = {
      display: "grid",
      maxWidth: "1200px",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gridGap: "1rem",
      marginLeft: "auto",
      marginRight: "auto",
    };
    return (
      <Fragment>
        {ssoProtectedPages && (
          <Fragment>
            <div style={{ textAlign: "center" }}>
              Found SSO protected pages!
              <br />
              Login below and click the button to reload the page
            </div>
            <div style={{ margin: "1rem", textAlign: "center" }}>
              <div className="btn" onClick={() => window.location.reload()}>
                Reload
              </div>
            </div>
            <div style={pagesStyle}>
              <iframe
                title="SSO Iframe"
                src="https://sso.hetorus.nl/auth?redirect_url=https%3A%2F%2Fsso.hetorus.nl%2F"
                style={{
                  width: "100%",
                  minHeight: "400px",
                }}
              ></iframe>
            </div>
          </Fragment>
        )}
        <div style={{ margin: "1rem" }}>
          <div style={pagesStyle}>
            {pages.map((page) => (
              <PageItem
                key={page.url}
                page={page}
                usesSSO={usesSSO}
                ssoProtectedPagesFound={(found) =>
                  setSsoProtectedPages(ssoProtectedPages || found)
                }
              />
            ))}
          </div>
        </div>
        {errors && (
          <div
            style={{
              color: "var(--danger-color)",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Error while fetching status pages config file ({configFile})!
          </div>
        )}
      </Fragment>
    );
  }
};

StatusPage.defaultProps = {
  usesSSO: false,
};

StatusPage.propTypes = {
  configFile: PropTypes.string.isRequired,
  usesSSO: PropTypes.bool.isRequired,
};

export default StatusPage;
