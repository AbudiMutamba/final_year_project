import React, { useState, useEffect} from 'react'
import Table from '../helpers/Table'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { supabase } from "../helpers/supabase";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../auth/AuthContext";

export default function Members() {
    const [rowdata, setRowData] = useState([]);
    
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
        {
            Header: "Role",
            accessor: "roles",
        },
        {
            Header: "Telephone",
            accessor: "telephone",
        },
        {
            Header: "Address",
            accessor: "address",
        },
        
    ]
  return (
    <div className="container  mx-auto px-2">
        <ToastContainer/>
        <h1 className='font-bold p-5'>MEMBERS LIST</h1>  
            <div className="px-10 pb-5 ">
            <Formik 
                    initialValues={{ email: ""}}
                    validationSchema={loginSchema}
                    onSubmit={async (values, {setSubmitting, resetForm}) => {

                        const response = await fetch("/api/hello", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ 
                                email: values.email,
                                password: values.password
                            })
                        })

                        console.log(response)

                       
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
            <div>
                    <Table columns={columns} data={rowdata} />
            </div>
    </div>
  );
};

