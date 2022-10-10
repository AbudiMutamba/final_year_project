
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from "../helpers/supabase";
import DatePicker from 'react-datepicker';
import { useOutletContext, useParams } from 'react-router-dom'


export default function ScheduleVeiw() {
    const [ activities,setActivities ] = useState([]);
    const [ profile ] = useOutletContext();
    const [ names, setNames] = useState({})
    const [rowdata, setRowData] = useState([]);
    const { id } = useParams();
    // console.log({id})
	useEffect( () => {
        let getData = async () => {
            let { data, error } = await supabase.from('tasks').select('*').eq('id', id).single()
            // console.log("data is", data)
            //  if(error) throw error
             setRowData(data)
        }
        getData()
	}, []);

    const editSchema = Yup.object().shape({
        workon:Yup.string().required("Required"),
        workwith:Yup.string().required("Required"),
        assignedto:Yup.string().required("Required"),
        date: Yup.date(),
        moredetails:Yup.string().required("Required"),
        comment:Yup.string().required("Required"),
    });

	const handleSubmit = async (values, { resetForm }) => {

        const {data, error} = await supabase
            .from('task')
            .update ({
                comments: values.comment,
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
					<h1 className='font-bold p-5'> Edit Task</h1>
                        <Formik
                            initialValues={{
                                title: "",
                                workwith: "",
                                assignedto:"",
                                date: "",
                                moredetails:"",
                                comment:""
                            }}
                            validationSchema={editSchema}
                            onSubmit={ handleSubmit}
                            >
                            {({ isSubmitting, isValid, values, setFieldValue,  handleChange}) => (
                                <Form className="p-8 rounded-xl bg-zinc-100 border">
                                    <div className="py-2">
                                        <label>Title of Task</label>
                                        <Field
                                            placeholder="title"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
                                            as="textarea"
                                            name="title"
                                            onChange={handleChange("names.title")}
                                            value= {rowdata.title}
                                        />                
                                    </div>
                                    <div className="py-2">
                                        <label>Who will do the task?</label>
                                        <Field
                                            as="textarea"
                                            name="workwith"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                                            defaultValue={rowdata.assigned_person}
                                            />
                                    </div>
                                    <div className="py-2">
                                        <label>Description of task</label>
                                        <Field
                                            as="textarea"
                                            name="moredetails"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline " 
                                            value={rowdata.description}
                                            />
                                    </div>
                                    <div className="py-2">
                                        <label>Deadline</label>
                                        <DatePicker placeholderText="Select Date" name="date" selected={values.date } onChange={(date) => setFieldValue("date",date)}  className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                                        value={rowdata.deadline}
                                        />
                                        
                                    </div>
                                    <div className="py-2">
                                        <label>Comment</label>
                                        <Field
                                            as="textarea"
                                            name="comment"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline " 
                                            />
                                    </div>
                                    <button
                                        type="submit"
                                        className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">
                                        Save
                                    </button>
                                </Form>
                            )}
                        </Formik>
				</div>
                
			</main>
		</section>
	);
}
