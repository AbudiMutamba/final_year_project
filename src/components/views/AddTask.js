
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import supabase from "./helpers/supabase";
// import { useAuth } from "./hooks/useAuth";
import { Loader } from "../helpers/Loader";
import Alert from "../helpers/Alert";
export default function AddTask() {
	const [submitting, setSubmitting] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [msg, setMsg] = React.useState("");
	// const { user } = useAuth();
	// React.useEffect(() => {
	// 	document.title = `${document.title} - Dashboard`;
	// }, []);
  const [activities,setActivities] = React.useState([]);
	const checkinSchema = Yup.object().shape({
		backpain: Yup.string().required("Required"),
		chestpain: Yup.string().required("Required"),
		cough: Yup.string().required("Required"),
		fever: Yup.string().required("Required"),
		headache: Yup.string().required("Required"),
		sorethroat: Yup.string().required("Required"),
		shortnessofbreath: Yup.string().required("Required"),
		sneezing: Yup.string().required("Required"),
		tiredness: Yup.string().required("Required"),
		sleepduration: Yup.number("Numbers only allowed").required("Required"),
		morningexerciseduration: Yup.number("Numbers only allowed").required(
			"Required"
		),
		intensityofexercise: Yup.string(),
		breakfast: Yup.string().required("Required"),
		breakfastdetails: Yup.string(),
	});
	const handleSubmit = async (values, { resetForm }) => {
		setSubmitting(true);
		const date = new Date();
		date.toLocaleString("en-Us", { timezone: "Africa/Kampala" });
		values["checkin_at"] = date;

		try {
			// const { error } = await supabase
			// 	.from("check_ins_out")
			// 	.insert([{ meta: values, user_id: user.id }]);

			if (error) {
				console.log(error);
				setSubmitting(false);
				setError(true);
				setMsg("Something went wrong!");
			} else {
				setSubmitting(false);
				setError(false);
				setMsg("Checked In Successfully");
				// resetForm();
			}
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			setError(true);
			setMsg("Something went wrong");
		}
	};

	if (submitting) {
		return <Loader title="Checking in..." body="Please wait..." />;
	}

	return (
		<section className="px-10">
			<header>
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
			</header>
			<main >
				
				<div>
                    <h1 className='font-bold p-5'>Add task</h1>
                        <ul>
                            {activities.map((activity) => (
                            <li key={activity.id}>
                                    <div className="flex">
                                        {activity.workon}
                                        {activity.workwith}
                                        {activity.priority}
                                        {activity.project}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Formik
                            initialValues={{
                                workon:"",
                                workwith: "",
                                challenges: "",
                                project: "",
                                moredetails:""
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                            // setTimeout(() => {
                            //   alert(JSON.stringify(values, null, 2));
                            //   setSubmitting(false);
                            // }, 400);
                            setActivities([...activities, values]);
                            }}
                            >
                            {({ isSubmitting, isValid }) => (
                                <Form className="p-8 rounded-xl bg-zinc-100 border">
                                    <div className="py-2">
                                        <label>Title of Task</label>
                                        <Field
                                            placeholder="title"
                        className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
                                            type="text"
                                            name="workon"
                                        />
                                    </div>
                                    {/* <div className="py-2">
                                        <label>Who will do the task?</label>
                                        <Field
                                            as="select"
                                            name="workwith"
                        className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline dark:focus:bg-orange-600 dark:focus:border-orange-600">
                                            <option value="">- Select -</option>
                                            <option value="John">John</option>
                                            <option value="David">David</option>
                                            <option value="Charles">Charles</option>
                                        </Field>
                                    </div> */}
                                    <div className="py-2">
                                        <label>Description of task</label>
                                        <Field
                                            as="textarea"
                                            name="moredetials"
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
                                            as="select"
                                            name="priority"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline">
                                            <option value="">- Select time -</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </Field>
                                    </div>
                                    <div className="py-2">
                                        <label>Finished At</label>
                                        <Field
                                            as="select"
                                            name="priority"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline">
                                            <option value="">- Select time -</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </Field>
                                    </div>
                                    <div className="py-2">
                                        <label>Worked with?</label>
                                        <Field
                                            as="select"
                                            name="project"
                                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline">
                                            <option value="">
                                                - Select Member -
                                            </option>
                                            <option value="Tube App">
                                                Tube App
                                            </option>
                                            <option value="Ablestate Workspace">
                                                Ablestate Workspace
                                            </option>
                                        </Field>
                                    </div>
                                    <button
                                        type="submit"
                                        className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">
                                        Assign
                                    </button>
                                </Form>
                            )}
                        </Formik>
				</div>
			</main>
		</section>
	);
}
