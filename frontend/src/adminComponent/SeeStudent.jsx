import React, { useEffect,useState } from 'react'
import axios from "axios";

const SeeStudent = () => {
  const [Data,setData]=useState([]);
   const [date,setDate]=useState([]);


const URL = "http://localhost:8000";

  useEffect(() => {
  const fetchstudent = async () => {
    try {
      const response = await axios.get(`${URL}/get-students`);

      const datesArray = response.data.data.map((users) => {
        return new Date(users.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
      });

      setDate(datesArray);
      setData(response.data.data);
    } catch (err) {
    }
  };

  fetchstudent();
}, []);

  return (
    
    <>
     <div className='h-100 w-100 p-3' style={{overflowX:"scroll",scrollbarWidth:'none',cursor:"pointer"}}>
<h3 style={{fontWeight:"500",fontSize:"25px"}} className='text-center fw-bold'>All Students</h3>
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
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Buy</th>
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
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}} >sfgf</td>
        
         
        </tr>
))
}
     
    </table>
</div>
</div>
    </>
  )
}

export default SeeStudent