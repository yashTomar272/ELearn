import React, { useEffect,useState } from 'react'
import axios from "axios";
import first from "../imgs/tfirst.jpg"
import Loader from "../component/Loader";
import second from "../imgs/hh.webp"
import { useNavigate } from 'react-router-dom';


const SeeTeacher = () => {
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
    <div className='w-100 p-3'>
    <h3 className='FONT fs-3  text-center'>All Teachers</h3>
       {Showloader && <Loader/>}

      < div className='row gap-3 d-flex align-items-center justify-content-evenly'>
      
     
   {Data.map((item,i)=>(
     <div key={i} style={{ borderRadius:"9px",height:"190px"}} className='DALJU flex-row bg-white mt-3'>
       <img src={item.profileimg} alt="teaher_img" style={{height:"200px",minHeight:"100px",width:"200px",minWidth:"100px",borderRadius:"50%",boxShadow:"0px 4px 8px rgba(0,0,0,0.2"}}/>
       <div className='p-2' style={{borderLeft: "0px",boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",width:"65%",maxWidth:"300px"}}>
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
 
 

       
      
      
        {( Data.length === 0)
                                   && (
                                   <div className="text-center">
                                     <img src={second} alt="no data" style={{ width: "170px", height: "80px" }} />
                                     <p>No courses found</p>
                                   </div>
                                 )}
       </div>
    </div>
    </>
  )
}

export default SeeTeacher