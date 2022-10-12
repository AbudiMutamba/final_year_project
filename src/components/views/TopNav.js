import { useState } from 'react'
import { MdOutlineNotificationImportant } from 'react-icons/md'
import { Link, } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useNavigate, useOutletContext } from 'react-router-dom'
import NotificationContext from "../modals/NotificationContext";

export default function TopNav({user}) {
  const [showMenu, setShowMenu] = useState(false)
  const [showNote, setShowNote] = useState(false);
  const {signOut } = useAuth()
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
          
          <div
          className="mx-3 cursor-pointer relative dark:text-black"
          onClick={(event) => {
            setShowNote(!showNote);
            event.stopPropagation();
          }}
          >
          {/* <MdNotifications size={25} /> */}
          <MdOutlineNotificationImportant />
          <NotificationContext show={showNote} />
        </div>



          <p className='inline-block text-green-700'>Hello {user?.username !== undefined && user.username !== null
                      ? ` ${user?.username.split(" ")[0]}`
                      : " You"}</p>
          <div className='relative dialog' onClick={(event) => {
              setShowMenu(!showMenu);
              event.stopPropagation();
            }}>
            <div className="m-3  flex -space-x-2 overflow-hidden cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            >
              <div
                  className="w-10 h-10 bg-accent rounded-full mx-2 overflow-hidden bg-cover"
                  style={{ backgroundImage: `url(${user?.avatar_url})` }}
                ></div>
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
