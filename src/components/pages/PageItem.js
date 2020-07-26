import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";

const PageItem = ({ page, usesSSO, ssoProtectedPagesFound }) => {
  const LoadState = {
    LOADING: "loading",
    LOADED: "loaded",
    SSO: "SSO",
    ERROR: "error",
  };

  const [faviconState, setFaviconState] = useState(LoadState.LOADING);
  const [loadState, setLoadState] = useState(LoadState.LOADING);

  const faviconPaths = [
    page.url + "/favicon.ico",
    page.url + "/images/favicon.ico",
    page.url + "/favicon.png",
    page.url + "/images/favicon.png",
  ];
  page.favicon && faviconPaths.unshift(page.favicon);

  const getLoadStateFromRes = (res) => {
    if (res.redirected && res.url.includes("sso.hetorus.nl/login")) {
      ssoProtectedPagesFound(true);
      return LoadState.SSO;
    } else {
      return res.ok ? LoadState.LOADED : LoadState.ERROR;
    }
  };

  async function fetchPage() {
    try {
      await fetch(page.url, {
        cache: "no-store",
        credentials: usesSSO ? "include" : "omit",
      }).then((res) => {
        setLoadState(getLoadStateFromRes(res));
      });
    } catch (err) {
      console.log("error while trying to fetch:", page.url, ":", err);
      setLoadState(LoadState.ERROR);
    }
  }

  async function fetchFavicon() {
    if (page.favicon) {
      try {
        await fetch(page.favicon, {
          cache: "no-store",
          credentials: usesSSO ? "include" : "omit",
        }).then((res) => {
          const faviconLoadState = getLoadStateFromRes(res);
          setFaviconState(
            faviconLoadState === LoadState.LOADED
              ? page.favicon
              : faviconLoadState
          );
        });
      } catch (err) {
        console.log("error while trying to fetch:", page.favicon, ":", err);
        setFaviconState(LoadState.ERROR);
      }
    } else {
      setFaviconState(LoadState.ERROR);
    }
  }

  // disable eslint warning, since we don't want to
  // put asyncc functions in dependency array of useEffect
  useEffect(() => {
    fetchPage();
    fetchFavicon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFavicon = () => {
    const renderText = (text) => {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80px",
            margin: "3.5px",
          }}
        >
          <strong style={{ fontSize: "1.4em" }}>{text}</strong>
        </div>
      );
    };
    switch (faviconState) {
      case LoadState.LOADING:
        return (
          <Spinner width="80px" height="80px" backgroundColor="transparent" />
        );
      case LoadState.ERROR:
        return renderText(
          <div>
            No <br /> favicon!
          </div>
        );
      case LoadState.SSO:
        return renderText(
          <div>
            SSO <br /> protected!
          </div>
        );
      default:
        return (
          <img
            src={faviconState}
            alt=""
            className="round-img"
            style={{ width: "80px", height: "80px" }}
          />
        );
    }
  };

  const renderStatus = () => {
    switch (loadState) {
      case LoadState.LOADING:
        return (
          <Spinner width="60px" height="60px" backgroundColor="transparent" />
        );
      case LoadState.LOADED:
        return (
          <strong style={{ color: "var(--success-color)" }}>ONLINE</strong>
        );
      case LoadState.SSO:
        return (
          <strong style={{ color: "var(--danger-color)" }}>
            SSO PROTECTED
          </strong>
        );
      case LoadState.ERROR:
        return (
          <strong style={{ color: "var(--danger-color)" }}>OFFLINE</strong>
        );
      default:
        return (
          <strong style={{ color: "var(--danger-color)" }}>
            UNKNOWN STATE {loadState}
          </strong>
        );
    }
  };

  return (
    <div className="card text-center">
      {renderFavicon()}
      <p>
        <a
          className="btn"
          href={page.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <strong>{page.name}</strong>
        </a>
      </p>
      <p>
        <strong>Status:</strong>
      </p>
      {renderStatus()}
      {/* the json content is shown for debug purposes */}
      {/* but hidden by default (display: "none") */}
      <pre
        className="debug-data"
        style={{ textAlign: "left", fontSize: "12px" }}
      >
        {JSON.stringify(page, null, "  ")}
      </pre>
    </div>
  );
};

PageItem.defaultProps = {
  usesSSO: false,
};

PageItem.propTypes = {
  page: PropTypes.object.isRequired,
  usesSSO: PropTypes.bool.isRequired,
};

export default PageItem;
