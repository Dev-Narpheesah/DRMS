import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DisasterForm.module.css";
import { AuthContext } from "../../../Context/AuthContext";

const initialState = {
  username: "",
  email: "",
  gender: "",
  phone: "",
  disasterType: "",
  userImage: null,
  stakeholderName: "",
  stakeholderPhone: "",
  stakeholderPosition: "",
  location: "",
  report: "",
};

const DisasterForm = () => {
  const navigate = useNavigate();
  const { createDisasterReport } = useContext(AuthContext);
  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, userImage: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
    try {
      await createDisasterReport(formDataToSubmit);
      navigate("/card");
    } catch (err) {
      console.log("Error submitting form:", err);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.container} onSubmit={handleSubmit}>
        {/* User Name */}
        <label htmlFor="username">User Name</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="e.g. example"
          value={formData.username}
          onChange={handleChange}
          required
        />

        {/* Email Address */}
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="e.g., example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Gender */}
        <label htmlFor="gender">Gender</label>
        <input
          id="gender"
          name="gender"
          type="text"
          placeholder="your gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />

        {/* Phone Number */}
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="e.g., +234 567890"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Disaster Type */}
        <label htmlFor="disasterType">Disaster Type</label>
        <select
          id="disasterType"
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

        {/* Image Upload */}
        <label htmlFor="userImage" className={styles.imgLabel}>
          <input
            type="file"
            id="userImage"
            name="userImage"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className={styles.previewImage}
            />
          )}
          <p>Upload Disaster Image</p>
        </label>

        {/* Stakeholder Name */}
        <label htmlFor="stakeholderName">Stakeholder Name</label>
        <input
          id="stakeholderName"
          name="stakeholderName"
          type="text"
          placeholder="e.g. Stakeholder Name"
          value={formData.stakeholderName}
          onChange={handleChange}
          required
        />

        {/* Stakeholder Phone */}
        <label htmlFor="stakeholderPhone">Stakeholder Phone Number</label>
        <input
          id="stakeholderPhone"
          name="stakeholderPhone"
          type="tel"
          placeholder="e.g., +234 567890"
          value={formData.stakeholderPhone}
          onChange={handleChange}
          required
        />

        {/* Stakeholder Position */}
        <label htmlFor="stakeholderPosition">Stakeholder Position</label>
        <select
          id="stakeholderPosition"
          name="stakeholderPosition"
          value={formData.stakeholderPosition}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="">Select Position</option>
          <option value="leader">Community Leader</option>
          <option value="volunteer">Volunteer</option>
          <option value="donor">Donor</option>
          <option value="coordinator">Coordinator</option>
          <option value="other">Other</option>
        </select>

        {/* Location */}
        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="e.g., 123 Main St, Springfield"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {/* Report */}
        <label htmlFor="report">Report</label>
        <textarea
          id="report"
          name="report"
          placeholder="Provide details of the disaster..."
          value={formData.report}
          onChange={handleChange}
          required
        ></textarea>

        {/* Submit Button */}
        <button type="submit" className={styles.Btn} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default DisasterForm;
