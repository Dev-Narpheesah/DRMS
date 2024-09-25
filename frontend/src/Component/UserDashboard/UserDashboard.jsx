import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import "./UserDashboard.css";

import { IoMenu, IoCloseSharp  } from "react-icons/io5";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/SideBar";

// import { UserContext } from "../../../Context/userContext";
import useAuthRedirect from "../../../Context/useAuth";
import { AuthContext } from "../../../Context/AuthContext";

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};

const UserDashboard = () => {


  useAuthRedirect();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [checkedOutCount, setCheckedOutCount] = useState(0);
  const [checkIn, setCheckIn] = useState([]);
  const [checkOut, setCheckOut] = useState([]);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [search, setSearch] = useState("");    

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/total-users");
        const users = response.data;

        setData(users);

        // const checkedInStudents = users.filter((user) => user.checkedIn);
        // setCheckedInCount(checkedInStudents.length);
        // setCheckIn(checkedInStudents);

        // const checkedOutStudents = users.filter((user) => !user.checkedIn);
        // setCheckedOutCount(checkedOutStudents.length);
        // setCheckOut(checkedOutStudents);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchUsers();

    
  }, []);

  const formatDate = (dateTime) => {
    if (!dateTime) {
      return "Invalid Date";
    }

    const date = new Date(dateTime);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

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

  const logOutUser = async () => {
    try {
      await axios.post("https://localhost:4000/api/admin/logout", null, {
        withCredentials: true,
      });
      setUser(null);
      toast.success("user loged out! 😊");
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div className="--flex-center __homeDashCon">
      {sidebarToggle && (
        <div className="mobile-side-nav">
          <Sidebar />
        </div>
      )}

<div className="--flex-dir-column --overflow-y-auto --overflow-x-hidden ">
     
     <main className="--flex-justify-center w-full">
     <div className="right dash-main">
       <div className="--flex-justify-between">
       <p>Users</p>
       {sidebarToggle ? (

         <IoCloseSharp className="sidebar-toggle-iconB"
         onClick={() => setSidebarToggle(false)}
         />
       ):(


       <IoMenu className="sidebar-toggle-iconB"
       onClick={() => setSidebarToggle(true)}

       />
       )}
       </div>

       <p>Search users</p>
       <input
         placeholder="Search by name, email, or ID number"
         type="text"
         className="search"
         value={search}
         onChange={(e) => setSearch(e.target.value)}
       />

      
          
     </div>
     
     </main>
   </div>



      <div className="__paraCon">
        <h1 className="__paraHeader">
          Hi {user ? shortenText(user.username, 10) : "Guest"}
        </h1>
      </div>
    

      <div className="__secondCon">
        <h3 className="__quickTitle">Quick Stats</h3>
        <div className="__flex __boardss">
          <div className="__board">
            <p className="__boardHead">{data.length}</p>
            <p className="__boardDetails"> Users</p>
        
          </div>
          <div className="__board">
            <p className="__boardHead">{checkedInCount}</p>
            <p className="__boardDetails">Reported </p>
          </div>
          <div className="__board">
            <p className="__boardHead">{checkedOutCount}</p>
            <p className="__boardDetails">View Reports</p>
          </div>
        </div>
      </div>


      <div className="__lastCon">
        <div className="__homeBtn">
          <button className="__addBtn">
            <Link to="/signup">Add user</Link>
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
