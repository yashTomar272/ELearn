
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
 import "bootstrap/dist/js/bootstrap.bundle.js";
import {
    // BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
 import Register from './component/Register';
 import Login from './component/Login';
 import Hello from './component/Hello';
import TeacherRoutes from './TeacherRoutes';
import { ToastContainer } from "react-toastify";
import StudentRoutes from './StudentRoutes';
import AdminRoutes from './AdminRoutes';
 import Success from './component/Success';
 import Cancel from './component/Cancel';
import React, { useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const role  = localStorage.getItem('role');  // 'teacher' | 'student' | 'admin'

  //   if (!token) {
  //     // अगर लॉगिन नहीं है
  //     return navigate('/login');
  //   }

  //   // लॉगिन है, अब role के हिसाब से redirect
  //   switch (role) {
  //     case 'teacher':
  //       navigate('/teacher');
  //       break;
  //     case 'student':
  //       navigate('/stu');
  //       break;
  //     case 'admin':
  //       navigate('/admin');
  //       break;
  //     default:
  //       // अगर role अनजान है
  //       navigate('/');
  //       break;
  //   }
  // }, [navigate]);
  return (
    <>
     <ToastContainer position="top-right" autoClose={2000} />
    <Routes>
      <Route path="/" element={<Hello/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Login" element={<Login/>}/>
     <Route path="/teacher/*" element={<TeacherRoutes />} />
     <Route path="/admin/*" element={<AdminRoutes />} />
     <Route path="/stu/*" element={<StudentRoutes />} />
     <Route path="/Success" element={<Success />} />
     <Route path="/Cancel" element={<Cancel />} />
    </Routes>
    </>
  );
}

export default App;
