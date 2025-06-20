import { Routes, Route } from 'react-router-dom'
import AdminLayout from './adminComponent/AdminLayout'
import CenterTeacher from './teacherCompoments/CenterTeacher'
import SeeTeacher from './adminComponent/SeeTeacher'
import AllTransaction from './adminComponent/AllTransaction'
import SeeStudent from './adminComponent/SeeStudent'
import MyCourses from './adminComponent/MyCourses'
import ProfileSetting from './adminComponent/ProfileSetting'
import SeeLecture from './adminComponent/SeeLecture'
import EditCourses from './adminComponent/EditCourses'
import EditLecture from './adminComponent/EditLecture'
import InfoCourses from './adminComponent/InfoCourses'
import WatchVideo from './adminComponent/WatchVideo'


// aur koi pages...

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="" element={<CenterTeacher />} />
        <Route path="/SeeTeacher" element={<SeeTeacher />} />
        <Route path="/AllTransaction" element={<AllTransaction />} />
        <Route path="/SeeStudent" element={<SeeStudent />} />
        <Route path="/MyCourses" element={<MyCourses />} />
        <Route path="/ProfileSetting" element={<ProfileSetting />} />
        <Route path="/SeeLecture/:id" element={<SeeLecture />} />
        <Route path="/EditCourses/:id" element={<EditCourses />} />
        <Route path="/InfoCourses/:id" element={<InfoCourses />} />
        <Route path="/WatchVideo/:url" element={<WatchVideo />} />
        <Route path="/EditLecture/:courseId/:lessonId" element={<EditLecture />} />

       

        
     
        
      </Route>
    </Routes>
  )
}

export default AdminRoutes
