
import { FaTasks, FaUserFriends } from 'react-icons/fa';
import { ImHome } from 'react-icons/im'
import { RiTimerLine, RiHealthBookFill, RiHealthBookLine } from 'react-icons/ri'
import { TbCalendarTime } from 'react-icons/tb'
import { BsPersonCircle, BsListTask} from 'react-icons/bs'
import { GiHealthNormal } from 'react-icons/gi'
import { MdAddTask } from 'react-icons/md';

export const Menus = {
  
  member : [
    // {title: "DASHBOARD", src: <ImHome size={25} />, link: '/dashboard'},
    {title: "ATTENDANCE", src:<RiTimerLine size={25} />, link: '/attendance'},
    {title: "WORK SCHEDULE", src:<TbCalendarTime size={25} />, link: '/schedule', subLinks:[
      {title: "ASSIGNED TASKS", link:'/schedule'},
      {title: "AUDIO TASK", link:'/audio'}
    ]},
  
    {title: "TASKS", src:<FaTasks size={25} />, link: '/mytasks', subLinks: [
      {title: "MY TASKS", link: '/mytasks'},
      {title: "ADD TASKS", link: '/tasks'},
    ]},
    {title: "PROFILE", src:<BsPersonCircle size={25} />, link: '/profile'},
    {title: "HEALTH FORM",src: <GiHealthNormal size={25} />, link: '/healthform', subLinks: [
      {title: "HEALTH FORM", link: '/healthform'},
      {title: "MY STATUS", link: '/mystatus'},
    ]},
  ],

  admin : [
    {title: "DASHBOARD", src: <ImHome size={25} />, link: '/dashboard'},
    {title: "ATTENDANCE", src:<RiTimerLine size={25} />, link: '/allattendance'},
    {title: "WORK SCHEDULE", src:<TbCalendarTime size={25} />, link: '/assigntask', subLinks: [
      // {title: "CALENDER", link: '/calendar'},
      {title: "ASSIGN TASK", link: '/assigntask'},
      {title: "NEED BASED TASK", link: '/needbasedtask'},
      {title: "USE AUDIO", link: '/voicenote'},
      {title: "SCHEDULE HISTORY", link: '/schedulehistory'},
      {title: "TASK PROGRESS", link: '/taskprogress'},
    ]},
  
    {title: "TASKS", src:<FaTasks size={25} />, link: '/verifytask', subLinks: [
      {title: "VERIFY TASK", link: '/verifytask'},
      {title: "VERIFIED TASKS", link: '/verifiedtasks'},
    ]},
    {title: "PROFILE", src:<BsPersonCircle size={25} />, link: '/profile'},
    {title: "MEMBERS", src:<FaUserFriends size={25} />, link: '/members'},
    {title: "HEALTH STATUS", src: <GiHealthNormal size={25} />, link: '/allhealthstatus', subLinks: [
      {title: "HEALTH STATUS", link: '/allhealthstatus'},
      {title: "HEALTH FILES", link: '/healthfile'},
    ]},
  ],

  super_admin: [
    {title: "DASHBOARD", src: <ImHome size={25} />, link: '/dashboard'},
    {title: "ATTENDANCE", src:<RiTimerLine size={25} />, link: '/allattendance'},
    {title: "WORK SCHEDULE", src:<TbCalendarTime size={25} />, link: '/assigntask', subLinks: [
      // {title: "CALENDER", link: '/calendar'},
      {title: "ASSIGN TASK", link: '/assigntask'},
      {title: "NEED BASED TASK", link: '/needbasedtask'},
      {title: "SCHEDULE HISTORY", link: '/schedulehistory'},
      {title: "TASK PROGRESS", link: '/taskprogress'},
    ]},
  
    {title: "TASKS", src:<FaTasks size={25} />, link: '/mytasks', subLinks: [
      {title: "MY TASKS", link: '/mytasks'},
      {title: "ADD TASKS", link: '/tasks'},
      {title: "VERIFY TASK", link: '/verifytask'},
      {title: "VERIFIED TASKS", link: '/verifiedtasks'},
    ]},
    {title: "PROFILE", src:<BsPersonCircle size={25} />, link: '/profile'},
    {title: "MEMBERS", src:<FaUserFriends size={25} />, link: '/members'},
    {title: "HEALTH STATUS", src: <GiHealthNormal size={25} />, link: '/healthform', subLinks: [
      {title: "HEALTH FORM", link: '/healthform'},
      {title: "MY STATUS", link: '/mystatus'},
      {title: "OVERALL STATUS", link: '/allhealthstatus'}
    ]},
  ],

}

