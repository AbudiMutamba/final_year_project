import React,{useState} from 'react';
import Login from '../views/Login';
// import SignUp from '../views/SignUp';
import Dashboard from '../views/Dashboard'
// import MyCalendar from '../views/MyCalendar'
import Attendance from '../views/Attendance';
import AssignTask from '../views/AssignTask';
import NeedbasedTask from '../views/NeedbasedTask';
import TaskProgress from '../views/TaskProgress'
import Profile from '../views/Profile';
import Members from '../views/Members';
import HealthForm from '../views/HealthForm'
import AddTask from '../views/AddTask';
import MyTasks from '../views/MyTasks';
import Missing from '../views/Missing'
import ForgotPassword from '../views/ForgotPassword';
import ResetPassword from '../views/ResetPassword';
import Unauthorized from '../views/Unauthorized';
import Maps from '../views/Map';
import { 
    BrowserRouter as Router, Routes, Route
} from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import ScheduleHistory from '../views/ScheduleHistory';
import Adminattendance from '../views/Adminattendance';
import Adminverify from '../views/Adminverify';
import AdminVerificationHistory from '../views/AdminVerificationHistory';
import AdminhealthStatus from '../views/AdminhealthStatus'
import HealthStatus from '../views/HealthStatus'
import Schedule from '../views/Schedule';
import EditTask from '../views/EditTask';
import ScheduleVeiw from '../views/ScheduleVeiw';
import EditMyTasks from '../views/EditMyTasks';
import VoiceNote from '../helpers/VoiceNote';
import MyAudio from '../views/MyAudio';
import  Recorder from '../views/voicenotes/Recorder';
import AdminVerifyTask from '../views/AdminVerifyTask';
import AdminHealthfiles from '../views/AdminHealthfiles';
export default function MyRouter() {
  const [loading, setLoading] = useState(true);
  const preloader = document.getElementById("preloader");

  const html = document.querySelector("html");
  if (localStorage.getItem("darkMode") === "true") {
    html.classList.add("darkClass");
  } else {
    html.classList.remove("darkClass");
  }

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setLoading(false);
    }, 500);
  }
 
  return (
    !loading && (
      <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>

                {/* <Route path="/signup" element={<SignUp/>}/> */}
                <Route path="*" element={<Missing />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/password_reset" element={<ResetPassword />} />
                
                <Route element={<PrivateRoute allowedRoles={["admin", "member"]} />}>
                  <Route path="/dashboard" element={<Dashboard allowedRoles={["admin"]}/>}/>
                  <Route path="/attendance" element={<Attendance allowedRoles={["member"]}/>}/>
                  <Route path="/allattendance" element={<Adminattendance allowedRoles={["admin"]}/>}/>
                  <Route path="/map/:lat/:log" element={<Maps allowedRoles={["admin"]}/>}/>
                  {/* <Route path="/calendar" element={<MyCalendar/>}/> */}
                  <Route path="/schedule" element={<Schedule allowedRoles={["member"]}/>}/>
                  <Route path="/assigntask" element={<AssignTask allowedRoles={["admin"]}/>}/>
                  <Route path="/edittask/:id" element={<EditTask allowedRoles={["admin"]}/>}/>
                  <Route path="/verify/:id" element={<AdminVerifyTask allowedRoles={["admin"]}/>}/>
                  {/* <Route path="/voicenote" element={<VoiceNote/>}/> */}
                  <Route path="/voicenote" element={<Recorder allowedRoles={["admin"]}/>}/>
                  <Route path="/audio" element={<MyAudio/>}/>
                  {/* <Route path="/audio" element={<Recorder/>}/> */}
                  <Route path="/needbasedtask" element={<NeedbasedTask allowedRoles={["admin"]}/>}/>
                  <Route path="/schedulehistory" element={<ScheduleHistory allowedRoles={["admin"]}/>}/>
                  <Route path="/veiw/:id" element={<ScheduleVeiw allowedRoles={["admin", "member"]}/>}/>
                  <Route path="/taskprogress" element={<TaskProgress allowedRoles={["admin"]}/>}/>
                  <Route path="/mytasks" element={<MyTasks allowedRoles={["member"]}/>}/> 
                  <Route path="/tasks" element={<AddTask allowedRoles={["member"]}/>}/> 
                  <Route path="/task/:id" element={<EditMyTasks allowedRoles={["member"]}/>}/> 
                  <Route path="/verifytask" element={<Adminverify allowedRoles={["admin"]}/>}/> 
                  <Route path="/verifiedtasks" element={<AdminVerificationHistory allowedRoles={["admin"]}/>}/>
                  <Route path="/profile" element={<Profile allowedRoles={["admin", "member"]}/>} />
                  <Route path="/members" element={<Members allowedRoles={["admin"]}/>} />
                  <Route path="/healthform" element={<HealthForm allowedRoles={["member"]}/>} /> 
                  <Route path="/mystatus" element={<HealthStatus allowedRoles={["member"]}/>} /> 
                  <Route path="/allhealthstatus" element={<AdminhealthStatus allowedRoles={["admin"]}/>} /> 
                  <Route path="/healthfile" element={<AdminHealthfiles allowedRoles={["admin"]} />} /> 
                  <Route path="/unauthorized" element={<Unauthorized/>} />  
              </Route>
              
            </Routes>
      </Router>
        
    )
  )
}
