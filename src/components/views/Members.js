import React, { useState, useEffect} from 'react'
import Table from '../helpers/Table'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { supabase } from "../helpers/supabase";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../auth/AuthContext";
import { useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import axios from 'axios';


export default function Members() {
    const [rowdata, setRowData] = useState([]);
    const { user, setUser, signIn, signUp} = useAuth() 
    const navigate = useNavigate();
	useEffect( () => {
        let getUser = async () => {
            let { data, error } = await supabase.from('profiles').select('username, email, roles, telephone, address').eq('roles', 'member')
            // console.log("data is", data)
             if(error) throw error
             setRowData(data)
        }
        getUser()
	}, []);
    
    const loginSchema = Yup.object().shape({
        username: Yup.string().required("name is required!"),
        email: Yup.string().email('Invalid email address').required("email is required!"),
        password: Yup.string().min(6, 'Password has to be longer than 6 characters!').required("Password is required!"),
      });


    const columns = [
    
        {
            Header: "Name",
            accessor: "username",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        // {
        //     Header: "Role",
        //     accessor: "roles",
        // },
        // {
        //     Header: "Telephone",
        //     accessor: "telephone",
        // },
        // {
        //     Header: "Address",
        //     accessor: "address",
        // },
        
    ]
  return (
    <section >
        <main className="grid gap-4 grid-cols-2 py-10">
            {/* <div className="container  mx-auto px-2"> */}
            <div className="p-8 rounded-xl bg-white border">
                <ToastContainer/>
                <h1 className='font-bold p-5'>ADD MEMBERS</h1> 
                    <div className="">
                    <Formik 
                            initialValues={{ username: "", email: "",password: "",roles:"member" }}
                            validationSchema={loginSchema}
                            onSubmit={async (values, {setSubmitting, resetForm}) => {

                                // const { data, error } = await signUp(values);
                                // if (error) { 
                                // // setErrorMsg(error.message);
                                // toast.error(error.message, {
                                //     position: "top-center"
                                // })
                                // // console.log(error)
                                // } else{
                                // // setUser(data.user);
                                // console.log(data)
                                // // navigate(from , { replace: true })
                                //     toast.success("Success", {
                                //     position: "top-center"
                                // });
                                // }
                                // resetForm();
                                // const response = await fetch("/api/hello", {
                                //     method: "POST",
                                //     headers: {
                                //       "Content-Type": "application/json"
                                //     },
                                //     credentials: "same-origin",
                                //     body: JSON.stringify({ 
                                //         email: values.email,
                                //         password: values.password
                                //     })
                                // })
                                // console.log(response)

                                // const { data: user, error } = await fetch("/api/inviteUser", {
                                //     method: "POST",
                                //     headers: new Headers({ "Content-Type": "application/json" }),
                                //     credentials: "same-origin",
                                //     body: JSON.stringify({ email: values.email}),
                                // });
                                await axios.post("/api/hello",{
                                    username: values.username,
                                    email: values.email,
                                    password: values.password
                                }).then(res => console.log(res))
                                .catch(error => console.log(error))
                            
                            }}
                    >
                        {({ errors, touched, resetForm}) => (
                            <Form>
                                <div className="mb-4">
                                    <label
                                    className="block text-sm font-bold mb-2"
                                    htmlFor="username"
                                    >
                                    Name
                                    </label>
                                    <Field
                                    className="p-2 appearance-none leading-tight outline-0 bg-gray-100 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outlinedark:border-gray-700 "
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="username"
                                    />
                                    {errors.username && touched.username && (
                                    <p className="text-red-500 text-xs italic">{errors.username}</p>
                                    )}
                                </div>
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
                                <button
                                className="px-4 py-1 transition bg-emerald-300 hover:-translate-y-1 hover:bg-orange-600 duration-300 w-full rounded-full border"
                                type="submit"
                                >
                                    Invite Member
                                </button>
                            </Form>
                        )}
                    </Formik> 
                    </div>
            </div>
            <div className="py-8 rounded-xl bg-white border">
                <h1 className='font-bold p-5'>MEMBERS LIST</h1> 
                <Table columns={columns} data={rowdata}  />
            </div>
        </main>
    </section>
  );
};

