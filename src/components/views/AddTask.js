
import React,{ useState, useEffect} from "react";
import { Formik, Form, Field } from "formik";
import { supabase } from "../helpers/supabase";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import Moment from "react-moment";
import format from 'date-fns/format';
import { useOutletContext } from 'react-router-dom'


export default function AddTask() {
	// const [submitting, setSubmitting] = React.useState(false);
	// const [error, setError] = React.useState(false);
	// const [msg, setMsg] = React.useState("");
	// const { user } = useAuth();
    const [ user, profile] = useOutletContext();
    const [activities,setActivities] = useState([]);
    const [userId, setuserId] = useState();
    console.log(profile.id)
	useEffect(() => {
    //     let getUser = async () => {
    //         let { data, error } = await supabase.from('profiles').select().eq('id', profile.id)
    //         console.log("data is", data)
    //         if(error) throw error
    //         setuserId(data)
    //      }
    // getUser()
	}, []);
   


	const handleSubmit = async (values, { resetForm }) => {
		const {data, error} = await supabase
        .from('my_tasks')
        .insert ({
            username: profile.id,
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
			{/* <header>
				{error && msg && (
					<Alert
						className="bg-red-100 border border-red-700 text-red-700 rounded-md p-2"
						msg={msg}
					/>
				)}
				{!error && msg && (
					<Alert
						className="bg-green-100 border border-green-700 text-green-700 rounded-md p-2"
						msg={msg}
					/>
				)}
			</header> */}
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
                                        />
                                    </div>
                                    
                                    <div className="py-2">
                                        <label>Description of task</label>
                                        <Field
                                            as="textarea"
                                            name="moredetails"
                                        className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline " />
                                    </div>
                                    <div className="py-2">
                                        <label>Challenges</label>
                                        <Field
                                            as="textarea"
                                            name="challenges"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline " />
                                    </div>
                                    <div className="py-2">
                                        <label>Started At</label>
                                        <Field
                                            type="time"
                                            name="start"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"/>
                                        
                                    </div>
                                    <div className="py-2">
                                        <label>Finished At</label>
                                        <Field
                                            type="time"
                                            name="finish"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"/>
                                        
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
