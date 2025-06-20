import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import React from 'react';
import gif from '../imgs/success.gif';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Success() {
  
 const URL = "http://localhost:8000";

  
 const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();

  const handleDone = async () => {
    const { data } = await axios.post(`${URL}/place-order`, { session_id: sessionId });
    toast.success(data.message);
    navigate('/stu');
  };
  

  return (
    <div className='DALJU w-100 h-100 flex-column'>
      <img src={gif} alt="gif_img" className="img-fluid" />
      <h2>Your Payment Was Successful.</h2>
      <button
        className="btn fs-4 px-3 py-1 rounded-pill text-white"
        style={{ background: "rgb(31, 212, 40)" }}
        onClick={handleDone}
      >
        Done
      </button>
    </div>
  );
}
