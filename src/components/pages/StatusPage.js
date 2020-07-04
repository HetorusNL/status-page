import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import PageItem from "../pages/PageItem";

const StatusPage = ({ configFile }) => {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [errors, setErrors] = useState(false);

  async function fetchData() {
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
      marginTop: "1rem",
      marginBottom: "1rem",
    };
    return (
      <Fragment>
        <div style={pagesStyle}>
          {console.log(pages)}
          {pages.map((page) => (
            <PageItem key={page.url} page={page} />
          ))}
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

StatusPage.propTypes = {
  configFile: PropTypes.string.isRequired,
};

export default StatusPage;
