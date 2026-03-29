import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (

    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      {/* Logo */}
      <a href="/" className="d-flex align-items-center mb-1 text-white text-decoration-none">
        <span className="fs-4">🚚 Fleet</span>
      </a>

      <hr />

      {/* Menu */}
      <ul className="nav nav-pills flex-column mb-auto">

        <li className="nav-item">
          <NavLink to="/" end className="nav-link text-white">
            📊 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/vehicles" className="nav-link text-white">
            🚗 Vehicles
          </NavLink>
        </li>

        <li>
          <NavLink to="/drivers" className="nav-link text-white">
            🧑‍✈️ Drivers
          </NavLink>
        </li>

        <li>
          <NavLink to="/trips" className="nav-link text-white">
            🛣️ Trips
          </NavLink>
        </li>

        <li>
          <NavLink to="/history" className="nav-link text-white">
            History
          </NavLink>
        </li>


      </ul>

      <hr />

      {/* Bottom */}
      <div>
        <NavLink to="/logout" className="nav-link text-danger">
          🚪 Logout
        </NavLink>
      </div>
    </div>

  )
}

export default Sidebar;