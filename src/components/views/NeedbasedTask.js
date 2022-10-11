
import React,{ useState, useEffect} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from "../helpers/supabase";
import DatePicker from 'react-datepicker';
import { useOutletContext } from 'react-router-dom'



export default function NeedbasedWork() {
	//  const [submitting, setSubmitting] = React.useState(false);
	// const [error, setError] = React.useState(false);
	// const [msg, setMsg] = React.useState("");
	// const { user } = useAuth();
    const [activities,setActivities] = useState([]);
    const [ profile] = useOutletContext();
    const [ names, setNames] = useState([])

	useEffect(() => {
		// document.title = `${document.title} - NeedBased`;
        let getUser = async () => {
            let { data, error } = await supabase.from('profiles').select('username, id').eq('roles', 'member')
            // console.log("data is", data)
             if(error) throw error
             setNames(data)
        }
        getUser()
	}, []);

    const needSchema = Yup.object().shape({
        workon:Yup.string().required("Required"),
        workwith:Yup.string().required("Required"),
        assignedto:Yup.string().required("Required"),
        date: Yup.date(),
        moredetails:Yup.string().required("Required"),
    });
	
	const handleSubmit = async (values, { resetForm }) => {
	
        const {data, error} = await supabase
        .from('tasks')
        .insert ({
            title: values.workon,
            assigned_person: values.workwith,
            new_assigned_person: values.assignedto,
            description: values.moredetails,
            deadline: values.date,
            status:"pending"
        })
        if (error){
            toast.error(error.message, {
            position: "top-center"
        });
        }else{
            toast.success("Assigned", {
            position: "top-center"
        });
        resetForm();
        setActivities([...activities, values]);
    }

		
};



	return (
		<section className="px-10">
			<main >
				<div>
                    < ToastContainer />
                    <h1 className='font-bold p-5'>Assign Work</h1>
                        <div className='p-8 rounded-xl bg-zinc-100 border'>
                            <Formik
                                initialValues={{
                                    workon:"",
                                    workwith: "",
                                    assignedto:"",
                                    date: "",
                                    moredetails:""
                                }}
                                validationSchema={needSchema}
                                onSubmit={ handleSubmit}
                                >
                                {({ isSubmitting, isValid, values, setFieldValue }) => (
                                    <Form>
                                        <div className="py-2">
                                            <label>Title of Task</label>
                                            <Field
                                                placeholder="title"
                                                className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
                                                type="text"
                                                name="workon"
                                            />
                                        </div>
                                        <div className="py-2">
                                            <label>Who will do the task?</label>
                                            <Field
                                                as="select"
                                                name="workwith"
                                                className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline ">
                                                <option>- Select -</option>
                                                {names && names.map((name, index) => 
                                                    <option value={name.id}>{name.username}</option>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="py-2">
                                            <label>Who was to be assinged the task?</label>
                                            <Field
                                                as="select"
                                                name="assignedto"
                                                className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline">
                                                <option>- Select -</option>
                                                {names && names.map((name, index) => 
                                                    <option value={name.id}>{name.username}</option>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="py-2">
                                            <label>Description of task</label>
                                            <Field
                                                as="textarea"
                                                name="moredetails"
                                                className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"/>
                                        </div>
                                        <div className="py-2">
                                            <label>Deadline</label>
                                            <DatePicker placeholderText="Select Date" name="date" selected={values.date } onChange={(date) => setFieldValue("date",date)}  className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"/>
                                        </div>
                                        <button
                                            type="submit"
                                            className="py-2 px-5  transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">
                                            Assign
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
				</div>
			</main>
		</section>
	);
}
