import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaClipboardList,
  FaUtensils,
  FaUsers,
  FaChartLine,
  FaCog,
  FaBars,
} from "react-icons/fa";

import "../styles/Sidebar.css";

function AdminSidebar() {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <aside
      className={`sidebar ${
        collapsed ? "collapsed" : ""
      }`}
    >
       

      <div className="sidebar-header">

        <button
        className="menu-toggle"
         onClick={() =>
           setCollapsed(!collapsed)
         }
       >
          <FaBars />
            </button>

             {!collapsed && (
                <div className="logo-content">
               <h3>🍲 Home Pot</h3>
              <p>Admin Panel</p>
            </div>
            )}

            </div>

      <nav className="sidebar-nav">

        <NavLink to="/admin">
          <FaHome />
          {!collapsed && (
            <span>Dashboard</span>
          )}
        </NavLink>

        <NavLink to="/admin/orders">
          <FaClipboardList />
          {!collapsed && (
            <span>Orders</span>
          )}
        </NavLink>

        <NavLink to="/admin/menu">
          <FaUtensils />
          {!collapsed && (
            <span>Menu</span>
          )}
        </NavLink>

        <NavLink to="/admin/customers">
          <FaUsers />
          {!collapsed && (
            <span>Customers</span>
          )}
        </NavLink>

        <NavLink to="/admin/analytics">
          <FaChartLine />
          {!collapsed && (
            <span>Analytics</span>
          )}
        </NavLink>

        <NavLink to="/admin/settings">
          <FaCog />
          {!collapsed && (
            <span>Settings</span>
          )}
        </NavLink>

      </nav>
    </aside>
  );
}

export default AdminSidebar;