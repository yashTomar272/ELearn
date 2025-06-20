import React, { useEffect, useState } from 'react';

import {  toast } from "react-toastify";
import photo from "../imgs/jsthumb.png"
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { BiSolidLock,BiSolidLockOpen } from "react-icons/bi";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";


const CourseCard = ({item}) => {
  const navigate=useNavigate();
  const [Show,setShow]=useState();
  const [fav, setFav] = useState(false); 
 const URL = "http://localhost:8000";
 const stripePromise = loadStripe("pk_test_51Qf1VfRvKnbQ5boup1Z0bzdNFrFI5TA3pIpEPWszraHDPe6yGcFFQRLXL1ZbwSNTGn1C7xfwtmzYn86poVC5GEd800bwUaccBc");
  const [purchasedCourseIds, setPurchasedCourseIds] = useState([]);

 
  useEffect(() => {
    const checkFav = async () => {
      try {
        const res = await axios.get(`${URL}/get-fav`, {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });

        const favList = res.data.favourites; // ✅ Array of course ids
        if (favList.includes(item._id)) {
          setFav(true); // ✅ Already in fav
        }
      } catch (err) {
        console.error("Error fetching fav list:", err);
      }
    };

    checkFav();
  }, [item._id]);


useEffect(() => {
  const fetchPurchases = async () => {
    try {
      const response = await axios.get(`${URL}/my-purchases`, {
        headers: {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Extract course IDs from purchases
      const allCourseIds = response.data.data.flatMap(purchase =>
        purchase.courses.map(course => course._id)
      );

      setPurchasedCourseIds(allCourseIds);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  fetchPurchases();
}, []);

 const handleFavourite=async(id)=>{
    setShow(!Show);
     const response=await axios.put(`${URL}/add-to-fav`,{},{
        headers:{
          id:localStorage.getItem("id"),
          authorization:`Bearer ${localStorage.getItem("token")}`,
          courseid:id,
        }
      });
      if(response.status===200){
        toast.success(response.data.message)
      }else{
      toast.error(response.data.message)
      }
    
  }
  const handleRemoveProduct = async (id) => {
    try {
      const response = await axios.put(`${URL}/delete-to-fav`
        ,
        {},
        {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
            courseid: id,  // Pass correct id
          },
        }
      );
      if(response.status===200){
             toast.success(response.data.message)
           }else{
           toast.error(response.data.message)
           }

      // Remove the book from the state to update UI instantly
      // setFav((prevFav) => prevFav.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };
 const handleBuy = async () => {
  const stripe = await stripePromise;

  const { data } = await axios.post(`${URL}/create-checkout-session`,
    { item }, // 👈 sirf course bhejna hai body me
    {
      headers: {
        userid: localStorage.getItem('id'), // 👈 yaha userId headers me bhejna
      },
    }
  );

  await stripe.redirectToCheckout({ sessionId: data.id });
};



  return (
   <>
   <div  style={{maxWidth:"290px",minWidth:"280px",boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",borderRadius:"9px"}} className=' d-flex flex-column p-0 position-relative '>
   {fav ? (
  <MdDeleteOutline className='delet_Course_icon cr' onClick={()=>handleRemoveProduct(item._id)} />
) : (
  Show ? (
    <FaHeart className='delet_Course_icon cr' onClick={() => handleFavourite(item._id)} />
  ) : (
    <FaRegHeart className='delet_Course_icon cr' onClick={() => handleFavourite(item._id)} />
  )
)}

    
           {item.type==="paid" && <BiSolidLock className='edit_Course_icon' />}
   <img src={item.thumbnail} alt='Courses_img' style={{height:"150px",width:"100%",borderRadius:"9px 9px 0 "}}/>
   <div style={{width:"100%"}} className=' p-2 d-flex flex-column gap-2'>
   <div className='d-flex gap-3'>
     <span style={{color:"black",fontSize:"13px",fontWeight:"400"}}>{item.language}</span>
     <span style={{color:"blue",fontSize:"13px",fontWeight:"600"}}>{item.subject}</span>
   </div>
   <span style={{color:"black",fontSize:"16px",fontWeight:"600"}}>{item.title}</span>
   <span style={{color:"rgb(179, 174, 174)",fontSize:"12px",fontWeight:"600"}}>valid:{item.valid} . {item.lecture}</span>
      <div className='d-flex flex-row justify-content-between align-items-center'>
   <span style={{color:"black",fontSize:"16px",fontWeight:"600"}}><span style={{color:"black",fontSize:"14px",fontWeight:"500"}}>Teacher name:</span>{item.teachername}</span>
   </div>
   <div className='d-flex flex-row justify-content-between align-items-center'>
     {item.type==="paid" &&
   <span style={{color:"black",fontSize:"14px",fontWeight:"600"}}><MdOutlineCurrencyRupee className='fs-5'/>{item.price}</span>
     
     }

    {item.type === "free" || purchasedCourseIds.includes(item._id) ? (
  <button className='see_btn' onClick={()=>navigate(`/stu/SeeLecture/${item._id}`)}>
    See Lecture
  </button>
) : (
  <button className='see_btn'  onClick={handleBuy}>
    Buy Course
  </button>
)}



   </div>

   
   </div>
       </div>    
   </>
  )
}

export default CourseCard