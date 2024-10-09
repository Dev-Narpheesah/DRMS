import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Use useParams to get user ID from the URL
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import styles from "./UpdateUser.module.css"; // Create a CSS module for styling

const UpdateUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    disasterType: "",
    location: "",
    report: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to load user data");
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(`http://localhost:4000/api/user/${id}`, formData);
      
      if (response.status === 200) {
        toast.success("User updated successfully!");
        navigate("/admin/dashboard"); // Redirect to admin dashboard after successful update
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Update User</h1>
      <form className={styles.container} onSubmit={handleSubmit}>
        {/* Email Address */}
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          type="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Phone Number */}
        <label htmlFor="phone">Phone Number</label>
        <input
          name="phone"
          type="tel"
          placeholder="+234 567890"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Disaster Type */}
        <label htmlFor="disasterType">Disaster Type</label>
        <select
          name="disasterType"
          value={formData.disasterType}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="">Select Disaster Type</option>
          <option value="flood">Flood</option>
          <option value="earthquake">Earthquake</option>
          <option value="fire">Fire</option>
          <option value="hurricane">Hurricane</option>
          <option value="tornado">Tornado</option>
          <option value="other">Other</option>
        </select>

        {/* Location */}
        <label htmlFor="location">Location</label>
        <input
          name="location"
          type="text"
          placeholder="Main St, Springfield"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {/* Report */}
        <label htmlFor="report">Report</label>
        <textarea
          name="report"
          placeholder="Provide details of the disaster..."
          value={formData.report}
          onChange={handleChange}
          required
        ></textarea>

        {/* Submit Button */}
        <button type="submit" className={styles.btn_update} disabled={isLoading}>
          {isLoading ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
