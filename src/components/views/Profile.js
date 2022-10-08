import { FaRegEdit } from "react-icons/fa";
import  ConfirmModal  from "../modals/ConfirmModal";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Formik, Form } from "formik";
import { supabase } from "../helpers/supabase";
import { toast, ToastContainer } from "react-toastify";
import EditModal from "./EditModal";
import  Spinner  from "../loader/Spinner";
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  useEffect(() => {
    document.title = "Mo-Work";
  }, []);

  const [popUp, setPopUp] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const {1:profile } = useOutletContext();
  // const { id } = supabase.auth.user();
  const { signOut } = useAuth();


  // const handleTermination = (event, values) => {
  //   event.preventDefault();
  //   supabase
  //     .rpc("check_password", {
  //       current_password: values.password,
  //       _user_id: id,
  //     })
  //     .then(async ({ data }) => {
  //       if (data) {
  //         setPopUp(true);
  //       } else {
  //         toast.error(`Wrong password.`, { position: "top-center" });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(`Error ${error}`);
  //     });
  //   document.terminationForm.reset();
  // };

  const handleChangePassword = (event, values) => {
    event.preventDefault();
    if (values.new_password !== values.confirm_password) {
      toast.error("Passwords don't match", { position: "top-center" });
    } else {
      supabase
        .rpc("check_password", {
          current_password: values.old_password,
          // _user_id: id,
        })
        .then(async ({ data }) => {
          if (data) {
            const { user, error } = await supabase.auth.update({
              password: values.new_password,
            });
            if (user) {
              toast.success(`Successfully updated password.`, {
                position: "top-center",
              });
            } else if (error) {
              toast.error(`Error ${error}.`, { position: "top-center" });
            }
          } else {
            toast.error(`Wrong password.`, { position: "top-center" });
          }
        })
        .catch((error) => {
          console.log(`Error ${error}`);
        });
    }
    document.changePasswordForm.reset();
  };

  return (
    <div className="mx-5 mt-2 h-[calc(100vh-70px)]">
      <div className="flex flex-col justify-between pb-3 h-[60px]">
        <h1 className="mb-5 mt-2 font-bold uppercase text dark:text-white">
          Profile
        </h1>
      </div>
      <ToastContainer />
      <div className="bg-white p-6 overflow-y-auto  md:h-[calc(100%-65px)] dark:bg-dark-bg-700">
        {profile?.username ? (
          <>
            <h1 className="font-semibold mb-3">Profile Details</h1>
            <div className="flex justify-between items-start mb-5">
              {profile?.avatar_url ? (
                <div
                  className="w-16 h-16 bg-accent rounded-full mx-2 overflow-hidden bg-cover"
                  style={{ backgroundImage: `url(${profile?.avatar_url})` }}
                ></div>
              ) : (
                <span className="h-16 w-16 bg-accent dark:bg-dark-bg-600 rounded-full flex justify-center font-bold items-center overflow-hidden">
                  {profile?.username !== undefined &&
                    profile.username !== null &&
                    ` ${profile?.username.split("")[0]}`}
                </span>
              )}
              <i
                className=" p-2 bg-emerald-300 transition px-3 py-1 hover:-translate-y-1 hover:bg-orange-600 duration-300 rounded text-lg cursor-pointer"
                onClick={() => setEditPop(true)}
              >
                <FaRegEdit />
              </i>
            </div>
            <section className="mb-5">
              <div className="grid grid-cols-5 gap-2 mb-2">
                <p className=" col-span-2">Name</p>
                <p className="font-bold  col-span-3">{profile?.username}</p>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-2">
                <p className=" col-span-2">Telephone Number</p>
                <p className="font-bold  col-span-3">{profile?.telephone}</p>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-2">
                <p className=" col-span-2">Email</p>
                <p className="font-bold  col-span-3">
                  {profile?.email}
                </p>
              </div>
              {/* <div className="grid grid-cols-5 gap-2 mb-2">
                <p className=" col-span-2">{`${
                  profile &&
                  profile?.roles &&
                  profile.roles.includes("super_admin")
                    ? "Super Admin"
                    : "Member"
                } Status`}</p>
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
              </div> */}

              <div className="grid grid-cols-5 gap-2 mb-2">
                <p className=" col-span-2">Marital Status</p>
                <p className="font-bold  col-span-3">
                  {profile?.marital_status}
                </p>
              </div>
              {/* <div className="grid grid-cols-5 gap-2 mb-2">
                <p className=" col-span-2">Position in the SACCO</p>
                <p className="font-bold col-span-3">
                  {profile?.position_in_sacco}
                </p>
              </div> */}
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
                    onSubmit={(event) => handleChangePassword(event, values)}
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
                        className="bg-emerald-300 transition px-3 py-1 hover:-translate-y-1 hover:bg-orange-600 duration-300 rounded-md  cursor-pointer"
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
            {/* handleTermination */}
            <Formik initialValues={{ password: "" }}>
              {({ values, errors, touched, handleChange, handleBlur }) => {
                return (
                  <Form
                    className="mb-3"
                    name="terminationForm"
                    // onSubmit={(event) => handleTermination(event, values)}
                  >
                    <h1 className="font-semibold">Danger Zone</h1>
                    <div className="my-2 outline outline-1 p-2 rounded-md">
                      <h1>Self Termination</h1>
                      <p>
                        Self termination implies that you no longer subscribe to
                        and therefore sieze being a member of Bweyogerere
                        Tuberebumu sacco. If you're sure that you want to
                        terminate your membership, click terminate to proceed.
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
                        {popUp && (
                          <ConfirmModal setPopUp={setPopUp}>
                            <h1 className="font-bold">
                              Are you sure you want to terminate your account?
                            </h1>
                            <p>
                              If you terminate this account, you can’t recover
                              it.
                            </p>
                            <div className="flex justify-end gap-3 mt-3">
                              <button
                                className="px-3 py-1 outline outline-1 outline-gray-500 rounded-md text-gray-500"
                                onClick={() => setPopUp(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-accent-red px-3 py-1 outline outline-1 outline-accent-red rounded-md text-white"
                                onClick={async (event) => {
                                  event.preventDefault();
                                  console.log("Termination started");
                                  const { data, error } = await supabase.rpc(
                                    "self_terminate"
                                  );
                                  if (error) {
                                    console.log(error);
                                  } else {
                                    console.log(data);
                                    if (data?.data) {
                                      // signout
                                      setPopUp(false);
                                      await signOut();
                                    }
                                  }
                                }}
                              >
                                Terminate
                              </button>
                            </div>
                          </ConfirmModal>
                        )}
                        {editPop && <EditModal setEditPop={setEditPop} />}
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            
          </>
        ) : (
          <div className="display flex justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

