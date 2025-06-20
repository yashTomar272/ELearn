import { Routes, Route } from 'react-router-dom'
import TeacherLayout from './teacherCompoments/TeacherLayout'
import CenterTeacher from './teacherCompoments/CenterTeacher'
import MyCourses from './teacherCompoments/MyCourses'
import SeeLecture from './teacherCompoments/SeeLecture'
import SeeTransaction from './teacherCompoments/SeeTransaction'
import ProfileSetting from './teacherCompoments/ProfileSetting'
import EditLecture from './teacherCompoments/EditLecture'
import EditCourses from './teacherCompoments/EditCourses'
import AddLecture from './teacherCompoments/AddLecture'
import AddCourse from './teacherCompoments/AddCourse'
import InfoCourses from './teacherCompoments/InfoCourses'
import WatchVideo from './teacherCompoments/WatchVideo'

// aur koi pages...

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TeacherLayout />}>
        <Route path="" element={<CenterTeacher />} />
        <Route path="/MyCourses" element={<MyCourses />} />
        <Route path="/SeeLecture/:id" element={<SeeLecture />} />
        <Route path="/SeeTransaction" element={<SeeTransaction />} />
        <Route path="/ProfileSetting" element={<ProfileSetting />} />
        <Route path="/EditLecture/:courseId/:lessonId" element={<EditLecture />} />
        <Route path="/EditCourses/:id" element={<EditCourses />} />
        <Route path="/AddLecture/:id" element={<AddLecture />} />
        <Route path="/InfoCourses/:id" element={<InfoCourses />} />
        <Route path="/AddCourse" element={<AddCourse />} />
        <Route path="/WatchVideo/:url" element={<WatchVideo />} />

        
     
        {/* Add more teacher routes here */}
      </Route>
    </Routes>
  )
}

export default TeacherRoutes
