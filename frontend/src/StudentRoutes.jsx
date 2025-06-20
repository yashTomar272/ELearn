import { Routes, Route } from 'react-router-dom'
import StuLayout from './studentComponent/StuLayout'
import CenterStu from './studentComponent/CenterStu'
import Favourite from './studentComponent/Favourite'
import ProfileSetting from './studentComponent/ProfileSetting'
import AllCourses from './studentComponent/AllCourses'
import YourCourses from './studentComponent/YourCourses'
import SeeTeacher from './studentComponent/SeeTeacher'
import SeeLecture from './studentComponent/SeeLecture'
import WatchVideo from './studentComponent/WatchVideo'
import InfoCourses from './studentComponent/InfoCourses'
import ShowIdCourses from './studentComponent/ShowIdCourses'
import CourseCard from './studentComponent/CourseCard'


// aur koi pages...

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StuLayout />}>
        <Route path="" element={<CenterStu />} />
        <Route path="/Favourite" element={<Favourite />} />
        <Route path="/ProfileSetting" element={<ProfileSetting />} />
        <Route path="/AllCourses" element={<AllCourses />} />
        <Route path="/YourCourses" element={<YourCourses />} />
        <Route path="/SeeTeacher" element={<SeeTeacher />} />
        <Route path="/SeeLecture/:id" element={<SeeLecture />} />
               <Route path="/WatchVideo/:url" element={<WatchVideo />} />
        <Route path="/InfoCourses/:id" element={<InfoCourses />} />
        <Route path="/CourseCard" element={<CourseCard />} />
        <Route path="/ShowIdCourses/:id" element={<ShowIdCourses />} />



       

        
     
        
      </Route>
    </Routes>
  )
}

export default StudentRoutes
