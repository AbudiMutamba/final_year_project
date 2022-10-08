
import React,{ useState, useEffect} from 'react';
import { Formik, Form, Field } from "formik";
import { supabase } from "../helpers/supabase";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useOutletContext, useParams } from 'react-router-dom'


export default function EditMyTasks() {
    const [ user, profile] = useOutletContext();
    const [activities,setActivities] = useState([]);
    const [ names, setNames] = useState({})
    const { id } = useParams();

	useEffect(() => {
        let getUser = async () => {
            let { data, error } = await supabase.from('my_tasks').select('*').eq('id', id).single()
            // console.log("data is", data)
            if(error) throw error
            setNames(data)
         }
    getUser()
	}, []);
   


	const handleSubmit = async (values, { resetForm }) => {
		const {data, error} = await supabase
        .from('my_tasks')
        .update ({
            title: values.title,
            description: values.moredetails,
            challenges: values.challenges,
            start: values.start,
            end: values.finish,
        })
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
                    <h1 className='font-bold p-5'>ADD TASK</h1>
                        <Formik
                            initialValues={{
                                workon:"",
                                challenges: "",
                                moredetails:"",
                            }}
                            onSubmit={ handleSubmit }
                            >
                            {({ isSubmitting, isValid }) => (
                                <Form className="p-8 rounded-xl bg-zinc-100 border">
                                    <div className="py-2">
                                        <label>Title of Task</label>
                                        <Field
                                            placeholder="title"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
                                            type="text"
                                            name="title"
                                            value={names.title}
                                        />
                                    </div>
                                    
                                    <div className="py-2">
                                        <label>Description of task</label>
                                        <Field
                                            as="textarea"
                                            name="moredetails"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
                                            defaultValue={names.description}
                                            />
                                    </div>
                                    <div className="py-2">
                                        <label>Challenges</label>
                                        <Field
                                            as="textarea"
                                            name="challenges"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline " 
                                            defaultValue={names.challenges}
                                            />
                                    </div>
                                    <div className="py-2">
                                        <label>Started At</label>
                                        <Field
                                            type="time"
                                            name="start"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                                            defaultValue={names.start}
                                            />
                                        
                                    </div>
                                    <div className="py-2">
                                        <label>Finished At</label>
                                        <Field
                                            type="time"
                                            name="finish"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"
                                            defaultValue={names.end}
                                            />
                                        
                                    </div>
                                    <button
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
