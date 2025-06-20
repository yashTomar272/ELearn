import SideAdmin from './SideAdmin'
import NavAdmin from './NavAdmin'
import { Outlet } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
  
const AdminLayout = () => {
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
        <SideAdmin showSide={showSide} setShowSide={setShowSide} lgScreen={lgScreen}/>
    </div>
    <div></div>
    <div className='centerTeacher_dashboard w-100' style={{flexGrow:"1"}}>
      <NavAdmin/>
     <div className='main-container'>
          <Outlet />
        </div>
    </div>

  </div>
  </>
  )
}

export default AdminLayout