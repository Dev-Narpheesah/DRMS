import React, { useState } from 'react';
import './AdminSide.css';
import { IoClose } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { Link} from 'react-router-dom'

const AdminSide = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggleButton" onClick={toggleSidebar}>
        {isOpen ? <IoClose /> : <MdMenu /> }
      </button>
      <nav className="menu">
        <a href="/admin">Dashboard</a>
        <Link to='/user-management'>Users</Link>
        <Link to='/resource'>Resources</Link>
        <Link to="/report">Reports</Link>
      </nav>
        {/* <a href=""></a> */}
    </div>
  );
};

export default AdminSide;
