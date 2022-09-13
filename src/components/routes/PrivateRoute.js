import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { Sidebar, Navbar, MobileNav } from "../components";
// import { useMediaQuery } from "../hooks";
// import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
// import { getProfile } from "../helpers/getProfile";
// import { Spinner } from "../components";
// import ErrorBoundary from "../components/ErrorBoundary";
import TopNav from '../views/TopNav'
import SideNav from "../views/SideNav";

const PrivateRoute = ({ allowedRoles }) => {
  // const matches = useMediaQuery("(min-width: 800px)");
  const [ disabled, setDisabled ] = useState(true)

  const [showSidebar, setShowSidebar] = useState(
    !JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
  );

  // const { user, darkMode } = useAuth();
  const [profile, setProfile] = useState({});
  const [roles, setRoles] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [open, setOpen] = useState(true)

  // useEffect(() => {
  //   // Getting information that is required in all components.
  //   getProfile(user)
  //     .then((data) => {
  //       if (data) {
  //         const { roles } = data;
  //         setRoles(roles);
  //         setProfile(data);
  //         setDisabled(!(roles && roles?.length > 0))
  //       }
  //     })
  //     .then(() => setLoading(false))
  //     .catch((error) => console.log(error));
  // }, [user?.session]);
  
  return true ? (
      <div >
        <div
          className={`flex flex-col min-h-screen  w-screen bg-back dark:bg-dark-bg`}
        >
          <TopNav />
          <div
            className={`h-[calc(100vh-68px)] overflow-hidden w-screen flex`}
          >
            <SideNav open={open} setOpen={setOpen} />
            <div className={`flex-grow mx-5 mt-5 overflow-y-auto ${open ? 'ml-72' : 'ml-20'}`}>
              <Outlet context={[]} />
            </div>
          </div>
        </div>
      </div>
    ): (
    <>
      <Navigate to="/" state={{ from: location }} replace />
    </>
  );
};

export default PrivateRoute;