import { CiSearch } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import React, { useState,useEffect } from 'react'
import photo from "../imgs/photo.jpg"
import first from "../imgs/first.png"
import second from "../imgs/hh.webp"
  import { useDispatch, useSelector } from 'react-redux';
  import { authActions } from '../store/auth';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const NavAdmin = () => {
     const navigate=useNavigate();
     const [Show, setShow] = useState(true);
      const [search, setSearch] = useState("");  // Search term ko track karne ke liye
  const [searchResults, setSearchResults] = useState([]);  // Products ko store karne ke liye

      const handleShow = () => {
        setShow(!Show);
      };
  const dispatch=useDispatch();

  const handleSearchChange = (event) => {
  setSearch(event.target.value);
};
  const role=useSelector((state)=>state.auth.role);
   const [date,setDate]=useState([]);
const [profile,setProfile]=useState([]);


const URL = "http://localhost:8000";

  const headers={
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`
}
useEffect(()=>{
     const fetch=async()=>{
const response=await axios.get( `${URL}/get-user-information`,{headers});

   const hhdate=new Date( response.data.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });

setDate(hhdate)
setProfile(response.data);
     }
     fetch();
  },[])
  const TruncateText = ({ text }) => {
  if (text.length <= 28) {
    return <span className="m-0 p-0">{text}</span>;
  } else {
    return <h6 className="m-0 p-0">{text.substring(0, 27)}...</h6>;
  }
};
  const TruncateTexttt = ({ text }) => {
  if (!text) {
    return <span className="m-0 p-0">No Text</span>; // ya "" bhi rakh sakte ho
  }

  if (text.length <= 28) {
    return <span className="m-0 p-0">{text}</span>;
  } else {
    return <h6 className="m-0 p-0">{text.substring(0, 27)}...</h6>;
  }
};


useEffect(() => {
  const fetchSearchResults = async () => {
    try {
      if (!search) {
        setSearchResults([]);
        return;
      }

      const response = await axios.get(`${URL}/search-all-course`, {
        params: {
          query: search,  // 🔍 search query
        },
        headers: {
                  id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  fetchSearchResults();
}, [search]);


  return (
   
    <>
    <div className='top_div w-100   d-flex align-items-center justify-content-between px-4 ' style={{height:"60px"}}>
        {/* search code */}
        <div style={{height:"40px",width:"322px"}}>
    <div className='ms-4 search_div d-flex align-items-center justify-content-between position-relative h-100 -w-100'  >
        <input  value={search}  onChange={handleSearchChange} className="d-none  d-md-flex" type='text' placeholder='Search here' style={{flexGrow:"1",height:"40px",outline:"none",border:"none",padding:"0 5px 0 10px",borderTopLeftRadius:"7px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",}}/>
        <div className='DALJU  cr' style={{background:"rgba(54, 35, 221, 0.6)",height:"40px",aspectRatio:"1",borderBottomRightRadius:"7px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"}}>
    <CiSearch/>
        </div>
        {search && (
         <div className="p-2 bg-white d-flex flex-column  gap-3" style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",height:"300px",width:"300px",borderRadius:"0px 0px 10px 10px",position:"absolute",top:"50px",zIndex:"5",  overflowY: "auto" }} >
  {searchResults.length > 0 ? (
                      <>
                        {searchResults.map((val, id) =>(
                         
  <div key={id} style={{width:"100%",height:"40px"}} className="d-flex align-items-center gap-2 mini_show cr" onClick={()=>{
    navigate(`/admin/InfoCourses/${val._id}`);
    setSearch()
  }}>
  <img src={val.thumbnail} style={{height:"40px",aspectRatio:"1"}}/>
<div className="m-0 p-0 d-flex flex-column">
    <span
    className="m-0 p-0 "
style={{fontSize: "16px",fontWeight: "500",color: "rgba(58, 54, 54, 0.8)"}}>
  <TruncateText text={val.title}/>
 </span>
   <span
    className="m-0 p-0 fw-bold"
 style={{fontSize: "13px",fontWeight: "500",color: "rgba(31, 29, 29, 0.8)"}}>
  {val.subject}
 </span>
</div>
</div>))}
</>):(
                      <>
                        <span className="DALJU h-100 w-100">
                          <img
                            src={second}
                            style={{ width: "170px", height: "80px" }}
                          />
                        </span>
                      </>
                    )}

        </div>
        )}
        </div>
       
    </div>
    {/* profile logo code */}
    <div className='profile_logo  DALJU gap-3 position-relative' style={{height:"42px",borderRadius:"18px",padding:"0 7px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"}}>
    <div><FaRegBell className='fs-4 cr'/></div>
    <div className='profile_photo_div d-flex gap-2 align-items-center'>
        <img src={photo} alt='profile_photo' className='cr' style={{height:"30px",aspectRatio:"1",borderRadius:"50%"}}/>
        <div className='d-none d-md-flex flex-column'>
        <p className='p-0 m-0 fw-bold' style={{fontWeight:"10px",height:"16px"}}><TruncateTexttt text={profile?.fullname || ""}/></p>
        <p className='p-0 m-0' style={{fontWeight:"2px",color:"rgba(94, 88, 88, 0.8)",height:"16px"}}>{profile.role}</p>
        </div>
    </div>
    <div>
        {Show ?(<TiArrowSortedDown className='cr CL fs-3' onClick={handleShow}/>):(<TiArrowSortedUp className='cr CL fs-3' onClick={handleShow}/>)}
    </div>
   {!Show &&
(
    <div className="d-flex align-items-center gap-2 p-1 flex-column" style={{height:"100px",width:"220px",position:"absolute",top:"45px",right:'0px',zIndex:"3",background:"white",borderRadius:"9px",boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"}}>
<span style={{fontSize:"16px",fontWeight:"600"}}>registered in at:</span>
<span style={{fontSize:"16px",fontWeight:"500"}}>{date}</span>
<button className='see_btn'
  onClick={()=>
      {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("student"));
localStorage.clear("id");
localStorage.clear("token");
localStorage.clear("role");
navigate("/login")
      }
      }
>Logout</button>

    </div>
   )}
        </div>
    
    </div>
    </>
  )
}

export default NavAdmin