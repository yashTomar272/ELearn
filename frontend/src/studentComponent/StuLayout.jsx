// import React from 'react'
import SideStudent from './SideStudent'
// import CenterTeacher from './CenterTeacher'
import NavStudent from './NavStudent'
import { Outlet } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import Foot from './Foot';
  
const StuLayout = () => {
  const lgScreen = useMediaQuery({ maxWidth: 992 });
  const [showSide,setShowSide]= useState()
    useEffect(() => {
      if (lgScreen) {
    console.log(showSide)
  
        setShowSide(false)
    console.log(showSide)
      } else { setShowSide(true)
      }
    }, [lgScreen]);
  console.log(showSide)
  return (
  <>
  <div style={{height:"100vh",width:"100%"}} className='d-flex'>
    <div style={{width:lgScreen?"":'330px'}} className='top-0 sideTeacher_dashboard ' >
        <SideStudent showSide={showSide} setShowSide={setShowSide} lgScreen={lgScreen}/>
    </div>
    <div></div>
    <div className='centerTeacher_dashboard w-100' style={{flexGrow:"1"}}>
      <NavStudent/>
     <div className='main-container'>
          <Outlet />
        </div>
        <Foot/>
    </div>

  </div>
  </>
  )
}

export default StuLayout