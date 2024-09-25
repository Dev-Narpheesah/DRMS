// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (authToken) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
//       // Fetch user data here if needed
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//     }
//   }, [authToken]);

//   const signIn = async (email, password) => {
//     const res = await axios.post("http://localhost:4000/api/auth/signin", {
//       email,
//       password,
//     });
//     localStorage.setItem("authToken", res.data.token);
//     setAuthToken(res.data.token);
//   };

//   const signUp = async (username, email, password) => {
//     const res = await axios.post("http://localhost:4000/api/auth/register", {
//       username,
//       email,
//       password,
//       message
//     });
//     localStorage.setItem("authToken", res.data.token);
//     setAuthToken(res.data.token);
//   };

//   const signOut = () => {
//     localStorage.removeItem("authToken");
//     setAuthToken(null);
//     setUser(null);
//   };

//   const [reportData, setReportData] = useState(null);

//   const submitReport = async (formData) => {
//     try {
//       const res = await axios.post("/api/disaster/report", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setReportData(res.data.disasterReport);
//       return res.data.message;
//     } catch (err) {
//       console.log("Error submitting disaster report:", err);
  
//     }
//     localStorage.setItem("authToken", res.data.token);
//     setAuthToken(res.data.token)
//   };

//   const fetchAllReports = async () => {
//     try {
//       const res = await axios.get("/api/disaster/reports");
//       return res.data;
//     } catch (err) {
//       console.error("Error fetching disaster reports:", err);
//       throw err;
//     }
//   };

//   const fetchReportById = async (id) => {
//     try {
//       const res = await axios.get(`/api/disaster/report/${id}`);
//       return res.data;
//     } catch (err) {
//       console.error(`Error fetching report with ID ${id}:`, err);
//       throw err;
//     }
//   };

//   const updateReport = async (id, formData) => {
//     try {
//       const res = await axios.put(`/api/disaster/report/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return res.data;
//     } catch (err) {
//       console.error(`Error updating report with ID ${id}:`, err);
//       throw err;
//     }
//   };

//   const deleteReport = async (id) => {
//     try {
//       const res = await axios.delete(`/api/disaster/report/${id}`);
//       return res.data.message;
//     } catch (err) {
//       console.error(`Error deleting report with ID ${id}:`, err);
//       throw err;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         authToken,
//         signIn,
//         signUp,
//         signOut,
//         user,
//         submitReport,
//         fetchAllReports,
//         fetchReportById,
//         updateReport,
//         deleteReport,
//         reportData,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthProvider, AuthContext };



import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
      // Fetch user data here if needed
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [authToken]);

  const signIn = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/signin", { email, password });
      localStorage.setItem("authToken", res.data.token);
      setAuthToken(res.data.token);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signUp = async (username, email, password) => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", { username, email, password });
      localStorage.setItem("authToken", res.data.token);
      setAuthToken(res.data.token);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUser(null);
  };

  const createDisasterReport = async (formData) => {
    try {
      const res = await axios.post("http://localhost:4000/report", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.message;
    } catch (error) {
      console.log("Error submitting disaster report:", error);
      throw error;
    }
  };

  const fetchAllReports = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/disaster/reports");
      return res.data;
    } catch (err) {
      console.error("Error fetching disaster reports:", err);
      throw err;
    }
  };

  const fetchReportById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/disaster/report/${id}`);
      return res.data;
    } catch (err) {
      console.error(`Error fetching report with ID ${id}:`, err);
      throw err;
    }
  };

  const updateReport = async (id, formData) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/disaster/report/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      console.error(`Error updating report with ID ${id}:`, err);
      throw err;
    }
  };

  const deleteReport = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/disaster/report/${id}`);
      return res.data.message;
    } catch (err) {
      console.error(`Error deleting report with ID ${id}:`, err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        signIn,
        signUp,
        signOut,
        user,
        createDisasterReport,
        fetchAllReports,
        fetchReportById,
        updateReport,
        deleteReport,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
