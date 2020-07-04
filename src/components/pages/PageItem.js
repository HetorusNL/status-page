import React, { useState } from "react";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";

const PageItem = ({ page }) => {
  const [favicon, setFavicon] = useState();
  const [faviconIndex, setFaviconIndex] = useState(0);
  const [faviconFailed, setFaviconFailed] = useState(false);
  const faviconPaths = [
    page.url + "/favicon.ico",
    page.url + "/images/favicon.ico",
    page.url + "/favicon.png",
    page.url + "/images/favicon.png",
  ];
  page.favicon && faviconPaths.unshift(page.favicon);

  return (
    <div className="card text-center">
      {faviconFailed ? (
        <div>
          <Spinner height="60px" backgroundColor="transparent" />
          <strong>No favicon found!</strong>
        </div>
      ) : (
        <img
          src={faviconPaths[0]}
          ref={(img) => setFavicon(img)}
          alt=""
          onError={async () => {
            if (faviconIndex + 1 < faviconPaths.length) {
              setFaviconIndex(faviconIndex + 1);
              favicon.src = faviconPaths[faviconIndex + 1];
            } else {
              setFaviconFailed(true);
            }
          }}
          className="round-img"
          style={{ width: "80px", height: "80px" }}
        />
      )}
      <p>
        <a
          className="btn"
          href={page.url}
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <strong>{page.name}</strong>
        </a>
      </p>
      <p>
        <strong>Status:</strong>
      </p>
      <br />
      <pre style={{ textAlign: "left", fontSize: "12px" }}>
        {JSON.stringify(page, null, "  ")}
      </pre>
    </div>
  );
};

PageItem.propTypes = {
  page: PropTypes.object.isRequired,
};

export default PageItem;
