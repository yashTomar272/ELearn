import React from 'react'
import { LuCopyright } from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
const Foot = () => {
  return (
    <>
    <div style={{background:"rgb(42, 43, 63)"}} className='p-3 w-100'>
        
 <div className=' d-flex align-items-center justify-content-evenly '>
    <div style={{width:"280px"}}>
    <h2 className='FONT fs-3 text-white'>E-Learn</h2>

    <p style={{fontSize:"14px",fontWeight:"400",color:"#a2a0a2"}}>E-Learn is democratising education, making it accessible to all. Join the revolution, learn on India's largest learning platform.</p>
</div>
<div className='d-flex gap-3'>
    <div className='company d-flex flex-column'>
        <f5 style={{fontSize:"16px",fontWeight:"600",color:"#fafafa"}}>Company</f5>
        <p style={{fontSize:"14px",fontWeight:"400",color:"#a2a0a2"}} className='m-0 p-0'>About us</p>
        <p style={{fontSize:"14px",fontWeight:"400",color:"#a2a0a2"}} className='m-0 p-0'>Blogs</p>
        <p style={{fontSize:"14px",fontWeight:"400",color:"#a2a0a2"}} className='m-0 p-0'>Careers</p>
        <p style={{fontSize:"14px",fontWeight:"400",color:"#a2a0a2"}} className='m-0 p-0'>Privacy Policy</p>
        <p style={{fontSize:"14px",fontWeight:"400",color:"#a2a0a2"}} className='m-0 p-0'>Terms and conditions</p>
    </div>
    <div className='Study material d-flex flex-column'>
        <f5 style={{fontSize:"16px",fontWeight:"600",color:"#fafafa"}}>Study material</f5>
        <p style={{fontSize:"14px",fontWeight:"400",color:"#a2a0a2"}} className='m-0 p-0'>Web dev</p>
        <p style={{fontSize:"14px",fontWeight:"400",color:"#a2a0a2"}} className='m-0 p-0'>Data Science</p>
        <p style={{fontSize:"14px",fontWeight:"400",color:"#a2a0a2"}} className='m-0 p-0'>Full Stack</p>
        <p style={{fontSize:"14px",fontWeight:"400",color:"#a2a0a2"}} className='m-0 p-0'>programming langugaes</p>
        <p style={{fontSize:"14px",fontWeight:"400",color:"#a2a0a2"}} className='m-0 p-0'>Other</p>
    </div>
</div>
</div>
<div style={{height:"0.7px",width:"100%",background:"#a2a0a2"}} className='mt-3 mb-2'></div>
<div className='d-flex align-items-center justify-content-between'>
    <div className='d-flex gap-3 align-items-center  '>
    <h3 className='FONT fs-3 text-white'>E-Learn</h3>
        <div className='d-flex gap-2 align-items-center'>
            <LuCopyright className='fs-4' style={{color:"#a2a0a2"}}/>
            <p style={{fontSize:"14px",fontWeight:"400",color:"#a2a0a2"}} className='m-0 p-0'> 2025 E-Learn, Inc.</p>
        </div>
    </div>
    <div className='d-flex gap-3'>
        <FaFacebookF className='fs-4' style={{color:"#a2a0a2"}}/>
        <FaInstagram className='fs-4' style={{color:"#a2a0a2"}}/>
        <FaTwitter className='fs-4' style={{color:"#a2a0a2"}}/>
        <FaLinkedinIn className='fs-4' style={{color:"#a2a0a2"}}/>
        <FaYoutube className='fs-4' style={{color:"#a2a0a2"}}/>
    </div>
</div>
    </div>
    </>
  )
}

export default Foot