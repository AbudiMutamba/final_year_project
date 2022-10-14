import React, {useState, Fragment} from 'react'
import control from '../assets/control.png'
import { NavLink } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Menus } from '../../helpers/menudata'
import logo from '../assets/logo1.png'


export default function SideNav({user, open, setOpen}) {

  const role = user.roles === "super_admin" ? "super_admin" :
              user.roles === "admin" ? "admin" : "member"
  const [selectedIndex, setSelectedIndex] = useState(null)

  const menuList = user.roles === "member" ? [1, 2,Menus[`member`].length-1] : [2,3,Menus[`${role}`].length-1];

  return (
    <div className='flex fixed bottom-0 left-0'>
        <div className={`${open ? 'w-72' : 'w-20'} duration-300 p-5 pt-8 w-72 h-screen bg-zinc-100 relative`}>

          <img src={control} alt='control'className={`absolute rounded-full cursor-pointer -right-3 top-16 w-7 border-2 border-orange-600 ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}></img>

          <div className= 'flex gap-x-4 items-center' >
            <img src={logo} alt='logo' width="64" height="64" className='{`cursor-pointer duration-500 `}'></img>
            <h1 className={`origin-left font-medium text-xl duration-500 ${!open && "scale-0"}`}>Mo-Work</h1>
          </div>
          <ul className='pt-8'>
            {Menus[`${role}`].map((Menu,index)=> (
              <Fragment key={index}>
                <NavLink  key={index} to={`${Menu.link}`} 
                activeclassname={`bg-red-600`} onClick={() => setSelectedIndex(index)}
                 className={`flex rounded-md p-2 cursor-pointer hover:bg-orange-600 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`} >
                  <i key={index}>{Menu.src}</i>
                  <div className='flex justify-between items-center w-full'>
                    
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {Menu.title}
                  </span>
                  {
                  menuList.includes(index) && (
                        <i onClick={() => {
                          selectedIndex === index ? setSelectedIndex(null) : setSelectedIndex(index)
                        }}>
                          <MdKeyboardArrowDown />
                        </i>
                  )}
                </div>
                </NavLink>
                {menuList.includes(index) && selectedIndex === index &&
                  <div className='bg-white rounded-lg'>
                    {Menu.subLinks.map((item, index) =>
                    <div className="py-1 px-3 cursor-pointer dark:text-secondary-text hover:bg-orange-600">
                      <NavLink key={index} to={`${item.link}`}
                        className="px-2 py-1 rounded-lg"
                      >
                        {item.title}
                      </NavLink>
                    </div>)}
                  </div>
                }
              </Fragment>
              
            ))}
          </ul>
        </div>
    </div>
    
  )
}
