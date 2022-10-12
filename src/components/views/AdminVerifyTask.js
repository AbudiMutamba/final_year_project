
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from "../helpers/supabase";
import DatePicker from 'react-datepicker';
import { useOutletContext, useParams } from 'react-router-dom'


export default function AdminVerifyTask() {
    const [ activities,setActivities ] = useState([]);
    const [ profile ] = useOutletContext();
    const [ names, setNames] = useState({})
    const [rowdata, setRowData] = useState([]);
    const { id } = useParams();
    // console.log({id})
	useEffect( () => {
        let getData = async () => {
            let { data, error } = await supabase.from('tasks').select('*').eq('id', id).single()
            console.log("data is", data)
            //  if(error) throw error
             setRowData(data)
        }
        getData()
	}, []);

    const editSchema = Yup.object().shape({
        // workon:Yup.string().required("Required"),
        // workwith:Yup.string().required("Required"),
        // assignedto:Yup.string().required("Required"),
        // date: Yup.date(),
        // moredetails:Yup.string().required("Required"),
        remarks:Yup.string().required("Required"),
    });

	const handleSubmit = async (values, { resetForm }) => {
        console.log(values)
        const {data, error} = await supabase
            .from('tasks')
            .update ({
                remarks: values.remarks,
                status: values.status,
                seen_by_employeer: true,
         }).eq('id', id)
        if (error){
            toast.error(error.message, {
            position: "top-center"
        });
        }else {
            toast.success("Sent", {
            position: "top-center"
        });
           resetForm();
           setActivities([...activities, values]);
		
	    };
    }

	return (
		<section className="px-10">
			
			<main >
			        <div >
                    < ToastContainer />
					<h1 className='font-bold p-5'>Task Comment</h1>
                        <Formik
                            initialValues={{
                                // title: "",
                                // // workwith: "",
                                // // assignedto:"",
                                // date: "",
                                // moredetails:"",
                                remarks:""
                            }}
                            validationSchema={editSchema}
                            onSubmit={handleSubmit}
                            >
                            {({ isSubmitting, isValid, values, setFieldValue,  handleChange, errors}) => (
                                <Form className="p-8 rounded-xl bg-zinc-100 border">
                                    <div className="py-2">
                                        <label>Title of Task</label>
                                        <Field
                                            placeholder="title"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
                                            type="text"
                                            name="title"
                                            onChange={handleChange("title")}
                                            value= {rowdata.title}
                                        />                
                                    </div>
                                    
                                    <div className="py-2">
                                        <label>Description of task</label>
                                        <Field
                                            as="textarea"
                                            name="moredetails"
                                            onChange={handleChange("moredetails")}
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline " 
                                            value={rowdata.description}
                                            />
                                    </div>
                                    <div className="py-2">
                                        <label>Deadline</label>
                                        <DatePicker placeholderText="Select Date" name="date" selected={values.date } onChange={handleChange("date")}  className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                                        value={rowdata.deadline}
                                        />
                                        
                                    </div>
                                    <div className="py-2">
                                        <label>Comment</label>
                                        <Field
                                        as="textarea"
                                        name="comment"
                                        onChange={handleChange("comment")}
                                        value={rowdata.comments}
                                        className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline " 
                                        />
                                    </div>
                                    <div className="py-2">
                                        <label>Remarks</label>
                                        <Field
                                        as="textarea"
                                        name="remarks"
                                        onChange={handleChange("remarks")}
                                        defaultValue={rowdata.remarks}
                                        className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline " 
                                        />
                                    </div>
                                    <div className="flex flex-col py-2 ">
                                        <label >Choose Status</label>
                                        <lable>
                                            <Field
                                            type="radio"
                                            name="status"
                                            value="approved"
                                            onChange={handleChange("status")}
                                            /> 
                                            Approve
                                        </lable>
                                        <label>
                                            <Field
                                            type="radio"
                                            name="status"
                                            value="rejected"
                                            onChange={handleChange("status")}
                                            className="px-2"
                                            /> 
                                            Reject
                                        </label>
                                    </div>
                                    <button
                                        // onClick={() => {
                                        //     console.log(values)
                                        //     console.log(errors)
                                        // }}
                                        type="submit"
                                        className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">
                                        Send
                                    </button>
                                </Form>
                            )}
                        </Formik>
				</div>
                
			</main>
		</section>
	);
}
