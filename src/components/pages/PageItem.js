import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";

const PageItem = ({ page }) => {
  const LoadState = {
    LOADING: "loading",
    LOADED: "loaded",
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

  async function fetchPage() {
    try {
      await fetch(page.url, { cache: "no-store" }).then((res) => {
        setLoadState(res.ok ? LoadState.LOADED : LoadState.ERROR);
      });
    } catch (err) {
      setLoadState(LoadState.ERROR);
    }
  }

  async function fetchFavicon() {
    if (page.favicon) {
      try {
        await fetch(page.favicon, { cache: "no-store" }).then((res) => {
          setFaviconState(res.ok ? page.favicon : LoadState.ERROR);
        });
      } catch (err) {
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

  return (
    <div className="card text-center">
      {faviconState === LoadState.LOADING ? (
        <Spinner width="80px" height="80px" backgroundColor="transparent" />
      ) : faviconState === LoadState.ERROR ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80px",
            margin: "3.5px",
          }}
        >
          <strong style={{ fontSize: "1.4em" }}>
            No <br />
            favicon!
          </strong>
        </div>
      ) : (
        <img
          src={faviconState}
          alt=""
          className="round-img"
          style={{ width: "80px", height: "80px" }}
        />
      )}
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
      {loadState === LoadState.LOADING ? (
        <Spinner width="60px" height="60px" backgroundColor="transparent" />
      ) : loadState === LoadState.LOADED ? (
        <strong style={{ color: "var(--success-color)" }}>ONLINE</strong>
      ) : (
        <strong style={{ color: "var(--danger-color)" }}>OFFLINE</strong>
      )}
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

PageItem.propTypes = {
  page: PropTypes.object.isRequired,
};

export default PageItem;
