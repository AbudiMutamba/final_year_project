import { MdOutlineNotificationImportant } from 'react-icons/md'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function TopNav() {
  const [showMenu, setShowMenu] = useState(false)
  const { user ,signOut } = useAuth()
  const navigate = useNavigate()

  if (showMenu) {
    window.onclick = (event) => {
      if (!event.target.matches(".dialog")) {
        setShowMenu(false);
      }
    };
  }

  return (
    <div className='flex justify-end items-center space-x-4  bg-zinc-100 px-5'>
          <MdOutlineNotificationImportant />
          <p className='inline-block '>Hello Abudi</p>
          <div className='relative dialog' onClick={(event) => {
              setShowMenu(!showMenu);
              event.stopPropagation();
            }}>
            <div className="m-3 flex -space-x-2 overflow-hidden cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            >
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
            </div>
            {showMenu && 
              <ul className="bg-white absolute z-10 outline outline-1 outline-[#E4E6E5] top-[60px] right-0 py-2">
              <Link to="/profile">
                <li className="w-full p-2 px-12 mb-1 hover:bg-orange-600
">
                  Profile
                </li>
              </Link>
              <li className="w-full p-2 px-12 hover:bg-orange-600
">
                <button
                  onClick={async () => {
                    await signOut()
                    navigate("/")
                    // console.log(user)
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
            }
          </div>
    </div>
  )
}
