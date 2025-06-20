import React, { useEffect,useState } from 'react'
import axios from "axios";

const SeeTeacher = () => {
  const [Data,setData]=useState([]);
   const [date,setDate]=useState([]);


const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${URL}/get-all-teachers-with-course-count`);
        const data = response.data.data;

        const createdDates = data.map((teacher) =>
          new Date(teacher.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        );

        setData(data);
        setDate(createdDates);
      } catch (err) {
      }
    };

    fetchTeachers();
  }, []);

  
  return (
    
    <>
     <div className='h-100 w-100 p-3' style={{overflowX:"scroll",scrollbarWidth:'none',cursor:"pointer"}}>
<h3 style={{fontWeight:"500",fontSize:"25px"}} className='text-center fw-bold'>All Teachers</h3>
<div className='mt-3'>
 <table className="w-100" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>
    <tr>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>S.No.</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}> Name</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Email</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Uid</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Role</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Date</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>MobileNo.</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>qualification</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Courses</th>
    </tr>
    
   
{Data &&
Data.map((item,i)=>(
          <tr  style={{cursor:"pointer"}} key={i}>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>{i+1}</td>
          
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>{item.fullname}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>{item.email}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>{item._id}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>{item.role}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}} >{date[i]}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}} >{item.mobilenumber}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}} >{item.qualification}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}} >{item.courseCount}</td>
        
         
        </tr>
))
}
     
    </table>
</div>
</div>
    </>
  )
}

export default SeeTeacher