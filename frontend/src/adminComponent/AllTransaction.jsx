import axios from 'axios'
import { useEffect,useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";

const AllTransaction = () => {
      const [Data,setData]=useState([]);
    const [date,setDate]=useState([]);

     const URL = "http://localhost:8000";
     useEffect(()=>{
    const handlePaidCourse = async () => {
      const response = await axios.get(`${URL}/get-all-purchases`, {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        const datesArray = response.data.data.map((Courses) => {
       return new Date(Courses.createdAt).toLocaleDateString("en-US", {
         month: "short",
         day: "2-digit",
         year: "numeric"
       });
     });
   setDate(datesArray)
      setData(response.data.data);
    };
    handlePaidCourse();
     },[Data])
  return (
    
    
      
    <>
     <div className='h-100 w-100 p-3' style={{overflowX:"scroll",scrollbarWidth:'none',cursor:"pointer"}}>
<h3 style={{fontWeight:"500",fontSize:"25px"}} className='text-center fw-bold'>All Transaction</h3>
<div className='mt-3'>
 <table className="w-100" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>
  
     <tr>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>S.No.</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Order Id</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Image</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>subject</th>
    
  
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>TotalPrice</th>
    
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>fullname</th>
    
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Email</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Date</th>
    </tr>
   
  {
  Data &&
  Data.map((val, i) => (
    val.courses.map((course, j) => (
      <tr key={`${i}-${j}`}>
        <td className="p-sm-2 p-1" style={{border: "1px solid rgba(54, 35, 221, 0.6)"}}>{i + 1}</td>
        <td className="p-sm-2 p-1" style={{border: "1px solid rgba(54, 35, 221, 0.6)"}}>{course._id || "N/A"}</td>
        <td className="p-sm-2 p-1" style={{border: "1px solid rgba(54, 35, 221, 0.6)"}}>
          <img src={course.thumbnail} alt="thumbnail" style={{width: "40px", aspectRatio: "1"}} />
        </td>
        <td className="p-sm-2 p-1" style={{border: "1px solid rgba(54, 35, 221, 0.6)"}}>{course.subject}</td>
        <td className="p-sm-2 p-1" style={{border: "1px solid rgba(54, 35, 221, 0.6)"}}><FaIndianRupeeSign /> {course.price}</td>
        <td className="p-sm-2 p-1" style={{border: "1px solid rgba(54, 35, 221, 0.6)"}}>{val.user?.fullname}</td>
        <td className="p-sm-2 p-1" style={{border: "1px solid rgba(54, 35, 221, 0.6)"}}>{val.user?.email}</td>
        <td className="p-sm-2 p-1" style={{border: "1px solid rgba(54, 35, 221, 0.6)"}}>{new Date(val.createdAt).toLocaleDateString()}</td>
      </tr>
    ))
  ))
}


     
    </table>
</div>
</div>
    </>
  )
}

export default AllTransaction