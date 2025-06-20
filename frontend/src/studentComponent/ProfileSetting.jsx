import React, { useState,useEffect } from 'react'
import photo from "../imgs/photo.jpg"
  import { useDispatch, useSelector } from 'react-redux';
  import { authActions } from '../store/auth';
import axios from "axios";
import {  useNavigate } from "react-router-dom";



const ProfileSetting = () => {
    const dispatch=useDispatch();
     const navigate=useNavigate();

  
  const role=useSelector((state)=>state.auth.role);
   const [date,setDate]=useState([]);
const [profile,setProfile]=useState([]);


const URL = "http://localhost:8000";

  const headers={
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`
}
useEffect(()=>{
     const fetch=async()=>{
const response=await axios.get( `${URL}/get-user-information`,{headers});

   const hhdate=new Date( response.data.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });

setDate(hhdate)
setProfile(response.data);
     }
     fetch();
  },[])

  return (
   <>
   <div className='h-100 w-100 p-4  d-flex align-items-center justify-content-center'>
<div className='d-flex align-items-center gap-5 flex-sm-row flex-column' style={{maxWidth:"550px"}}>
 <div className='d-flex flex-column gap-4 align-items-center'>
   <div className='p-1' style={{height:"200px",aspectRatio:"1",borderRadius:"50%",border:"3px solid rgba(54, 35, 221, 0.6)"}}>
    <img src={photo} alt='Profile_img' style={{borderRadius:"50%"}} className='w-100 h-100'/>
  </div>
<button className='see_btn'
  onClick={()=>
      {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("student"));
localStorage.clear("id");
localStorage.clear("token");
localStorage.clear("role");
navigate("/login")
      }
      }
>Logout</button>
 </div>
  <div className='d-flex align-items-sm-start align-items-center flex-column gap-2'>
    <span style={{fontSize:"25px",fontWeight:"600",color:"black"}}>{profile.fullname}</span>
    <span style={{fontSize:"20px",fontWeight:"500",color:"black"}}>Registered in at: {date}</span>
    <span style={{fontSize:"20px",fontWeight:"500",color:"black"}}>Your email: {profile.email}</span>
    <span style={{fontSize:"20px",fontWeight:"500",color:"black"}}>Your qualification: {profile.qualification}</span>
    <span style={{fontSize:"20px",fontWeight:"500",color:"black"}}>{profile.role}</span>

  </div>
</div>

   </div>
   </>
  )
}

export default ProfileSetting