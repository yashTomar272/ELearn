import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nopage = () => {
    const navigate=useNavigate()
  return (
    <>
    <div className='DALJU'>
<h1 className='text-primary'>No page here </h1>
<h4 className='text-Succss'>Plzz Login</h4>
<button className='see_btn' onClick={()=>navigate("/login")}>Login</button>
    </div>
    </>
  )
}

export default Nopage