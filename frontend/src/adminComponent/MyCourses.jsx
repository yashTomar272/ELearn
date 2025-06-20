

import axios from 'axios'
import { useEffect,useState } from "react";
import Loader from "../component/Loader";
import second from "../imgs/hh.webp"
import CourseCard from "./CourseCard"



const MyCourses = () => {
  const [Showloader,setShowloader]=useState(true)
  const [Data,setData]=useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const [PaidCourse,setPaidData]=useState([]);
  const [FreeCourse,setFreeData]=useState([]);
 const URL = process.env.REACT_APP_URL;


  const headers = {
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`
};
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

const handlePaidCourse = async () => {
  const response = await axios.get(`${URL}/get-paid-course`);
  setPaidData(response.data.data);
  setActiveTab("paid"); // yeh important hai
  setShowloader(false);
};

const handleFreeCourse = async () => {
  const response = await axios.get(`${URL}/get-free-course`);
  setFreeData(response.data.data);
  setActiveTab("free"); // yeh important hai
  setShowloader(false);
};


  return (
    <>
    <div className='h-100 w-100 p-3'>
<h3 style={{fontWeight:"500",fontSize:"25px"}} className='text-center fw-bold'>My Courses</h3>
<div className="d-flex gap-2 ">
      <div className="d-flex justify-content-center w-100">
  <button className="see_btnn" onClick={handlePaidCourse}>Paid Course</button>
</div>
      <div className="d-flex justify-content-center w-100">
  <button className="see_btnn"  onClick={() => setActiveTab("all")} >All Course</button>
</div>
  <div className="d-flex justify-content-center w-100">
  <button className="see_btnn" onClick={handleFreeCourse}>Free Course</button>
</div>
</div>
 {Showloader && <Loader/>}
 
{/* Course Cards */}
      <div className="row gap-3 d-flex align-items-center justify-content-evenly mt-3">
        {activeTab === "all" && Data.map((item, i) => <CourseCard item={item} key={i} />)}

        {activeTab === "paid" && PaidCourse.map((item, i) => <CourseCard item={item} key={i} />)}

        {activeTab === "free" && FreeCourse.map((item, i) => <CourseCard item={item} key={i} />)}

        {/* No data fallback */}
        {((activeTab === "all" && Data.length === 0) ||
          (activeTab === "paid" && PaidCourse.length === 0) ||
          (activeTab === "free" && FreeCourse.length === 0)) && (
          <div className="text-center">
            <img src={second} alt="no data" style={{ width: "170px", height: "80px" }} />
            <p>No courses found</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default MyCourses