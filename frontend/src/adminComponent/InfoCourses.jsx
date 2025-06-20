
import photo from "../imgs/jsthumb.png"
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { useEffect,useState } from "react";
import Loader from "../component/Loader";
import {  toast } from "react-toastify";
import second from "../imgs/hh.webp"
import CourseCard from "./CourseCard";


const InfoCourses = () => {
  const [Showloader,setShowloader]=useState(true)

  const navigate=useNavigate();
  const {id}=useParams();
  const [Data,setData]=useState([]);
 
 const URL = process.env.REACT_APP_URL;


 
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/get-course-by-id/${id}`, {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
    
      setData(response.data.data);
  setShowloader(false)

    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err.message);
    }
  };
  fetchData();
}, [Data]);
const deleteProduct=async(idd)=>{
    const response=await axios.delete(`${URL}/delete-course`  , {
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

  return (
    <>
    <div className='h-100 w-100 p-3'>
<h3 style={{fontWeight:"500",fontSize:"25px"}} className='text-center fw-bold'>Your Course</h3>
  <div className="d-flex justify-content-center w-100">
  <button className="see_btnn" onClick={()=>navigate("/admin/MyCourses")}>All Course</button>
</div>
 {Showloader && <Loader/>}
<div className='row gap-3 d-flex align-items-center justify-content-evenly mt-3'>
   
   
<CourseCard item={Data}/>
                         
{Data.length===0 &&
(
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

export default InfoCourses