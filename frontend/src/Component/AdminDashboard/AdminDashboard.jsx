import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom"; // Use history for redirect
import styles from "./AdminDashboard.module.css";

export const shortenText = (text = '', n) => {
  return text.length > n ? text.substring(0, n).concat("...") : text;
};

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [totalRegions, setTotalRegions] = useState(0);

  
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user");
        const users = response.data;
        setUsers(users);


        // Total reports and regions
        setTotalReports(users.length);
        const uniqueRegions = new Set(users.map(user => user.location));
        setTotalRegions(uniqueRegions.size);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Example of navigation logic
  const goToReportDetails = (id) => {
    navigate(`/report/${id}`); // Navigate to specific report details page
  };

  // if (!user || user.role !== 'admin') {
  //   return <p>Not Authorized to view this dashboard.</p>;
  // }

  return (
    <div className={styles.dashboard}>
      <div className={styles.content}>
        <div className={styles.topSection}>
          <h1>Dashboard</h1>
        </div>

        <div className={styles.statistics}>
          <div className={styles.statCard}>
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Reports</h3>
            <p>{totalReports}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Regions</h3>
            <p>{totalRegions}</p>
          </div>
        </div>

        {/* Table Section */}
        <div className={styles.tableSection}>
          <h2>User Data</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Phone</th>
                <th>Disaster Type</th>
                <th>Location</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.disasterType}</td>
                  <td>{user.location}</td>
                  <td>{shortenText(user.report, 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Regions Data</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Regions</th>
              </tr>
            </thead>
            <tbody>
              {[...new Set(users.map(user => user.location))].map((region, index) => (
                <tr key={index}>
                  <td>{region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
