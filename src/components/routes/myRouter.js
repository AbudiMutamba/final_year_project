import React from 'react';
import Login from '../views/login';
import Dashboard from '../views/Dashboard'
// import Nav from '../views/SideNav';
import MyCalendar from '../views/MyCalendar'
import AttendenceHistory from '../views/AttendenceHistory';
// import TopNav from '../views/TopNav';
import AssignWork from '../helpers/AssignWork';
import Profile from '../views/Profile';
import HealthForm from '../views/HealthForm'
import AddTask from '../helpers/AddTask';
import { 
    BrowserRouter as Router, Routes, Route
} from 'react-router-dom'
import PrivateRoute from './PrivateRoute';

export default function myRouter() {
  return (
   <Router>
        <Routes>
            <Route path="/" element={<Login/>} />
            {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
            
            

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/attendencehistory" element={<AttendenceHistory/>} />
              <Route path="/calendar" element={<MyCalendar/>} />
              <Route path="/work" element={<AssignWork/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/myhealth" element={<HealthForm/>} />    
              <Route path="/tasks" element={<AddTask/>} />    
          </Route>
        </Routes>
   </Router>
    
  )
}
