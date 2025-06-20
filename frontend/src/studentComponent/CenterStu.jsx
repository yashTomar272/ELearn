import React from 'react'
import SlideCenter from './SlideCenter'
import MostCourses from './MostCourses'
import FreeCourses from './FreeCourses'
import Teacher from './Teacher'

const CenterStu = () => {
  return (
<>
<div className='w-100 '>
<SlideCenter/>
<MostCourses/>
<FreeCourses/>
<Teacher/>
</div>
</>
  )
}

export default CenterStu