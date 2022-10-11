
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from "../helpers/supabase";
import DatePicker from 'react-datepicker';
import { useOutletContext, useParams } from 'react-router-dom'
import moment from 'moment'


export default function EditTask() {
    const [ activities,setActivities ] = useState([]);
    const [ profile ] = useOutletContext();
    const [ names, setNames] = useState({})
    const [rowdata, setRowData] = useState({});
    const { id } = useParams();
    // console.log({id})
	useEffect( () => {
        let getData = async () => {
            let { data, error } = await supabase.from('tasks').select('*').eq('id', id).single()
            // console.log(data)
            // console.log("data is", data)
            //  if(error) throw error

             setRowData(data)
             
             let { data: users, errors } = await supabase.from('profiles').select('username, id').eq('roles', 'member')
            // console.log("data is", datas)
            //  if(errors) throw errors
             setNames(users)
             
        }
        // let getUser = async () => {
        //     let { data, error } = await supabase.from('profiles').select('username, id').eq('roles', 'member')
        //     // console.log("data is", data)
        //      if(error) throw error
        //      setNames(data)
        // }
        getData()
	}, []);

    const editSchema = Yup.object().shape({
        title:Yup.string(),
        workwith:Yup.string(),
        assignedto:Yup.string(),
        // date: Yup.date(),
        moredetails:Yup.string(),
    });

	const handleSubmit = async (values, { resetForm }) => {
        // console.log(values)
        const {data, error} = await supabase
            .from('tasks')
            .update ({
                // user_id: names.id,
                title: values?.title,
                assigned_person: values?.workwith,
                new_assigned_person: values?.assignedto,
                description: values?.moredetails,
                deadline: values?.date,
         }).eq('id', id)
        if (error){
            toast.error(error.message, {
            position: "top-center"
        });
        }else {
            toast.success("Updated", {
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
                                title:rowdata.title,
                                workwith:rowdata.assigned_person,
                                assignedto:rowdata.new_assigned_person,
                                date: rowdata.deadline,
                                moredetails:rowdata.description
                            }}
                            validationSchema={editSchema}
                            onSubmit={ handleSubmit}
                            >
                            {({ isSubmitting, isValid, values, setFieldValue,  handleChange, errors}) => (
                                <Form className="p-8 rounded-xl bg-zinc-100 border">
                                    <div className="py-2">
                                        <label>Title of Task</label>
                                        <input
                                            id="name"
                                            placeholder="title"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
                                            name="title"
                                            type="text"
                                            onChange={handleChange("title")}
                                            // value={rowdata.title}
                                            defaultValue={rowdata.title}
                                        />
        
                                        
                                    </div>
                                    <div className="py-2">
                                        <label>Who will do the task?</label>
                                        <Field
                                            as="select"
                                            name="workwith"
                                            onChange={handleChange("workwith")}
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                                            defaultValue={rowdata.assigned_person}
                                            >
                                            <option >- Select -</option>
                                            {names && names?.length>0 && names.map((user, index) => 
                                                <option value={user.id}>{user.username}</option>
                                            )}
                                            
                                        </Field>
                                    </div>
                                    <div className="py-2">
                                            <label>Who was to be assinged the task?</label>
                                            <Field
                                                as="select"
                                                name="assignedto"
                                                onChange={handleChange("assignedto")}
                                                className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline">
                                                <option>- Select -</option>
                                                {names && names?.length>0 && names.map((name, index) => 
                                                    <option value={name.id}>{name.username}</option>
                                                )}
                                            </Field>
                                        </div>
                                    <div className="py-2">
                                        <label>Description of task</label>
                                        <Field
                                            as="textarea"
                                            name="moredetails"
                                            onChange={handleChange("moredetails")}
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline " 
                                            defaultValue={rowdata?.description}
                                            />
                                    </div>
                                    <div className="py-2">
                                        <label>Deadline</label>
                                        <input defaultValue={rowdata?.deadline} name="date" type="date" onChange={handleChange("date")}  className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                                         />
                                      
                                        
                                    </div>
                                    <button
                                        // onClick={() => {
                                        //     console.log(values)
                                        //     console.log(errors)
                                        // }}
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
