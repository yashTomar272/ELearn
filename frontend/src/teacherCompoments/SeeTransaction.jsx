import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect,useState } from "react";

const SeeTransaction = () => {
    const [Data,setData]=useState([]);
   const URL = "http://localhost:8000";
  console.log("helo",Data)
  
  const headers = {
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`
};
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/my-buyers`, { headers });
    
      setData(response.data.data);
    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err.message);
    }
  };
  fetchData();
}, [Data]);
  return (
    
    <>
     <div className='h-100 w-100 p-3' style={{overflowX:"scroll",scrollbarWidth:'none',cursor:"pointer"}}>
<h3 style={{fontWeight:"500",fontSize:"25px"}} className='text-center fw-bold'>All Transaction</h3>
<div className='mt-3'>
 <table className="w-100" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>
    <tr>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>S.No.</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}> Name</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Email</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Uid</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Role</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Date</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Price</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>Title</th>
    </tr>
    
   
        <tr  style={{cursor:"pointer"}} >
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>1</td>
          
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>sfdsf</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>fdsfds</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>fdssd</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}}>fsgf</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}} >sfgf</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}} >sfgf</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid rgba(54, 35, 221, 0.6)"}} >sfgf</td>
        
         
        </tr>
     
    </table>
</div>
</div>
    </>
  )
}

export default SeeTransaction