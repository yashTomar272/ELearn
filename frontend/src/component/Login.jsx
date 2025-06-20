

import React, { useState } from 'react';
import Img from "../imgs/wallpaperFirst.jpg";
import './Login.css';
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import {authActions} from "../store/auth"
import { useDispatch } from "react-redux";
import axios from 'axios'

const Login = () => {
  const dispatch=useDispatch();
  const navigate= useNavigate();
  const [Show, setShow] = useState(true);
  const handleShow = () => {
    setShow(!Show);
  };
const change = (e) => {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });
}
const URL = process.env.REACT_APP_URL;
const [values,setValues]=useState({
    email:"",
    password:"",
  })
const submit = async () => {
    try {
      if (
        !values.email || 
        !values.password )
       {
        alert("All fields are required");
      } else {
        const response =await axios.post(
          `${URL}/signin`,
          values
        );
        dispatch(authActions.login());
    dispatch(authActions.changeRole(response.data.role));
localStorage.setItem("id",response.data.id)
localStorage.setItem("token",response.data.token)
localStorage.setItem("role",response.data.role)
localStorage.setItem("fullname",response.data.fullname)
       // 🎯 Object mapping for routes
      const routeMap = {
        teacher: '/teacher',
        student: '/stu',    // जैसा तुम्हारे routes में defined है
        admin:   '/admin'
      };

      // अगर response.data.role मिल गया तो वो URL, नहीं तो '/'
      const destination = routeMap[response.data.role] || '/';
      navigate(destination);
      }
    } catch (error) {
      alert(error.response.data.message)

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

          
          
            <div className="DALJU d-flex align-items-center w-100 gap-2 mb-3">
            <div style={{ flex: 1, height: "2px", backgroundColor: "rgba(112,112,112,0.8)" }}></div>
            <h3 style={{ fontSize: "18px", fontWeight: "500", color: "white", backgroundColor: "transparent", padding: "0 8px" }}>
              Log In
            </h3>
            <div style={{ flex: 1, height: "2px", backgroundColor: "rgba(112,112,112,0.8)" }}></div>
          </div>
          
            <form action="#">
              <div className="userInputBox">
                <input type="text" id="email" name="email" required onChange={change} />
                <label htmlFor="email">Enter Your Email</label>
              </div>
             
              <div className="userInputBox">
                <input onChange={change} type={Show ? "password" : "text"}
               id="password" name="password" required 
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
              
              <a href="#" type="submit" onClick={submit}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Log In
              </a>
               <p className="" style={{color: "rgba(219, 204, 204, 0.8)"}}>
             Don't Have a account?{" "}
              <span
              onClick={()=>navigate("/register")}
                style={{
                  cursor: "pointer",
                  color: "rgb(236, 79, 197)",
                  borderBottom: "1px solid rgb(236, 79, 197)",
                }}>
             Sign Up
              </span>
            </p>
            </form>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Login;
