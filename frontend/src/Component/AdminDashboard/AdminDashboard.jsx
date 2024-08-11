// import React from 'react'
// import { useContext, useEffect, useState } from "react";
// import {UserContext} from '../Context/UserContext'
// import { Link } from "react-router-dom";
// import './AdminDashboard.css'

// const AdminDashboard = () => {

//   // const { user } = useContext(UserContext);

//   const formatDate = (dateTime) => {
//     if (!dateTime) {
//       return "Invalid Date";
//     }

//     const date = new Date(dateTime);
//     if (isNaN(date.getTime())) {
//       return "Invalid Date";
//     }

//     const options = {
//       weekday: "short",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: false,
//       timeZone: "UTC"
//     };

//     return new Intl.DateTimeFormat("en-US", options).format(date);
//   };

//     const shortenText = (text, n) => {
//       if (text.length > n) {
//         const shoretenedText = text.substring(0, n).concat("...");
//         return shoretenedText;
//       }
//       return text;
//     }
//     const date = new Date(Date.now() + 1)
//     // const newDate = date.now
//       return (
//         <>
//     <div className="--flex-center __homeDashCon">
//       <div className="__paraCon">
//         <h1 className="__paraHeader">Hi {formatDate(date)} </h1>
//       </div>

//       <div className="__lastCon">
//         <h3 className="__lastTitle">Quick Actions</h3>
//         <div className="__homeBtn">
//           <button className="__addBtn">
//             <Link to="/studentreg">Add student</Link>
//           </button>
//           <button className="__attendBtn">
//             <Link to="/attendance">Attendance</Link>
//           </button>
//         </div>
//       </div>
//     </div>
//     </>

//   )
//     }

// export default AdminDashboard

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
    <div className={styles.dashboard}>
        
      <AdminHead />
  

      <h2>Welcome to the Admin Dashboard</h2>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <h3>Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className={styles.statItem}>
          <h3>Resources</h3>
          <p>567</p>
        </div>
        <div className={styles.statItem}>
          <h3>Reports</h3>
          <p>89</p>
        </div>
      </div>
      <div className={styles.content}>
        <section id={styles.users}>
          <h3>Manage Users</h3>
          <UserManagement />
        </section>
        <section id={styles.resources}>
          <h3>Manage Resources</h3>
          <ResourceManagement />
          {/* Add resource management functionality here */}
        </section>
        <section id={styles.reports}>
          <h3>View Reports</h3>
          <Reports />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
