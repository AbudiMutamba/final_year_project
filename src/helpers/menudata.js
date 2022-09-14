
import { FaTasks, FaUserFriends } from 'react-icons/fa';
import { ImHome } from 'react-icons/im'
import { RiTimerLine } from 'react-icons/ri'
import { TbCalendarTime } from 'react-icons/tb'
import { BsPersonCircle } from 'react-icons/bs'
import { GiHealthNormal } from 'react-icons/gi'

export const Menus = [
  {title: "DASHBOARD", src: <ImHome size={25} />, link: '/dashboard'},
  {title: "ATTENDENCE", src:<RiTimerLine size={25} />, link: '/attendence'},
  {title: "WORK SCHEDULE", src:<TbCalendarTime size={25} />, link: '/calendar', subLinks: [
    {title: "Calendar", link: '/calendar'},
    {title: "Assign Task", link: '/assigntask'},
    {title: "Need based Task", link: 'needbasedtask'},
    {title: "Schedule History", link: 'schedulehistory'},
    {title: "Task Progress", link: 'taskprogress'},
  ]},
  {title: "TASKS", src:<FaTasks size={25} />, link: '/mytasks', subLinks: [
    {title: "My tasks", link: 'mytasks'},
    {title: "Add tasks", link: 'tasks'},
  ]},
  {title: "PROFILE", src:<BsPersonCircle size={25} />, link: '/profile'},
  {title: "MEMBERS", src:<FaUserFriends size={25} />, link: '/members'},
  {title: "Health Status", src: <GiHealthNormal size={25} />, link: '/myhealth', subLinks: [
    {title: "Health form", link: 'calendar'},
    {title: "My status", link: 'tasks'},
  ]},

]

