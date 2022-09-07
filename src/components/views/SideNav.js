import React, {useState} from 'react'
import logo from '../assets/logo.png'
import control from '../assets/control.png'
import dashboard from '../assets/homepage-icon.png'
import attendance from '../assets/timer-icon.png'
import workschedule from '../assets/work-schedule-icon.png'
import tasks from '../assets/pin-note-icon.png'
import profile from '../assets/user-profile-icon.png'
import members from '../assets/members-icon.png'
import { NavLink } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function SideNav() {
  const [open, setOpen] = useState(false)
  const Menus = [
    {title: "DASHBOARD", src:`${dashboard}`, link: '/dashboard'},
    {title: "ATTENDANCE", src:`${attendance}`, link: '/attendenceHistory'},
    {title: "WORK SCHEDULE", src:`${workschedule}`, link: '/work'},
    {title: "TASKS", src:`${tasks}`, link: '/tasks'},
    {title: "PROFILE", src:`${profile}`, link: '/profile'},
    {title: "MEMBERS", src:`${members}`, link: '/members'},

  ]
  return (
    <div className='flex'>
        <div className={`${open ? 'w-72' : 'w-20'} duration-300 p-5 pt-8 w-72 h-screen bg-zinc-100 relative`}>

          <img src={control} alt='control'className={`absolute rounded-full cursor-pointer -right-3 top-9 w-7 border-2 border-orange-600 ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}></img>

          <div className= 'flex gap-x-4 items-center' >
            <img src={logo} alt='logo' width="64" height="64" className='{`cursor-pointer duration-500 `}'></img>
            <h1 className={`origin-left font-medium text-xl duration-500 ${!open && "scale-0"}`}>M&E</h1>
          </div>
          <ul className='pt-8'>
            {Menus.map((Menu,index)=> (
              <NavLink to={`${Menu.link}`} 
              activeClassName={`bg-red-600`} 
              key={index} className={`flex rounded-md p-2 cursor-pointer hover:bg-orange-600 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`} >
                <img src={Menu.src} alt="dash" width="20" height="30" />
              <div className='flex justify-between items-center w-full'>
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
                {[2,3].includes(index) && (
                      <i
                        // className={`${
                        //   index === selectedIndex ? "rotate-180" : ""
                        // } transition ease-in-out font-bold flex justify-center items-center`}
                      >
                        <MdKeyboardArrowDown />
                      </i>
                )}
              </div>
              </NavLink>
            ))}
          </ul>
        </div>
    </div>
    
  )
}
