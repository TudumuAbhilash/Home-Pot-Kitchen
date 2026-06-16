import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

import ProfileDropdown from "./ProfileDropdown";

import "../styles/AdminNavbar.css";

function AdminNavbar() {
  return (
    <header className="admin-navbar">

      <div className="navbar-left">
        <h2>Dashboard</h2>
      </div>

      <div className="navbar-right">

        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <button className="notification-btn">
          <FaBell />

          <span className="notification-badge">
            3
          </span>
        </button>

        <ProfileDropdown />

      </div>

    </header>
  );
}

export default AdminNavbar;