// src/App.js
import React from "react";

import "./App.css";
import Home from "./Component/Home/Home";
import SignIn from "./Component/SignIn/SignIn";
import { AuthProvider } from './Component/Context/AuthContext';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HeroSection from "./Component/Home/HeroSection";
import Service from "./Component/Services/Service";
import Register from "./Component/Register/Register";
import About from "./Component/About/About";
import Contact from "./Component/Contact/Contact";
import SideBar from "./Component/Sidebar/SideBar";
import Otp from "./Component/Otp/Otp";
import UserDasboard from "./Component/UserDashboard/UserDashboard";
import AdminDashboard from "./Component/AdminDashboard/AdminDashboard";
import UserManagement from "./Component/AdminDashboard/UserManagement";
import ResourceManagement from "./Component/AdminDashboard/ResourceManagement";
import Reports from "./Component/AdminDashboard/Reports";
import AdminLog from "./Component/AdminDashboard/AdminLog";
import AdminReg from "./Component/AdminDashboard/AdminReg";
import Tracking from "./Component/AdminDashboard/Tracking";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/user" element={<UserDasboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-log" element={<AdminLog />} />
        <Route path="/adminReg" element={<AdminReg />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/resource" element={<ResourceManagement />} />
        <Route path="/report" element={<Reports />} />
        <Route path="/track" element={<Tracking />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
