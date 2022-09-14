import { FaRegEdit } from "react-icons/fa";
// import { ConfirmModal } from "../components";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Formik, Form } from "formik";
import { toast, ToastContainer } from "react-toastify";

function Profile() {


//   const [ popUp, setPopUp ] = useState(false);
  const [ editPop, setEditPop ] = useState(false);
//   const { 1: profile } = useOutletContext();
const [ profile, setProfile ] = useState({
    fullname: "Mutamba Abudi",
    roles: [
        "member"
    ],
    phone_number: "0706929732",
    email_address:"Mutambaabudi@gmail.com",
    member_status:"active",
    marital_status:"single",
    position_in_startup:"Employee",


})

  
  return (
    <div className="mx-5 mt-2 h-[calc(100vh-70px)] px-10 ">
      <div className="flex flex-col justify-between pb-3 h-[60px]">

        <h1 className="mb-5 mt-2 font-bold uppercase text">
          Profile
        </h1>
      </div>
      <ToastContainer />
      <div className="rounded-xl bg-zinc-100 border p-6 overflow-y-auto  md:h-[calc(100%-65px)] ">
        {profile?.fullname ? (
          <>
            <h1 className="font-semibold mb-3">Profile Details</h1>
            <div className="flex justify-between items-start mb-5">
              {profile?.avatar ? (
                <div
                  className="w-16 h-16 bg-accent rounded-full mx-2 overflow-hidden bg-cover"
                  style={{ backgroundImage: `url(${profile?.avatar})` }}
                ></div>
              ) : (
                <span className="h-16 w-16 bg-accent dark:bg-dark-bg-600 rounded-full flex justify-center font-bold items-center overflow-hidden">
                  {profile?.fullname !== undefined &&
                    profile.fullname !== null &&
                    ` ${profile?.fullname.split("")[0]}`}
                </span>
              )}
              <i
                className="text-white p-2 bg-primary rounded text-lg cursor-pointer"
                onClick={() => setEditPop(true)}
              >
                <FaRegEdit />
              </i>
            </div>
            <section className="mb-5">
              <div className="grid grid-cols-5 gap-2 mb-2">
                <p className=" col-span-2">Name</p>
                <p className="font-bold  col-span-3">{profile?.fullname}</p>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-2">
                <p className=" col-span-2">Telephone Number</p>
                <p className="font-bold  col-span-3">{profile?.phone_number}</p>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-2">
                <p className=" col-span-2">Email</p>
                <p className="font-bold  col-span-3">
                  {profile?.email_address}
                </p>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-2">
                <p className=" col-span-2">{`${profile?.roles.includes("super_admin") ? 'Super Admin' : 'Member'} Status`}</p>
                <div className=" col-span-3 flex justify-start">
                  <p
                    className={`${
                      profile?.member_status === "active"
                        ? "bg-green-600"
                        : "bg-accent-red"
                    } font-bold text-white rounded-sm flex px-3`}
                  >
                    {profile?.member_status ?? "pending"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-2">
                <p className=" col-span-2">Marital Status</p>
                <p className="font-bold  col-span-3">
                  {profile?.marital_status}
                </p>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-2">
                <p className=" col-span-2">Position in the Startup</p>
                <p className="font-bold col-span-3">
                  {profile?.position_in_startup}
                </p>
              </div>
            </section>
            {/* handleChangePassword */}
            <Formik
              initialValues={{
                old_password: "",
                new_password: "",
                confirm_password: "",
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => {
                return (
                  <Form
                    className="mb-3"
                    name="changePasswordForm"
                  >
                    <h1 className="font-semibold mb-3">Password Reset</h1>
                    <div className="flex flex-col w-56 mb-5">
                      <label className="text-sm">Old Password</label>
                      <input
                        type="password"
                        name="old_password"
                        id="old_password"
                        onChange={handleChange("old_password")}
                        placeholder="Old Password"
                        className="ring-1 ring-black dark:ring-dark-bg-600 dark:bg-dark-bg-700 rounded focus:outline-none focus:ring-2 focus:ring-primary px-2 py-1 "
                        required
                      />
                    </div>
                    <div className="flex flex-col w-56 mb-5">
                      <label className="text-sm">New Password</label>
                      <input
                        type="password"
                        name="new_password"
                        id="new_password"
                        onChange={handleChange("new_password")}
                        placeholder="New Password"
                        className="ring-1 ring-black dark:ring-dark-bg-600 rounded focus:outline-none focus:ring-2 focus:ring-primary px-2 py-1 dark:bg-dark-bg-700"
                        required
                      />
                    </div>
                    <div className="flex flex-col w-56 mb-5">
                      <label className="text-sm">Confirm Password</label>
                      <input
                        type="password"
                        name=""
                        id="confirm_password"
                        onChange={handleChange("confirm_password")}
                        placeholder="Confirm Password"
                        className="ring-1 ring-black dark:ring-dark-bg-600 rounded focus:outline-none focus:ring-2 focus:ring-primary px-2 py-1 dark:bg-dark-bg-700"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-3 mt-3">
                      <input
                        type="submit"
                        value="Save"
                        className="bg-primary px-3 py-1 outline outline-1 outline-primary rounded-md text-white cursor-pointer"
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
            {/* handleTermination */}
            {/* <Formik initialValues={{ password: "" }}>
              {({ values, errors, touched, handleChange, handleBlur }) => {
                return (
                  <Form
                    className="mb-3"
                    name="terminationForm"
                  >
                    <h1 className="font-semibold">Danger Zone</h1>
                    <div className="my-2 outline outline-1 p-2 rounded-md">
                      <h1>Self Termination</h1>
                      <p>
                        Self termination implies that you no longer subscribe to
                        and therefore sieze being a member of Bweyogerere
                        Tuberebumu sacco. If you're sure that you want to
                        terminate your membership, click terminate to terminate
                        to proceed.
                      </p>
                      <br />
                      <div className="flex mt-1">
                        <div className="flex flex-col w-56">
                          <label className="text-sm">
                            Enter Password to confirm
                          </label>
                          <input
                            type="password"
                            name="password"
                            id=""
                            placeholder="Password"
                            onChange={handleChange("password")}
                            className="ring-1 ring-black dark:ring-dark-bg-600 dark:bg-dark-bg-700 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full flex justify-end">
                        <input
                          type="submit"
                          className="text-white bg-accent-red px-4 py-1 my-2 rounded-md uppercase cursor-pointer"
                          value="Terminate"
                        />
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik> */}
          </>
        ) : (
          <div className="display flex justify-center">
            {/* <Spinner /> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;