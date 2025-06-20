
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
 import Nopage from './component/Nopage';
import TeacherRoutes from './TeacherRoutes';
import { ToastContainer } from "react-toastify";
import StudentRoutes from './StudentRoutes';
import AdminRoutes from './AdminRoutes';
 import Success from './component/Success';
 import Cancel from './component/Cancel';
import React, { useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from 'react-router-dom';

function App() {
  const navigate   = useNavigate();
  const location   = useLocation();

  useEffect(() => {
    const token      = localStorage.getItem('token');
    const role       = localStorage.getItem('role');
    const publicPaths = ['/login', '/register']; // जो routes public रखने हैं

    // अगर अभी public route पर हो तो कुछ मत करो
    if (publicPaths.includes(location.pathname)) {
      return;
    }

    // अगर token नहीं है, सारे non-public पर login भेज दो
    if (!token) {
      return navigate('/login');
    }

    // अगर token है, role के हिसाब से redirect करो
    const routeMap = {
      teacher: '/teacher',
      student: '/stu',
      admin:   '/admin',
    };

    const destination = routeMap[role] || '/';
    // सिर्फ तभी navigate करो जब current path destination से अलग हो
    if (location.pathname !== destination) {
      navigate(destination);
    }
  }, [navigate, location]);
  return (
    <>
     <ToastContainer position="top-right" autoClose={2000} />
    <Routes>
      <Route path="/" element={<Hello/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/*" element={<Nopage />} />
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
