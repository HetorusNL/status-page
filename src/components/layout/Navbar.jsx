import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({
  icon,
  iconPlayPause,
  title,
  groupFailReason,
  userIsInGroup,
  connectedToRSOnline,
  navbarCallback,
}) => {
  return (
    <nav className="navbar bg-primary" style={{ marginBottom: "0px" }}>
      <Link to="/">
        <h1>
          <i className={icon}></i> {title}
        </h1>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "HetorusNL Status Page",
  groupFailReason: "",
  connectedToRSOnline: false,
  iconPlayPause: "fa-play-circle fa-2x",
  icon: "fab fa-react",
  navbarCallback: undefined,
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  groupFailReason: PropTypes.string.isRequired,
  connectedToRSOnline: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  iconPlayPause: PropTypes.string.isRequired,
  navbarCallback: PropTypes.func.isRequired,
};

export default Navbar;
