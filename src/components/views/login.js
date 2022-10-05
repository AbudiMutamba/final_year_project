
import  React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { supabase } from "../helpers/supabase";
import Logo from "../assets/Logo.jpg";
import { Link } from "react-router-dom"


export default function Login() {
  const { user, setUser, signIn, signUp} = useAuth() 
  const [errorMsg, setErrorMsg] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";


  React.useEffect(() => {
	document.title = "M&E - Login"
  },[]);


 
  const loginSchema = Yup.object().shape({
    // email: Yup.string().email('Invalid email address').required("email is required!"),
    password: Yup.string().min(6, 'Password has to be longer than 6 characters!').required("Password is required!"),
  });


  return user?.session ? (
    <Navigate to={from} replace />
  ) : (
    // <div className="flex flex-col justify-center items-center h-screen">
    <div className='md:h-screen flex flex-col justify-center items-center bg-gray-100'>
      <div className="p-10 md:bg-white md:border border-gray-300 md:rounded-md w-full md:w-1/3 items-center">
      <div className='flex justify-center'><img src={Logo} alt='logo' width="64" height="64" ></img></div>
        {/* <h1 className="text-center font-semibold text-2xl mb-4">Login into your account</h1>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>} */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, {setSubmitting, resetForm}) => {
            
            const { data, error } = await signIn(values);
            if (error) { 
              setErrorMsg(error.message);
              // console.log(error)
            } else {
              setUser(data.user);
              navigate(from, { replace: true });
            }
            resetForm();
            // console.log(response)
          }}
        >
          {({ errors, touched, resetForm}) => (
            <Form>
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  E-mail
                </label>
                <Field
                  className="p-2 appearance-none leading-tight outline-0 bg-gray-100 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outlinedark:border-gray-700 "
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  className="p-2 appearance-none leading-tight outline-0 bg-gray-100 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******************"
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className=" text-center justify-between">
                <button
                  className="px-4 py-1 transition bg-emerald-300 hover:-translate-y-1 hover:bg-orange-600 duration-300 w-full rounded-full border"
                  type="submit"
                >
                  Sign In
                </button>
                {/* <a
                  className=" p-2 my-2 inline-block align-baseline font-semibold text-sm  hover:text-orange-600"
                  href="/forgotpassword"
                >
                  Forgot Password?
                </a> */}
                <Link to="/forgotpassword" className=" p-2 my-2 inline-block align-baseline font-semibold text-sm  hover:text-orange-600">
						        ForgotPassword?
					      </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}


