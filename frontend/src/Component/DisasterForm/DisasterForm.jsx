import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./DisasterForm.module.css";
import axios from "axios";

const initialState = {
  email: "",
  phone: "",
  disasterType: "",
  location: "",
  report: "",
};

const DisasterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null); // Image file state
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file); // Store the file in state
    setImagePreview(URL.createObjectURL(file));
  };

  const checkReportStatus = async(email) => {
    try {
      const response = await axios.get("http://localhost:4000/api/user/check-report-status", {
        params: { email },
        withCredentials: true,
      });
      return response.data.hasSubmittedReport;
    } catch (error) {
      console.error("Error checking report status:", error);
      return false; // Default to false if there's an error
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Check if the user has already submitted a report
      const hasSubmitted = await checkReportStatus(formData.email);
      if (hasSubmitted) {
        toast.error("You have already submitted a report.");
        setIsLoading(false);
        return; // Stop form submission if the user has already submitted a report
      }
  
      // Create a FormData object to handle file uploads
      const formDataWithImage = new FormData();
      formDataWithImage.append("email", formData.email);
      formDataWithImage.append("phone", formData.phone);
      formDataWithImage.append("disasterType", formData.disasterType);
      formDataWithImage.append("location", formData.location);
      formDataWithImage.append("report", formData.report);
      formDataWithImage.append("file", file); // Append the image file under the 'file' field
  
      const response = await axios.post(
        "http://localhost:4000/api/user/register",
        formDataWithImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
  
      if (response.status === 201) {
        toast.success("User reported successfully!");
        setFormData(initialState);
        setFile(null);
        setImagePreview(null);
        navigate("/card");
      }
    } catch (error) {
      console.error("Failed to submit disaster report", error);
      toast.error("Failed to submit disaster report");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className={styles.wrapper}>
      <form className={styles.container} onSubmit={handleSubmit}>
        {/* Email Address */}
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          type="email"
          placeholder=" example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Phone Number */}
        <label htmlFor="phone">Phone Number</label>
        <input
          name="phone"
          type="tel"
          placeholder=" +234 567890"
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
          placeholder=" Main St, Springfield"
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

        {/* Image Upload */}
        <label htmlFor="file" className={styles.imgLabel}>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            required
          />
          <p>Upload Disaster Image</p>
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className={styles.previewImage}
          />
        )}

        {/* Submit Button */}
        <button type="submit" className={styles.btn_disaster} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default DisasterForm;
