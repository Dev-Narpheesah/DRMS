// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import "./UserDashboard.css";
// import { IoMenu, IoCloseSharp, IoLogOutOutline } from "react-icons/io5"; // Logout Icon
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../../../context/userContext";
// import { toast } from "react-toastify";

// export const shortenText = (text = '', n) => {
//   if (text.length > n) {
//     const shortenedText = text.substring(0, n).concat("...");
//     return shortenedText;
//   }
//   return text;
// };

// const UserDashboard = () => {
//   const { user, setUser } = useContext(UserContext);
//   const [data, setData] = useState([]);
//   const [checkedInCount, setCheckedInCount] = useState(0);
//   const [checkedOutCount, setCheckedOutCount] = useState(0);
//   const [sidebarToggle, setSidebarToggle] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/admin/total-users"
//         );
//         const users = response.data;
//         setData(users);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const formatDate = (dateTime) => {
//     if (!dateTime) {
//       return "Invalid Date";
//     }
//     const date = new Date(dateTime);
//     const options = {
//       weekday: "short",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: false,
//       timeZone: "UTC",
//     };
//     return new Intl.DateTimeFormat("en-US", options).format(date);
//   };

//   const logout = async () => {
//     try {
//       await axios.post("http://localhost:4000/api/admin/logout", null, {
//         withCredentials: true,
//       });
//       setUser(null);
//       toast.success("User logged out! 😊");
//       navigate("/signin");
//     } catch (error) {
//       console.error("Failed to logout", error);
//     }
//   };


//   return (
//     <div className="--flex-center __homeDashCon">
//       <div className="__paraCon">
//         <h1 className="__paraHeader">
//           {user && user.username ? `Hi ${shortenText(user.username, 8)}` : "Hi User"}
//         </h1>
//         {user && user.profilePicture && (
//           <img
//             src={user.profilePicture}
//             alt="Profile"
//             className="__profilePicture"
//           />
//         )}
//       </div>
      
//       {/* Sidebar Toggle */}
//       <div className="__menuToggle">
//         <button onClick={() => setSidebarToggle(!sidebarToggle)}>
//           {sidebarToggle ? <IoCloseSharp /> : <IoMenu />}
//         </button>
//         {sidebarToggle && (
//           <div className="__sidebar">
//             <Link to="/profile">Profile</Link>
//             <Link to="/reports">Reports</Link>
//             <button className="__logoutBtn" onClick={logout}>
//               <IoLogOutOutline /> Logout
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Quick Stats */}
//       <div className="__secondCon">
//         <h3 className="__quickTitle">Quick Stats</h3>
//         <div className="__flex __boardss">
//           <div className="__board">
//             <p className="__boardHead">{data.length}</p>
//             <p className="__boardDetails"> Users</p>
//           </div>
//           <div className="__board">
//             <p className="__boardHead">{checkedInCount}</p>
//             <p className="__boardDetails">Reported</p>
//           </div>
//           <div className="__board">
//             <p className="__boardHead">{checkedOutCount}</p>
//             <p className="__boardDetails">View Reports</p>
//           </div>
//         </div>
//       </div>

//       {/* Add more functionality */}
//       <div className="__lastCon">
//         <div className="__homeBtn">
//           <button className="__addBtn">
//             <Link to="/signup">Add User</Link>
//           </button>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


// UserDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import DisasterCard from "../DisasterCard/DisasterCard"; // This component will display individual disaster reports
import Sidebar from "../Sidebar/SideBar"; // Importing the Sidebar
import styles from "./UserDashboard.module.css"; // CSS for styling

const UserDashboard = () => {
  const [reports, setReports] = useState([]);
  const [nextDisaster, setNextDisaster] = useState(null);
  const [totalReports, setTotalReports] = useState(0);
  const [totalRegions, setTotalRegions] = useState(0);
  const [stats, setStats] = useState({ flood: 0, earthquake: 0, fire: 0 });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user");
        const data = response.data;

        // Set unique disaster reports
        const uniqueReports = Array.from(new Set(data.map(report => report.disasterType)))
          .map(disasterType => data.find(report => report.disasterType === disasterType));
          
        setReports(uniqueReports);
        setNextDisaster(uniqueReports[0]); // Assuming the first unique report is the next disaster

        // // Update statistics
        const stats = {
          flood: uniqueReports.filter((r) => r.disasterType === "flood").length,
          earthquake: uniqueReports.filter((r) => r.disasterType === "earthquake").length,
          fire: uniqueReports.filter((r) => r.disasterType === "fire").length,
        };
        setStats(stats);

        setTotalReports(uniqueReports.length);
        const regions = new Set(uniqueReports.map((r) => r.location));
        setTotalRegions(regions.size);
      } catch (error) {
        console.error("Error fetching disaster reports:", error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className={styles.dashboard}>
      {/* <Sidebar />  */}
      <div className={styles.content}>
        {/* Top Section */}
        <div className={styles.topSection}>
          <h1>Dashboard</h1>
          <div className={styles.nextDisaster}>
            <h2>Next Reported Disaster</h2>
            {nextDisaster ? (
              <div>
                <p>
                  <strong>Type:</strong> {nextDisaster.disasterType}
                </p>
                <p>
                  <strong>Location:</strong> {nextDisaster.location}
                </p>
                <p>
                  <strong>Details:</strong> {nextDisaster.report}
                </p>
              </div>
            ) : (
              <p>No upcoming disaster reports</p>
            )}
          </div>
        </div>

        {/* Statistics Section */}
        <div className={styles.statistics}>
          <div className={styles.statCard}>
            <h3>Total Reports</h3>
            <p>{totalReports}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Regions</h3>
            <p>{totalRegions}</p>
          </div>
          {/* <div className={styles.statCard}>
            <h3>Disaster Types</h3>
            <p>Flood: {stats.flood}</p>
            <p>Earthquake: {stats.earthquake}</p>
            <p>Fire: {stats.fire}</p>
          </div> */}
        </div>

        {/* Disaster Reports Section */}
        <div className={styles.reportSection}>
          <h2>Disaster Reports</h2>
          <div className={styles.reportGrid}>
            {reports.map((report) => (
              <DisasterCard key={report._id} report={report} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;


