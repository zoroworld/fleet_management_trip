// src/pages/layout/Footer.js

import React from "react";

function Footer() {
  return (
    <footer className="bg-light text-center text-muted py-3 border-top">
      <div className="container-fluid">

        {/* Top Row */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">

          {/* Left */}
          <span>
            © {new Date().getFullYear()} Fleet Management System
          </span>

          {/* Right Links */}
          <div>
            <a href="#" className="text-decoration-none me-3">Privacy</a>
            <a href="#" className="text-decoration-none me-3">Terms</a>
            <a href="#" className="text-decoration-none">Support</a>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer;