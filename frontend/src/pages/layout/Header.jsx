// src/pages/layout/Header.js

import React from "react";
import { NavLink } from "react-router-dom";

function Header({setToggle}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 shadow-sm">

      {/* Toggle button (for mobile) */}
      {/* <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button> */}

      <button type="button" className="btn btn-secondary btn-sm" onClick={(prev)=>setToggle(prev=> !prev)}>
        <span className="navbar-toggler-icon"></span>
      </button>


      {/* Right Side */}
      <div className="collapse navbar-collapse justify-content-end" id="navbarContent">

        <ul className="navbar-nav">

          <li className="nav-item">
            <NavLink to="/reports" className="nav-link">
              Reports
            </NavLink>
          </li>

          {/* Profile dropdown */}
          <li className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              👤 Admin
            </a>

            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item text-danger" href="#">Logout</a></li>
            </ul>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Header;