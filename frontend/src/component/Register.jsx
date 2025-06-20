

import React, { useEffect, useState } from 'react';
import Img from "../imgs/wallpaperFirst.jpg";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

import './Login.css';
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
const Register = () => {
const navigate= useNavigate();
const URL = process.env.REACT_APP_URL;
  const [role, setRole] = useState('student');
  const [Show, setShow] = useState(true);
  const handleShow = () => {
    setShow(!Show);
  };
const [values,setValues]=useState({
    fullname:"",
    email:"",
    password:"",
    mobilenumber:"",
    role:role,
    qualification:""
  })
  
useEffect(()=>{
  setValues(prev=>({...prev,role:role}))
},[role])
  const change=(e)=>{
  const {name,value}=e.target;
  setValues({...values,[name]:value})
}
const submit = async (e) => {
   e.preventDefault();  // ⬅️ Yeh line add karo
    try {
      if (
        !values.fullname || 
        !values.email || 
        !values.password || 
        !values.mobilenumber||!values.role|| (values.role === 'teacher' && !values.qualification)
  )
       {
        alert("All fields are required");
      } else {
        const response =await axios.post(
          `${URL}/signup`,
          values
        )
        navigate('/Login')
      }
    } catch (error) {
      alert(error?.response?.data?.message)
      console.log("Error message from backend:",error?.response?.data?.message);
    }
  };
  
  return (
    <div
      className="Login_main_class position-relative"
      style={{ height: "100vh", width: "100%" }}
    >
      <img
        alt="login background"
        src={Img}
        className="img_class img-fluid"
        style={{ height: "100vh", width: "100%" }}
      />

      <div
        className="position-absolute d-flex flex-column top-0"
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          borderRadius: "9px",
        }}
      >
        
         

         
          

          {/* Login Box */}
          <div className="loginBox ">
          <h2
            style={{
              textAlign: "center",
              fontSize: "22.4px",
              color: "rgb(104, 224, 204)",
              fontWeight: "500",
            }}
          >
            Learn from India's best teachers
          </h2>

          {/* Role Selector */}
          <div className="DALJU d-flex align-items-center w-100 gap-2 mt-3">
            <div style={{ flex: 1, height: "2px", backgroundColor: "rgba(112,112,112,0.8)" }}></div>
            <h3 style={{ fontSize: "16px", fontWeight: "500", color: "white", backgroundColor: "transparent", padding: "0 8px" }}>
              Select the role
            </h3>
            <div style={{ flex: 1, height: "2px", backgroundColor: "rgba(112,112,112,0.8)" }}></div>
          </div>

          <div className="d-flex justify-content-between align-items-center row mb-3 mt-2">
            <div className="col-6 d-flex justify-content-center align-items-center">
              <input
                type="radio"
                value="student"
                id="ft_student"
                name="role"
                checked={role === "student"}
                onChange={() => setRole("student")}
                className="d-none"
              />
              <label htmlFor="ft_student" className="cr role_label text-white">Student</label>
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center">
              <input
                type="radio"
                value="teacher"
                id="ft_teacher"
                name="role"
                checked={role === "teacher"}
                onChange={() => setRole("teacher")}
                className="d-none"
              />
              <label htmlFor="ft_teacher" className="cr role_label text-white">Teacher</label>
            </div>
          </div>
            <div className="DALJU d-flex align-items-center w-100 gap-2 mb-3">
            <div style={{ flex: 1, height: "2px", backgroundColor: "rgba(112,112,112,0.8)" }}></div>
            <h3 style={{ fontSize: "16px", fontWeight: "500", color: "white", backgroundColor: "transparent", padding: "0 8px" }}>
              Enter Your Details
            </h3>
            <div style={{ flex: 1, height: "2px", backgroundColor: "rgba(112,112,112,0.8)" }}></div>
          </div>
          
            <form action="#">
              <div className="userInputBox">
                <input type="text" id="fullname" name="fullname" onChange={change} required />
                <label htmlFor="fullname">Enter Your fullname</label>
              </div>
              <div className="userInputBox">
                <input type="email" id="email" name="email" onChange={change} required />
                <label htmlFor="email">Email Address</label>
              </div>
              <div className="userInputBox">
                <input type={Show ? "password" : "text"}
                onChange={change}
                name="password"
               id="password" required 
                />
                <label htmlFor="password">Enter Password</label>
                 {Show ? (
                <PiEyeSlash
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "8px",
                    cursor: "pointer",
                    fontSize: "23px",
                    color:"white"
                    
                  }}
                  onClick={handleShow}
                />
              ) : (
                <PiEyeLight
                  style={{
                    position: "absolute",
                    right: "23px",
                    top: "8px",
                    cursor: "pointer",
                    fontSize: "20px",
                    color:"white"
                    
                    
                  }}
                  onClick={handleShow}
                />
              )}
              </div>
              <div className="userInputBox">
                <input type="text" id="mobile" name="mobilenumber" onChange={change} required />
                <label htmlFor="mobile">Mobile No</label>
              </div>

              {/* Conditional Qualification Field */}
              {role === "teacher" && (
                <div className="userInputBox">
                  <input type="text" id="qualification" name="qualification" onChange={change} required />
                  <label htmlFor="qualification">Qualification</label>
                </div>
              )}
              <button type="submit" onClick={submit} className='login_btn'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
{/* <button style={{}} type="submit" onClick={submit}> */}
                SignUp
                {/* </button> */}
              </button>
               <p className="" style={{color: "rgba(219, 204, 204, 0.8)"}}>
              Have a account?{" "}
              <span
              onClick={()=>navigate("/login")}
                style={{
                  cursor: "pointer",
                  color: "rgb(236, 79, 197)",
                  borderBottom: "1px solid rgb(236, 79, 197)",
                }}>
              Log In
              </span>
            </p>
            </form>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Register;
