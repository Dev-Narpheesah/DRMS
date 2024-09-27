import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminDashboard.module.css";
import UserManagement from "./UserManagement";
import Reports from "./Reports";
import AdminHead from "./AdminHead";
import ResourceManagement from "./ResourceManagement";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/admin/total-users"
        );
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users", error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className={styles["admin-dashboard"]}>
      <AdminHead />

      {/* Sidebar */}
      <aside className={styles["sidebar"]}>
        <nav className={styles["sidebar__nav"]}>
          <ul className={styles["sidebar__list"]}>
            <li className={styles["sidebar__item"]}><a href="#users">Manage Users</a></li>
            <li className={styles["sidebar__item"]}><a href="#resources">Manage Resources</a></li>
            <li className={styles["sidebar__item"]}><a href="#reports">View Reports</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={styles["admin-dashboard__main-content"]}>
        <div className={styles["admin-dashboard__welcome"]}>
          <h2>Welcome to the Admin Dashboard</h2>
          <p>Manage your resources and monitor key metrics effortlessly.</p>
        </div>

        <div className={styles["admin-dashboard__stats"]}>
          <div className={styles["admin-dashboard__stat-item"]}>
            <img src="lady.jpeg" alt="Users" className={styles["admin-dashboard__stat-icon"]} />
            <div>
              <h3>Users</h3>
              <p>{totalUsers}</p>
            </div>
          </div>
          <div className={styles["admin-dashboard__stat-item"]}>
            <img src="globe.jpeg" alt="Resources" className={styles["admin-dashboard__stat-icon"]} />
            <div>
              <h3>Resources</h3>
              <p>567</p>
            </div>
          </div>
          <div className={styles["admin-dashboard__stat-item"]}>
            <img src="natural.jpeg" alt="Reports" className={styles["admin-dashboard__stat-icon"]} />
            <div>
              <h3>Reports</h3>
              <p>89</p>
            </div>
          </div>
        </div>

        <div className={styles["admin-dashboard__content"]}>
          <section id="users" className={styles["admin-dashboard__section"]}>
            <h3>Manage Users</h3>
            <UserManagement />
          </section>
          <section id="resources" className={styles["admin-dashboard__section"]}>
            <h3>Manage Resources</h3>
            <ResourceManagement />
          </section>
          <section id="reports" className={styles["admin-dashboard__section"]}>
            <h3>View Reports</h3>
            <Reports />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
