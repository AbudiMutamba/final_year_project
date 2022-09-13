import dashboard from '../components/assets/homepage-icon.png'
import attendance from '../components/assets/timer-icon.png'
import workschedule from '../components/assets/work-schedule-icon.png'
import tasks from '../components/assets/pin-note-icon.png'
import profile from '../components/assets/user-profile-icon.png'
import members from '../components/assets/members-icon.png'
import { FaBeer, FaTasks, FaUserFriends } from 'react-icons/fa';
import { ImHome } from 'react-icons/im'
import { RiTimerLine } from 'react-icons/ri'
import { TbCalendarTime } from 'react-icons/tb'
import { BsPersonCircle } from 'react-icons/bs'
import { GiHealthNormal } from 'react-icons/gi'

export const Menus = [
  {title: "DASHBOARD", src: <ImHome size={25} />, link: '/dashboard'},
  {title: "ATTENDANCE", src:<RiTimerLine size={25} />, link: '/attendenceHistory'},
  {title: "WORK SCHEDULE", src:<TbCalendarTime size={25} />, link: '/work', subLinks: [
    {title: "calendar", link: 'calendar'},
    {title: "Assign work", link: 'assign-work'},
    {title: "Need based work", link: 'work'},
    {title: "History", link: 'history'},
    {title: "Work progress", link: 'progress'},
  ]},
  {title: "TASKS", src:<FaTasks size={25} />, link: '/tasks', subLinks: [
    {title: "My tasks", link: 'calendar'},
    {title: "Add tasks", link: 'tasks'},
  ]},
  {title: "PROFILE", src:<BsPersonCircle size={25} />, link: '/profile'},
  {title: "MEMBERS", src:<FaUserFriends size={25} />, link: '/members'},
  {title: "Health Status", src: <GiHealthNormal size={25} />, link: '/myhealth', subLinks: [
    {title: "Health form", link: 'calendar'},
    {title: "My status", link: 'tasks'},
  ]},

]

