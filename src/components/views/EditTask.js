
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from "../helpers/supabase";
import DatePicker from 'react-datepicker';
import { useOutletContext, useParams } from 'react-router-dom'


export default function EditTask() {
    const [activities,setActivities] = useState([]);
    const [ profile] = useOutletContext();
    const [ names, setNames] = useState({})
    const {id} = useParams();

	useEffect( () => {
        let getUser = async () => {
            let { data, error } = await supabase.from('assign_task').select('*').eq('id', id).single()
            // console.log("data is", data)
            //  if(error) throw error
             setNames(data)
        }
        getUser()
	}, [names]);

    

	const handleSubmit = async (values, { resetForm }) => {

        const {data, error} = await supabase
            .from('assign_task')
            .update ({
                // user_id: names.id,
                title: values.title,
                assignedPerson: values.workwith,
                description: values.moredetails,
                deadline: values.date,
                // project: values.project 
         })
        if (error){
            toast.error(error.message, {
            position: "top-center"
        });
        }else {
            toast.success("Assigned", {
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
                                date: "",
                                // project: "",
                                moredetails:""
                            }}
                            onSubmit={ handleSubmit}
                            >
                            {({ isSubmitting, isValid, values, setFieldValue,  handleChange}) => (
                                <Form className="p-8 rounded-xl bg-zinc-100 border">
                                    <div className="py-2">
                                        <label>Title of Task</label>
                                        <Field
                                            placeholder="title"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
                                            type="text"
                                            name="title"
                                            onChange={handleChange("title")}
                                            defaultValue={names.title}
                                        />
                                        
                                    </div>
                                    <div className="py-2">
                                        <label>Who will do the task?</label>
                                        <Field
                                            as="select"
                                            name="workwith"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                                            defaultValue={names.assignedPerson}>
                                            <option >- Select -</option>
                                            {/* {names && names.map((name, index) => 
                                                <option value={name.id}>{name.username}</option>
                                            )} */}
                                            
                                        </Field>
                                    </div>
                                    <div className="py-2">
                                        <label>Description of task</label>
                                        <Field
                                            as="textarea"
                                            name="moredetails"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline " 
                                            defaultValue={names.description}/>
                                    </div>
                                    <div className="py-2">
                                        <label>Deadline</label>
                                        <DatePicker placeholderText="Select Date" name="date" selected={values.date } onChange={(date) => setFieldValue("date",date)}  className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                                        defaultValue={names.deadline}/>
                                        
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
