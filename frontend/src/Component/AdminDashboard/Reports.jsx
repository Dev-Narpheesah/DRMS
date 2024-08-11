// components/Report.js
import React, { useState } from 'react';
import axios from 'axios';
import './Reports.module.css'

const Report = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const { name, email, message } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/data/report', formData);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={name} onChange={onChange} required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div>
                <label>Message</label>
                <textarea  name="message" value={message} onChange={onChange} required></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Report;



//import React from 'react'
// import { useState } from 'react';
// import styles from './Reports.module.css'

// const Reports = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [formErrors, setFormErrors] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [formSuccess, setFormSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name) errors.name = "Name is required.";
//     if (!formData.email) errors.email = "Email is required.";
//     if (!formData.message) errors.message = "Message is required.";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       // Here, you can handle form submission, e.g., send the data to a server
//       console.log("Form submitted:", formData);
//       setFormSuccess("Thank you for your message. We will get back to you soon.");
//       setFormData({ name: "", email: "", message: "" });
//       setFormErrors({});
//     }
//   };

//   return (
//     <div className={styles.contactContainer}>
//       <h2>Reports</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         {formErrors.name && <p className={styes.error}>{formErrors.name}</p>}

//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}

//         <label htmlFor="message">Message</label>
//         <textarea
//           id="message"
//           name="message"
//           rows="5"
//           value={formData.message}
//           onChange={handleChange}
//         ></textarea>
//         {formErrors.message && <p className={styles.error}>{formErrors.message}</p>}

//         <button type="submit">Submit</button>
//       </form>
//       {formSuccess && <p className={styles.success}>{formSuccess}</p>}
//     </div>
//   );
// }

// export default Reports


// import React, { useState } from 'react';
// import styles from './Reports.module.css';
// import ReportDetailModal from './ReportDetailModal';

// const Reports = () => {
//   const [reports, setReports] = useState([
//     { id: 1, title: 'Flood in Region A', date: '2024-01-15', description: 'Severe flooding reported in region A. Immediate assistance required.', details: 'The flood affected over 500 homes, with 20 fatalities reported. Emergency services are currently on-site providing aid.' },
//     { id: 2, title: 'Earthquake in Region B', date: '2024-02-10', description: 'A 6.5 magnitude earthquake hit region B. Casualties and damage reported.', details: 'The earthquake caused significant structural damage to buildings and infrastructure. Over 100 people are injured and 50 are missing.' },
//     { id: 3, title: 'Wildfire in Region C', date: '2024-03-05', description: 'A large wildfire is spreading in region C. Evacuations underway.', details: 'The wildfire has spread across 1000 acres, destroying numerous homes and causing widespread evacuations. Firefighters are working to contain the blaze.' },
//   ]);

//   const [selectedReport, setSelectedReport] = useState(null);

//   const openReportDetail = (report) => {
//     setSelectedReport(report);
//   };

//   const closeReportDetail = () => {
//     setSelectedReport(null);
//   };

//   const deleteReport = (id) => {
//     setReports(reports.filter(report => report.id !== id));
//   };

//   return (
//     <div className={styles.reports}>
//       <h4>Disaster Reports</h4>
//       <ul className={styles.reportList}>
//         {reports.map(report => (
//           <li key={report.id} className={styles.reportItem}>
//             <h5>{report.title}</h5>
//             <p><strong>Date:</strong> {report.date}</p>
//             <p>{report.description}</p>
//             <div className={styles.reportActions}>
//               <button onClick={() => openReportDetail(report)}>View Details</button>
//               <button onClick={() => deleteReport(report.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       {selectedReport && (
//         <ReportDetailModal
//           report={selectedReport}
//           onClose={closeReportDetail}
//         />
//       )}
//     </div>
//   );
// };

// export default Reports;











// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './Reports.css';
// // import ReportDetailModal from './ReportDetailModal';

// // const Reports = () => {
// //   const [reports, setReports] = useState([]);
// //   const [selectedReport, setSelectedReport] = useState(null);

// //   useEffect(() => {
// //     // Fetch reports from the external API
// //     const fetchReports = async () => {
// //       try {
// //         const response = await axios.get('https://api.example.com/disaster-reports');
// //         setReports(response.data);
// //       } catch (error) {
// //         console.error('Error fetching reports:', error);
// //       }
// //     };

// //     fetchReports();
// //   }, []);

// //   const openReportDetail = (report) => {
// //     setSelectedReport(report);
// //   };

// //   const closeReportDetail = () => {
// //     setSelectedReport(null);
// //   };

// //   const deleteReport = async (id) => {
// //     try {
// //       await axios.delete(`https://api.example.com/disaster-reports/${id}`);
// //       setReports(reports.filter(report => report.id !== id));
// //     } catch (error) {
// //       console.error('Error deleting report:', error);
// //     }
// //   };

// //   return (
// //     <div className="reports">
// //       <h4>Disaster Reports</h4>
// //       <ul className="report-list">
// //         {reports.map(report => (
// //           <li key={report.id} className="report-item">
// //             <h5>{report.title}</h5>
// //             <p><strong>Date:</strong> {report.date}</p>
// //             <p>{report.description}</p>
// //             <div className="report-actions">
// //               <button onClick={() => openReportDetail(report)}>View Details</button>
// //               <button onClick={() => deleteReport(report.id)}>Delete</button>
// //             </div>
// //           </li>
// //         ))}
// //       </ul>
// //       {selectedReport && (
// //         <ReportDetailModal
// //           report={selectedReport}
// //           onClose={closeReportDetail}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Reports;

