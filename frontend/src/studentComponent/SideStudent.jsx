// import React from 'react'
import {  useEffect} from 'react';
import { IoMdHome } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { IoBookOutline } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { TbLayoutSidebarFilled } from "react-icons/tb";//ise laganahai jab mobile me side bar none rahe gaa ise click karne par on ho 

const SideStudent = ({showSide,setShowSide,lgScreen}) => {
  const navigate=useNavigate()
  return (
    <>
    <div  className="position-relative" style={{ height: "100vh" }}>
      <div className={`${lgScreen?'':'d-none'} position-fixed top-0 fs-3 m-2`} style={{zIndex:"4"}} onClick={()=>setShowSide(!showSide)}><TbLayoutSidebarFilled/></div></div>
    <div className={`${lgScreen?"position-fixed":'position-fixed'} ${showSide?"":'d-none'}`} style={{overflow:"auto",zIndex:"3",minWidth:"260px",maxWidth:"280px",background:"rgba(134, 123, 235, 1)",borderTopRightRadius:"12px",borderBottomRightRadius:"12px",paddingTop:"11px",left:"0",top:"0",height:"100vh"}}>
        <h3 className='m-0 mb-0' style={{fontWeight:"500",color:"white",textAlign:"center"}}>E-Learn</h3>
        <p className='fst-italic' style={{fontWeight:"500",fontSize:"14px",color:"white",textAlign:"center"}} >Learn From Home</p>

        <ul className=' mt-5 d-flex gap-3 flex-column' style={{padding:"0 0 0 17px "}}>
<li className='d-flex align-items-center w-100  gap-2  li_color'   onClick={() => {if(lgScreen)setShowSide(false); navigate("/stu");
  }}>
<IoMdHome  className='icon_color fs-3' />
Home
</li>
<li className='d-flex align-items-center w-100  gap-2  li_color' onClick={()=>{if(lgScreen)setShowSide(false);navigate("/stu/Favourite")}} >
<IoBookOutline  className='icon_color fs-3' />
Favourite
</li>

<li className='d-flex align-items-center w-100  gap-2  li_color' onClick={()=>{if(lgScreen)setShowSide(false);navigate("/stu/SeeTeacher")}} >
<FaChalkboardTeacher  className='icon_color fs-3' />
Teachers
</li>
<li className='d-flex align-items-center w-100  gap-2  li_color'  onClick={()=>{if(lgScreen)setShowSide(false);navigate("/stu/YourCourses")}
}>
<CiCreditCard1  className='icon_color fs-2' />
My courses
</li>
<li className='d-flex align-items-center w-100  gap-2  li_color'  onClick={()=>{if(lgScreen)setShowSide(false);navigate("/stu/AllCourses")}
}>
<MdMenuBook  className='icon_color fs-2' />
All courses
</li>
<li className='d-flex align-items-center w-100  gap-2  li_color' onClick={()=>{if(lgScreen)setShowSide(false);navigate("/stu/ProfileSetting")}}>
<CiSettings  className='icon_color fs-2' />
Setting
</li>
        </ul>
    </div>
    </>
  )
}

export default SideStudent