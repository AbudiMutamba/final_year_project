import { MdOutlineSettings } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { supabase } from "../helpers/supabase";
import { useOutletContext } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

function NotificationContext({ show}) {
  const [notifications, setNotifications] = useState([]);
  const {user, signOut } = useAuth()
//   const {1:profile} = useOutletContext();
//   console.log(profile)
//   const { id } = supabase.auth.user();
   
    useEffect(()=> {
        const getNotifications = async () => {
            const { data, error } = await supabase
            .from("tasks")
            .select("status, title")
            // .eq("assigned_person", user.id)
            .order("created_at", { ascending: false });
            if (error) {
            throw error;
            } else {
            setNotifications(data);
            // console.log(data);
            }
        };

        getNotifications().catch(error => console.log(error));
    })
        

  return (
    <div
      className={`absolute right-0 w-[40vw] py-2 px-5 mt-2 z-60 bg-white shadow-lg ease-in-out duration-300 dark:bg-dark-bg-700 dark:text-secondary-text ${
        show ? "" : "hidden"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="py-3 font-bold">Notifications</h1>
        {/* <MdOutlineSettings size={20} /> */}
      </div>

      <hr />
      <ul>
        {(notifications && notifications?.length) > 0 &&
          notifications.map((notification, index) => {
            return (
              <li 
                key={index}
                className="py-5 px-2 h-16 flex items-center hover:bg-accent dark:hover:bg-dark-bg-600"
                onClick={() => {
                //   console.log('here')
                }}
              >
                <div className="rounded-full bg-green-100 w-10 h-10 mr-2 flex justify-center items-center text-green-700 ">
                  {notification.status === "approved" ? (
                    <BsCheckLg />
                  ) : (
                    <IoClose size={20} />
                  )}
                </div>
                <div className="w-5/6 h-8 overflow-hidden">
                  {notification?.title}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default NotificationContext;