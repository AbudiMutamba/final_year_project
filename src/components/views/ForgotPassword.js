
import  React,{ useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { supabase } from "../helpers/supabase";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



export default function ForgotPassword() {

    React.useEffect(() => {
		document.title = "M&E - ForgotPassword";
	}, []);


  const { user, setUser, resetPassword} = useAuth() 
 
  
  const [errorMsg, setErrorMsg] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/resetpassword";
  
//   const initialValues = { email: ""};
  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required("email is required!"),
    
  }); 



  return  (
    
    <div className='md:h-screen flex flex-col justify-center items-center bg-gray-100'>
      <div className="p-10 md:bg-white md:border border-gray-300 md:rounded-md w-full md:w-1/3 items-center">
      <div className='flex justify-center'><img src={Logo} alt='logo' width="64" height="64" ></img></div>
        <h1 className="text-sm my-5">Please enter your username or email address. You will receive an email message with instructions on how to reset your password.</h1>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <Formik
          initialValues={ {email: ""} }
          validationSchema={forgotPasswordSchema}
        
          onSubmit={async (values, { resetForm }) => {
            // console.log(values)
            const userEmail = values.email
            const { error } = await resetPassword(userEmail, {redirectTo: "http://localhost:3000/password_reset"});

             if (error) { 
              // console.log(error)
              setErrorMsg(error.message);
            
            } else {
            //console.log(user)
              // setUser(data.user);
            // navigate(from, { replace: true });
            // alert("Email sent")
            toast("Email sent")
            }
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <ToastContainer />
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
              <div className=" text-center justify-between">
                <button
                  className="px-4 py-1 transition bg-emerald-300 hover:-translate-y-1 hover:bg-orange-600 duration-300 w-full rounded-full border"
                  type="submit"
                >
                  Reset Password
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


