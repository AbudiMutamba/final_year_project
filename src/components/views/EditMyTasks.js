
import React,{ useState, useEffect} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { supabase } from "../helpers/supabase";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useOutletContext, useParams } from 'react-router-dom'


export default function EditMyTasks() {
    const [ user, profile] = useOutletContext();
    const [activities,setActivities] = useState([]);
    const [rowdata, setRowData] = useState({});
    const [ names, setNames] = useState({})
    const { id } = useParams();

	useEffect(() => {
        let getUser = async () => {
            let { data, error } = await supabase.from('my_tasks').select('*').eq('id', id).single()
            // console.log("data is", data)
            if(error) throw error
            setRowData(data)
         }
    getUser()
	}, []);
   
    const editSchema = Yup.object().shape({
        title:Yup.string(),
        challenges:Yup.string(),
        date: Yup.date(),
        moredetails:Yup.string(),
    });

	const handleSubmit = async (values, { resetForm }) => {
        console.log(values)
		const {data, error} = await supabase
        .from('my_tasks')
        .update ({
            title: values?.title,
            description: values?.moredetails,
            challenges: values?.challenges,
            start: values?.start,
            end: values?.finish,
        }).eq('id', id)
        if (error){
            toast.error(error.message, {
            position: "top-center"
        });
        }else{
            toast.success("Success", {
            position: "top-center"
        });
        resetForm();
        setActivities([...activities, values]);
        }

		
	};

	return (
		<section className="px-10">
			
			<main >
				<ToastContainer/>
				<div>
                    <h1 className='font-bold p-5'>EDIT TASK</h1>
                        <Formik
                            initialValues={{
                                workon:rowdata.title,
                                challenges: rowdata.challenges,
                                moredetails:rowdata.description,
                                start:rowdata.start,
                                finish:rowdata.finish
                            }}
                            validationSchema={editSchema}
                            onSubmit={ handleSubmit }
                            >
                            {({ isSubmitting, isValid, values, errors, handleChange }) => (
                                <Form className="p-8 rounded-xl bg-zinc-100 border">
                                    <div className="py-2">
                                        <label>Title of Task</label>
                                        <input
                                            placeholder="title"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
                                            type="text"
                                            name="title"
                                            onChange={handleChange("title")}
                                            defaultValue={rowdata.title}
                                        />
                                    </div>
                                    
                                    <div className="py-2">
                                        <label>Description of task</label>
                                        <Field
                                            as="textarea"
                                            // type="text"
                                            name="moredetails"
                                            onChange={handleChange("moredetails")}
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
                                            defaultValue={rowdata?.description}
                                            />
                                    </div>
                                    <div className="py-2">
                                        <label>Challenges</label>
                                        <Field
                                            as="textarea"
                                            name="challenges"
                                            onChange={handleChange("challenges")}
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline " 
                                            defaultValue={rowdata?.challenges}
                                            />
                                    </div>
                                    <div className="py-2">
                                        <label>Started At</label>
                                        <Field
                                            type="time"
                                            name="start"
                                            onChange={handleChange("start")}
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                                            defaultValue={rowdata.start}
                                            />
                                        
                                    </div>
                                    <div className="py-2">
                                        <label>Finished At</label>
                                        <Field
                                            type="time"
                                            name="finish"
                                            onChange={handleChange("finish")}
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                                            defaultValue={rowdata.end}
                                            />
                                        
                                    </div>
                                    <button
                                        // onClick={() => {
                                        //     console.log(values)
                                        //     console.log(errors)
                                        // }}
                                        type="submit"
                                        className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">
                                        Add
                                    </button>
                                </Form>
                            )}
                        </Formik>
				</div>
			</main>
		</section>
	);
}
