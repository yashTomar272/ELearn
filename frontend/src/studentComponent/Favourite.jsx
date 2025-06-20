import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard'
import Loader from "../component/Loader";
import second from "../imgs/hh.webp"

const Favourite = () => {
 const URL = "http://localhost:8000";
  const [Showloader,setShowloader]=useState(true)

  const [Data,setData]=useState([]);
  console.log("dta",Data)
  useEffect(() => {
    const fetchFav = async () => {
      try {
        const response = await axios.get(`${URL}/get-to-fav`, {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(response.data.data);
      setShowloader(false)

      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };
    fetchFav();
  }, [Data]);
  return (
    <>
    <div className='w-100 p-3'>
    <h3 className='FONT fs-3  text-center'>Favourite Courses</h3>
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
  )
}

export default Favourite