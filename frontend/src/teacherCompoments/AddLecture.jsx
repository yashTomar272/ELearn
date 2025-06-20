import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {  toast } from "react-toastify";


const AddLecture = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  const [lessonName, setLessonName] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const URL = process.env.REACT_APP_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/courses-lecture/${id}`, {
        lessonName,
        url,
      });

      if(res.status===200){
           toast.success(res.data.message)
         }else{
         toast.error(res.data.message)
         }
    
   navigate("/teacher/MyCourses")
      
    } catch (error) {
      setMessage("Error adding lesson.");
      console.error(error);
    }
  };

  return (
   <div className='h-100 w-100 p-3'>
<h3 style={{fontWeight:"500",fontSize:"25px"}} className='text-center fw-bold'>Add Lecture</h3>

<div className='w-100 h-100 DALJU mt-3'>
     
      <form onSubmit={handleSubmit} style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",borderRadius:"10px",height:"180px",width:"390px", backgroundColor: "rgba(110, 98, 214, 0.4)"}} className='p-3 d-flex flex-column gap-3'>
        <div className="userInputBox">
          
          <input
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            required
            id="name"
            className='m-0 text-dark'
          />
          <label htmlFor="name">Add lecture lecture title</label>
        </div>

         <div className="userInputBox">
          
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
              id="video_url"
            className='m-0 text-dark'
          />
          <label htmlFor="video_url">Add lecture lecture link</label>
        </div>

        <div className="d-flex justify-content-end w-100">
  <button className="see_btn " type="submit">Submit</button>
</div>
      </form>
    </div>
    </div>
  );
};

export default AddLecture;
