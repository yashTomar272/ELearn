
import photo from "../imgs/jsthumb.png"
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { useEffect,useState } from "react";
import Loader from "../component/Loader";
import {  toast } from "react-toastify";
import second from "../imgs/hh.webp"


const InfoCourses = () => {
  const [Showloader,setShowloader]=useState(true)

  const navigate=useNavigate();
  const {id}=useParams();
  const [Data,setData]=useState([]);
 
 const URL = process.env.REACT_APP_URL;


  const headers = {
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`
};
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/get-courses-by-id/${id}`);
    
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
  <button className="see_btnn" onClick={()=>navigate("/teacher/AddCourse")}>Add Course</button>
</div>
 {Showloader && <Loader/>}
<div className='row gap-3 d-flex align-items-center justify-content-evenly mt-3'>
   
   
  {Data ? (
                      <>
 {<div  style={{maxWidth:"290px",minWidth:"280px",boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",borderRadius:"9px"}} className=' d-flex flex-column p-0 position-relative '>
        <MdDeleteOutline className='delet_Course_icon' onClick={()=>deleteProduct(Data._id)}/>
        <BiEditAlt className='edit_Course_icon' onClick={()=>navigate(`/teacher/EditCourses/${Data._id}`)}/>
<img src={Data.thumbnail} alt='Courses_img' style={{height:"150px",width:"100%",borderRadius:"9px 9px 0 "}}/>
<div style={{width:"100%"}} className=' p-2 d-flex flex-column gap-2'>
<div className='d-flex gap-3'>
  <span style={{color:"black",fontSize:"13px",fontWeight:"400"}}>{Data.language}</span>
  <span style={{color:"blue",fontSize:"13px",fontWeight:"600"}}>{Data.subject}</span>
</div>
<span style={{color:"black",fontSize:"16px",fontWeight:"600"}}>{Data.title}</span>
<span style={{color:"rgb(179, 174, 174)",fontSize:"12px",fontWeight:"600"}}>valid:{Data.valid} . {Data.lecture}</span>
<div className='d-flex flex-row justify-content-between align-Datas-center'>
<span style={{color:"black",fontSize:"14px",fontWeight:"600"}}>{Data.type}</span>
<button className='see_btn' onClick={()=>navigate(`/teacher/SeeLecture/${Data._id}`)}>See Lecture</button>
</div>
<div className='d-flex flex-row justify-content-between align-Datas-center'>
<span style={{color:"black",fontSize:"16px",fontWeight:"600"}}>{Data.teachername}</span>
<button className="see_btnn" onClick={()=>navigate(`/teacher/AddLecture/${Data._id}`)}>Add Lecture</button>
</div>

</div>
    </div> }  
     </>):(
                         <>
                                                <span className="DALJU h-100 w-100">
                                                  <img
                                                    src={second}
                                                    style={{ width: "170px", height: "80px" }}
                                                  />
                                                </span>
                                              </>
                                            )}
                         
  
   

</div>
        
    </div>
    </>
  )
}

export default InfoCourses