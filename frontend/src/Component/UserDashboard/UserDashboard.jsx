import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./UserDashboard.css";
import { IoMenu, IoCloseSharp, IoLogOutOutline } from "react-icons/io5"; // Logout Icon
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { toast } from "react-toastify";

export const shortenText = (text = '', n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

const UserDashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [checkedOutCount, setCheckedOutCount] = useState(0);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/admin/total-users"
        );
        const users = response.data;
        setData(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, []);

  const formatDate = (dateTime) => {
    if (!dateTime) {
      return "Invalid Date";
    }
    const date = new Date(dateTime);
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:4000/api/admin/logout", null, {
        withCredentials: true,
      });
      setUser(null);
      toast.success("User logged out! 😊");
      navigate("/signin");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };


  return (
    <div className="--flex-center __homeDashCon">
      <div className="__paraCon">
        <h1 className="__paraHeader">
          {user && user.username ? `Hi ${shortenText(user.username, 8)}` : "Hi User"}
        </h1>
        {user && user.profilePicture && (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="__profilePicture"
          />
        )}
      </div>
      
      {/* Sidebar Toggle */}
      <div className="__menuToggle">
        <button onClick={() => setSidebarToggle(!sidebarToggle)}>
          {sidebarToggle ? <IoCloseSharp /> : <IoMenu />}
        </button>
        {sidebarToggle && (
          <div className="__sidebar">
            <Link to="/profile">Profile</Link>
            <Link to="/reports">Reports</Link>
            <button className="__logoutBtn" onClick={logout}>
              <IoLogOutOutline /> Logout
            </button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="__secondCon">
        <h3 className="__quickTitle">Quick Stats</h3>
        <div className="__flex __boardss">
          <div className="__board">
            <p className="__boardHead">{data.length}</p>
            <p className="__boardDetails"> Users</p>
          </div>
          <div className="__board">
            <p className="__boardHead">{checkedInCount}</p>
            <p className="__boardDetails">Reported</p>
          </div>
          <div className="__board">
            <p className="__boardHead">{checkedOutCount}</p>
            <p className="__boardDetails">View Reports</p>
          </div>
        </div>
      </div>

      {/* Add more functionality */}
      <div className="__lastCon">
        <div className="__homeBtn">
          <button className="__addBtn">
            <Link to="/signup">Add User</Link>
          </button>
          <button className="__attendBtn">
            <Link to="/help">Donate</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
