import { useState } from "react";
import "../styles/ProfileDropdown.css";
import { useAdminAuth } from "../../context/AdminAuthContext";import { useNavigate, } from "react-router-dom";

function ProfileDropdown() {
  const [open, setOpen] =
    useState(false);
  const { logout } =
  useAdminAuth();

  const navigate =
  useNavigate();
  return (
    <div className="profile-dropdown">

      <button
        className="profile-btn"
        onClick={() =>
          setOpen(!open)
        }
      >
        👤 Admin ▼
      </button>

      {open && (
        <div className="dropdown-menu">

          <button>
            Profile
          </button>

          <button>
            Settings
          </button>

          <button
           onClick={() => {
           logout();

             navigate(
            "/admin/login"
           );
          }}
          >
          Logout
          </button>

        </div>
      )}

    </div>
  );
}

export default ProfileDropdown;