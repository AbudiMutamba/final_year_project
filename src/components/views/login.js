import React from 'react'
import Logo from '../assets/Logo.jpg'
import {Link} from 'react-router-dom'
import { useFormik } from 'formik'

export default function Login() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        }
    })

    console.log('form values', formik.values);
    if (formik.values === true){
        <Link to="/forgot-password?" className="font-semibold hover:text-orange-600 text-center">Forgot Password?</Link>

    }

  return (
    
    <div className='md:h-screen flex flex-col justify-center items-center bg-gray-100'>
            <div className="p-10 md:bg-white md:border border-gray-300 md:rounded-md w-full md:w-1/3 items-center">

                <div className='flex justify-center'><img src={Logo} alt='logo' width="64" height="64" ></img></div>

                <p className="font-bold text-center p-2 my-3">Login into your account</p>
           
                <form className='flex flex-col '>
                
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' onChange={formik.handleChange} value={formik.values.email} className='outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border ' />

                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' onChange={formik.handleChange} value={formik.values.password} className='outline-none py-2 px-5 rounded-full my-3 placeholder-gray-500 border '/>
                    
                    <button className=' rounded-full bg-emerald-300 p-2 my-3  hover:bg-orange-600 font-semibold' type='submit'>Sign in</button>

                    <p className='text-center'>
                        <Link to="/forgot-password?" className="font-semibold hover:text-orange-600 text-center">Forgot Password?</Link>
                    </p>

                </form>
             </div>

    </div>
   
  )
}

