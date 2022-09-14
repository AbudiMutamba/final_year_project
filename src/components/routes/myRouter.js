import React from 'react';
import Login from '../views/login';
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


import { 
    BrowserRouter as Router, Routes, Route
} from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import ScheduleHistory from '../views/ScheduleHistory';

export default function myRouter() {
  return (
   <Router>
        <Routes>
            <Route path="/" element={<Login/>}/>
            
            <Route element={<PrivateRoute/>}>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/attendence" element={<Attendence/>}/>
              <Route path="/calendar" element={<MyCalendar/>}/>
              <Route path="/assigntask" element={<AssignTask/>}/>
              <Route path="/needbasedtask" element={<NeedbasedTask/>}/>
              <Route path="/schedulehistory" element={<ScheduleHistory/>} />
              <Route path="/taskprogress" element={<TaskProgress/>}/>
              <Route path="/mytasks" element={<MyTasks/>}/> 
              <Route path="/tasks" element={<AddTask/>}/> 
              <Route path="/profile" element={<Profile/>} />
              <Route path="/members" element={<Members/>} />
              <Route path="/myhealth" element={<HealthForm/>} />    
                
          </Route>
        </Routes>
   </Router>
    
  )
}
