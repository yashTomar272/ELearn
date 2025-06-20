import React from 'react'
import PhotoFirst from "../imgs/walfirst.png"
import PhotoSecond from "../imgs/walsecond.jpg"
import first from "../imgs/sfirst.avif"
import second from "../imgs/ssecond.webp"
import third from "../imgs/sthird.avif"
import fourth from "../imgs/sfourth.avif"
import { CiSquareCheck } from "react-icons/ci";
import Sidemain from './Sidemain'



const SlideCenter = () => {
  return (
<>
<div>
<Sidemain/>
   <div className='Back_url p-3 d-flex position-relative align-items-center justify-content-around'>
    <div>
        <h3 className='FONT ' style={{fontSize:"24px"}}>Watch free online Lecture</h3>
<div className='d-flex flex-column'>
  <div className='d-flex gap-2' >
    <CiSquareCheck className='fs-bold fs-4' style={{ color: "rgba(54, 35, 221, 0.6)", transform: "rotate(20deg )" }}
/>
   <p style={{fontSize:"14px",fontWeight:"600",color:"#3c4852"}}> Learn from expert educators in real-time</p>
  </div>
  <div className='d-flex gap-2' >
    <CiSquareCheck className='fs-bold fs-4' style={{ color: "rgba(54, 35, 221, 0.6)", transform: "rotate(20deg )" }}
/>
   <p style={{fontSize:"14px",fontWeight:"600",color:"#3c4852"}}> Access recorded sessions anytime, anywhere</p>
  </div>
  <div className='d-flex gap-2' >
    <CiSquareCheck className='fs-bold fs-4' style={{ color: "rgba(54, 35, 221, 0.6)", transform: "rotate(20deg )" }}
/>
   <p style={{fontSize:"14px",fontWeight:"600",color:"#3c4852"}}> Boost your preparation with topic-wise video lecture
</p>
  </div>
</div>
    </div>
    <div></div>
    <div className='position-relative d-flex flex-column gap-2 logo_div'>
          <div className='position-relative  ms-3 logo_div'>

<img src={first} style={{height:"35px",aspectRatio:"1",borderRadius:"50%"}}/>
<img src={second} style={{height:"35px",aspectRatio:"1",borderRadius:"50%",position:"absolute",top:"0px",left:"25px"}}/>
<img src={third} style={{height:"35px",aspectRatio:"1",borderRadius:"50%",position:"absolute",top:"0px",left:"50px"}}/>
<img src={fourth} style={{height:"35px",aspectRatio:"1",borderRadius:"50%",position:"absolute",top:"0px",left:"75px"}}/>

      </div>
      <h4 style={{fontSize:"23px",color:"#3c4852",fontWeight:"700"}} className='m-0 p-0'>10.7K Learners</h4>
      <p style={{fontSize:"14px",color:"#7a8b94",fontWeight:"400"}} className='m-0 p-0'>watched a class today</p>
    </div>
   </div>
   <div className='w-100' style={{height:"0.7px",background:"#7a8b94"}}></div>
</div>
</>
)
}

export default SlideCenter