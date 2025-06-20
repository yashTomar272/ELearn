

import axios from 'axios'
import { useEffect,useState } from "react";
import Loader from "../component/Loader";
import second from "../imgs/hh.webp"
import CourseCard from "./CourseCard"



const FreeCourses = () => {
  const [Showloader,setShowloader]=useState(true)
  const [Data,setData]=useState([]);
 const URL = process.env.REACT_APP_URL;
 useEffect(()=>{
const handlePaidCourse = async () => {
  const response = await axios.get(`${URL}/get-free-course`);
  setData(response.data.data);
  setShowloader(false);
};
handlePaidCourse();
 },[Data])
  
 




  return (
    <>
    <div className='h-100 w-100 p-3 Backk_url'>
<h4 style={{fontWeight:"700",fontSize:"20px",color:"3c4852#"}} className=' '>Free courses</h4>

 {Showloader && <Loader/>}

        <div className="row gap-3 d-flex align-items-center justify-content-evenly mt-3">
               {   Data.map((item, i) => <CourseCard item={item} key={i} />
                 )
                  }
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
  );
};

export default FreeCourses