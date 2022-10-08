import React from 'react';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import Dashboard from '../views/Dashboard'
import MyCalendar from '../views/MyCalendar'
import Attendence from '../views/Attendence';
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
import Adminattendence from '../views/Adminattendence';
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
export default function myRouter() {
  return (
   <Router>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="*" element={<Missing />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/password_reset" element={<ResetPassword />} />
            
            <Route element={<PrivateRoute  />}>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/attendence" element={<Attendence/>}/>
              <Route path="/allattendence" element={<Adminattendence/>}/>
              <Route path="/map/:lat/:log" element={<Maps/>}/>
              <Route path="/calendar" element={<MyCalendar/>}/>
              <Route path="/schedule" element={<Schedule/>}/>
              <Route path="/assigntask" element={<AssignTask/>}/>
              <Route path="/edittask/:id" element={<EditTask/>}/>
              <Route path="/voicenote" element={<VoiceNote/>}/>
              <Route path="/audio" element={<MyAudio/>}/>
              <Route path="/needbasedtask" element={<NeedbasedTask/>}/>
              <Route path="/schedulehistory" element={<ScheduleHistory/>}/>
              <Route path="/veiw/:id" element={<ScheduleVeiw/>}/>
              <Route path="/taskprogress" element={<TaskProgress/>}/>
              <Route path="/mytasks" element={<MyTasks/>}/> 
              <Route path="/tasks" element={<AddTask/>}/> 
              <Route path="/task/:id" element={<EditMyTasks/>}/> 
              <Route path="/verifytask" element={<Adminverify/>}/> 
              <Route path="/verifiedtasks" element={<AdminVerificationHistory/>}/>
              <Route path="/profile" element={<Profile/>} />
              <Route path="/members" element={<Members/>} />
              <Route path="/healthform" element={<HealthForm/>} /> 
              <Route path="/mystatus" element={<HealthStatus/>} /> 
              <Route path="/allhealthstatus" element={<AdminhealthStatus/>} /> 
              <Route path="/unauthorized" element={<Unauthorized/>} />  
          </Route>
          
        </Routes>
   </Router>
    
  )
}
