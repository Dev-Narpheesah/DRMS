import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";

export const shortenText = (text = "", n) => {
  return text.length > n ? text.substring(0, n).concat("...") : text;
};

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [totalRegions, setTotalRegions] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    disasterType: "",
    location: "",
    report: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user");
        const users = response.data;
        setUsers(users);
        setTotalReports(users.length);
        const uniqueRegions = new Set(users.map((user) => user.location));
        setTotalRegions(uniqueRegions.size);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const goToReportDetails = (id) => {
    navigate(`/report/${id}`);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setUpdatedData({
      disasterType: user.disasterType,
      location: user.location,
      report: user.report,
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `http://localhost:4000/api/user/${selectedUser._id}`,
        updatedData
      );
      setUsers(
        users.map((user) =>
          user._id === selectedUser._id ? { ...user, ...updatedData } : user
        )
      );
      closeModal();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/user/${userToDelete._id}`);
      setUsers(users.filter((user) => user._id !== userToDelete._id));
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.topSection}>
        <img
          src="adHead.jpeg"
          alt="Header"
          className={styles.topImage}
        />
        <div className={styles.topText}>
          <h1>Dashboard</h1>
          <p>Manage users, reports, and more efficiently!</p>
        </div>
      </div>
      <div className={styles.content}>
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
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.disasterType}</td>
                  <td>{user.location}</td>
                  <td>{shortenText(user.report, 20)}</td>
                  <td>
                    <img
                      src={user.image.url}
                      alt="User avatar"
                      className={styles.userImage}
                    />
                  </td>
                  <td className={styles.actions}>
                    <FaEdit
                      onClick={() => openModal(user)}
                      className={styles.icon}
                      title="Edit User"
                    />
                    <FaTrash
                      onClick={() => openDeleteModal(user)}
                      className={styles.iconD}
                      title="Delete User"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Update User</h2>
            <label>
              Disaster Type:
              <input
                type="text"
                value={updatedData.disasterType}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    disasterType: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                value={updatedData.location}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, location: e.target.value })
                }
              />
            </label>
            <label>
              Report:
              <textarea
                value={updatedData.report}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, report: e.target.value })
                }
              />
            </label>
            <button onClick={handleUpdate}>Save Changes</button>
            <button className={styles.cancelButton} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className={styles.deleteButtons}>
              <button onClick={handleDeleteUser}>Yes, Delete</button>
              <button
                className={styles.cancelButton}
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
