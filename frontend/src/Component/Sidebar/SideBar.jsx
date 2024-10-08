// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css"; // CSS for styling

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Navigation</h2>
      <ul>
        <li>
          <NavLink to="/user" activeClassName={styles.active}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/card" activeClassName={styles.active}>
            Disaster Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName={styles.active}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName={styles.active}>
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
