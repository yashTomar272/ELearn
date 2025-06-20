import { CiSquareCheck } from "react-icons/ci";
import React, { useEffect,useState } from 'react'
import axios from "axios";
import first from "../imgs/tfirst.jpg"
import Loader from "../component/Loader";
import second from "../imgs/hh.webp"
import { useNavigate } from 'react-router-dom';


const Teacher = () => {
    const [Data,setData]=useState([]);
    const [Showloader,setShowloader]=useState(true)
      const navigate=useNavigate()
      
      const URL = "http://localhost:8000";
      
        useEffect(() => {
          const fetchTeachers = async () => {
            try {
              const response = await axios.get(`${URL}/get-all-teachers-with-course-count`);
              const data = response.data.data;
      
             
      
              setData(data);
        setShowloader(false)
  
            } catch (err) {
            }
          };
      
          fetchTeachers();
        }, []);
  return (
<>
<div className='h-100 w-100 px-3 py-4 Back_url'>
<h4 style={{fontWeight:"700",fontSize:"20px",color:"3c4852#"}} className=' '>Top educators to learn from</h4>
<div className='d-flex gap-3'>
  <div className='d-flex gap-2' >
    <CiSquareCheck className='fs-bold fs-4' style={{ color: "rgba(54, 35, 221, 0.6)", transform: "rotate(20deg )" }}
/>
   <p style={{fontSize:"14px",fontWeight:"600",color:"#3c4852"}}> Proven history of delivering results</p>
  </div>
  <div className='d-flex gap-2' >
    <CiSquareCheck className='fs-bold fs-4' style={{ color: "rgba(54, 35, 221, 0.6)", transform: "rotate(20deg )" }}
/>
   <p style={{fontSize:"14px",fontWeight:"600",color:"#3c4852"}}> Mentored past rankers</p>
  </div>
  <div className='d-flex gap-2' >
    <CiSquareCheck className='fs-bold fs-4' style={{ color: "rgba(54, 35, 221, 0.6)", transform: "rotate(20deg )" }}
/>
   <p style={{fontSize:"14px",fontWeight:"600",color:"#3c4852"}}>  Unique style of teaching
</p>
  </div>
</div>
       {Showloader && <Loader/>}
{/* desktop */}
<div
  className="row gap-3 d-none d-sm-flex align-items-center justify-content-evenly"
  
>
  {Data.map((item,i)=>(
<div key={i} style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",borderRadius:"9px",width:"480px"}} className='DALJU flex-row bg-white mt-3 gap-3'>
<img src={item.profileimg} alt="teaher_img" style={{height:"170px",aspectRatio:"1"}}/>
<div className='p-2'>
    <h5 style={{fontSize:"16px",fontWeight:"600"}} className='CCC'>{item.fullname}</h5>
    <p style={{fontSize:"12px",color:"#7a8b9a",fontWeight:"400"}}>{item.qualification}</p>
    <div className='d-flex  gap-1 flex-column text-center ' style={{width:"100px"}}>
        <h6 style={{fontSize:"14px",color:"#3c4852",fontWeight:"600"}} className='p-0 m-0'>{item.courseCount}</h6>
        <p style={{fontSize:"12px",color:"#7a8b9a",fontWeight:"400"}} className='p-0 m-0'> Toatal courses</p>
    </div>
   <button className='see_btn mt-2' onClick={()=>navigate(`/stu/ShowIdCourses/${item._id}`)}>View Courses</button>

</div>
</div>
   ))}


</div>
{/* mobile */}
<div
  className="d-flex d-sm-none gap-3 overflow-auto mt-3 px-2"
  style={{ overflowX: "scroll", scrollbarWidth: "none", cursor: "pointer" }}
>
  {Data.map((item,i)=>(
<div key={i} style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",borderRadius:"9px",width:"550px"}} className='DALJU flex-row bg-white mt-3 gap-3'>
<img src={item.profileimg} alt="teaher_img" style={{height:"170px",aspectRatio:"1"}}/>
<div className='p-2'>
    <h5 style={{fontSize:"16px",fontWeight:"600"}} className='CCC'>{item.fullname}</h5>
    <p style={{fontSize:"12px",color:"#7a8b9a",fontWeight:"400"}}>{item.qualification}</p>
    <div className='d-flex  gap-1 flex-column text-center ' style={{width:"100px"}}>
        <h6 style={{fontSize:"14px",color:"#3c4852",fontWeight:"600"}} className='p-0 m-0'>{item.courseCount}</h6>
        <p style={{fontSize:"12px",color:"#7a8b9a",fontWeight:"400"}} className='p-0 m-0'> Toatal courses</p>
    </div>
   <button className='see_btn mt-2' onClick={()=>navigate(`/stu/ShowIdCourses/${item._id}`)}>View Courses</button>

</div>
</div>
   ))}


</div>

</div>
</>
)
}

export default Teacher