
import  React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import { supabase } from "../helpers/supabase";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Logo from "../assets/logo1.png";
import { Link } from "react-router-dom"


export default function ResetPassword() {
  React.useEffect(() => {
		document.title = "M&E - ResetPassword";
	}, []);

  const { user, setUser, updatePassword} = useAuth() 
  
  const [errorMsg, setErrorMsg] = React.useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";



  const passwordSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password has to be longer than 6 characters!').required("Password is required!"),
    repeatPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });


  return user && (
    // <div className="flex flex-col justify-center items-center h-screen">
    <div className='md:h-screen flex flex-col justify-center items-center bg-gray-100'>
      <div className="p-10 md:bg-white md:border border-gray-300 md:rounded-md w-full md:w-1/3 items-center">
      <div className='flex justify-center'><img src={Logo} alt='logo' width="64" height="64" ></img></div>
        {/* <h1 className="text-center font-semibold text-2xl mb-4">Login into your account</h1>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>} */}
        
        <Formik
          initialValues={{ password: "", repeatPassword:"" }}
          validationSchema={passwordSchema}
          onSubmit={async (values, {setSubmitting, resetForm }) => {
            // console.log(values)
            
            const { data, error } = await updatePassword(values);
            if (error) { 
              error.preventDefault();
              setErrorMsg(error.message);
              // console.log(error)
            } else {
              // console.log(user)
              setUser(data.user);
              navigate(from, { replace: true });
              
            }
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-6">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Enter New Password
                </label>
                <Field
                  className="p-2 appearance-none leading-tight outline-0 bg-gray-100 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="new password"
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Retype Password
                </label>
                <Field
                  className="p-2 appearance-none leading-tight outline-0 bg-gray-100 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  placeholder="Repeat Password"
                />
                {errors.repeatPassword !== "Required"  && touched.repeatPassword && (
                  <p className="text-red-500 text-xs italic">
                    {errors.repeatPassword}
                  </p>
                )}
              </div>
              <div className=" text-center justify-between">
                <button
                  className="px-4 py-1 transition bg-emerald-300 hover:-translate-y-1 hover:bg-orange-600 duration-300 w-full rounded-full border"
                  type="submit"
                >
                  Submit
                </button>
                <p className="text-center font-semibold ">
                    Remember Password?{" "}
                        <Link to="/" className=" p-2 my-2 inline-block align-baseline font-bold hover:text-orange-600">
                            Login
                        </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}


