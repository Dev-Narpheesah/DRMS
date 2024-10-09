import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserDashboard.module.css";

export const shortenText = (text = '', n) => {
  return text.length > n ? text.substring(0, n).concat("...") : text;
};

const UserDashboard = () => {
  const { user } = useContext(UserContext); // Access logged-in user
  const { id } = useParams(); // Using id from URL params
  const [userReport, setUserReport] = useState(null); // Single user report
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserReport = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/report/${id}`); // API call to new endpoint
        setUserReport(response.data);
        console.log(response.data); // Check the structure of the data
      } catch (error) {
        console.error("Error fetching user report:", error);
      }
    };

    fetchUserReport();
  }, [id, navigate]); // Depend on id

  if (!userReport) {
    return <div>Loading...</div>; // Show loading if report is not fetched yet
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.content}>
        {/* Welcome Message */}
        <div className={styles.welcomeMessage}>
          <h1>Hi, {userReport?.email}</h1> {/* Replaced name with email */}
          <p>Welcome to your dashboard!</p>
        </div>

        {/* User Report in Table Format */}
        <div className={styles.tableSection}>
          <h2>Your Submitted Report</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Disaster Type</th>
                <th>Location</th>
                <th>Report</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userReport.disasterType}</td>
                <td>{userReport.location}</td>
                <td>{shortenText(userReport.report, 100)}</td>
                <td>
                  {userReport.image?.url ? (
                    <img
                      src={userReport.image.url}
                      alt="Report"
                      className={styles.reportImage}
                    />
                  ) : (
                    "No image"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
