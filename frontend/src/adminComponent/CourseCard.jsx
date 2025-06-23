import React from 'react'
import {  toast } from "react-toastify";
import photo from "../imgs/jsthumb.png"
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { MdCurrencyRupee } from "react-icons/md";

const CourseCard = ({item}) => {
  const navigate=useNavigate();
 const URL = process.env.REACT_APP_URL;



 
    const deleteProduct=async(idd)=>{
        const response=await axios.delete(`${URL}/delete-teacher-course`  , {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
            courseid: idd,  // Pass correct courseid
          },
        })
       if(response.status===200){
               toast.success(response.data.message)
             }else{
             toast.error(response.data.message)
             }
        
       }
    
       const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};
  return (
   <>
   <div  style={{maxWidth:"290px",minWidth:"280px",boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",borderRadius:"9px"}} className=' d-flex flex-column p-0 position-relative '>
           <MdDeleteOutline className='delet_Course_icon' onClick={()=>deleteProduct(item._id)}/>
           <BiEditAlt className='edit_Course_icon' onClick={()=>navigate(`/admin/EditCourses/${item._id}`)}/>
   <img src={item.thumbnail} alt='Courses_img' style={{height:"150px",width:"100%",borderRadius:"9px 9px 0 "}}/>
   <div style={{width:"100%"}} className=' p-2 d-flex flex-column gap-2'>
   <div className='d-flex gap-3'>
     <span style={{color:"black",fontSize:"13px",fontWeight:"400"}}>{capitalizeFirstLetter(item.language)}</span>
     <span style={{color:"blue",fontSize:"13px",fontWeight:"600"}}>{capitalizeFirstLetter(item.subject)}</span>
   </div>
   <span style={{color:"black",fontSize:"16px",fontWeight:"600"}}>{capitalizeFirstLetter(item.title)}</span>
   <span style={{color:"rgb(179, 174, 174)",fontSize:"12px",fontWeight:"600"}}>Valid:{item.valid} . {item.lecture}</span>
   <div className='d-flex flex-row justify-content-between align-items-center'>
   <div className="d-flex">
     <span style={{color:"black",fontSize:"14px",fontWeight:"600"}}>{capitalizeFirstLetter(item.type)}</span>
      {item.type==="paid" &&
  <div>
    <span style={{color:"black",fontSize:"14px",fontWeight:"600"}}>:</span>
  <MdCurrencyRupee className="fs-5" style={{color:"#7a8b9a"}}/>
  <span style={{color:"#7a8b9a",fontSize:"14px",fontWeight:"600"}}>{item.price}</span>
  </div>
  }
   
   </div>
   <button className='see_btn' onClick={()=>navigate(`/admin/SeeLecture/${item._id}`)}>See Lecture</button>
   </div>
   <div className='d-flex flex-row justify-content-between align-items-center'>
   <span style={{color:"black",fontSize:"16px",fontWeight:"600"}}><span style={{color:"black",fontSize:"14px",fontWeight:"500"}}>Teacher name:</span>{item.teachername}</span>
   </div>
   
   </div>
       </div>    
   </>
  )
}

export default CourseCard