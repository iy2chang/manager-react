import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ">
            {!user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
