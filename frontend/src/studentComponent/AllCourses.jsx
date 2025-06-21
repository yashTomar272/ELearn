import React from 'react'
import CourseCard from './CourseCard'
import axios from 'axios'
import { useEffect,useState } from "react";
import Loader from "../component/Loader";
import second from "../imgs/hh.webp"

const AllCourses = () => {
    const [Data,setData]=useState([]);
  const [Showloader,setShowloader]=useState(true)

 const URL = process.env.REACT_APP_URL;
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/get-all-course`);
    
      setData(response.data.data);
      setShowloader(false)

    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err.message);
    }
  };
  fetchData();
}, [Data]);
  return (
    <>
    <div className='w-100 p-3'>
    <h3 className='FONT fs-3  text-center'>All Courses</h3>
     {Showloader && <Loader/>}
    
        <div className="row gap-3 d-flex align-items-center justify-content-evenly mt-3">
         {   Data.map((item, i) => <CourseCard item={item} key={i} />
           )
            }
             {!Showloader && Data.length === 0 && (
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

export default AllCourses