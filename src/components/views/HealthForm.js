
import React, { useState,useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { supabase } from "../helpers/supabase";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useOutletContext } from 'react-router-dom';
import  {toBase64} from "../helpers/toBase64";


export default function HealthForm() {
	const [names, setNames] = useState([])
	const [ profile] = useOutletContext();
  	const [activities,setActivities] = useState([]);

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
		)
	});

	useEffect ( () => {
        let getData = async () => {
            let { data, error } = await supabase.from('profiles').select('*').eq('id', profile.id).single()
            // if(error) throw error
			// console.log(data)
            setNames(data)
             
        }
        getData().catch(error => console.log(error))
        
    },[]) 



	const handleSubmit = async (values, { resetForm }) => {
		// console.log(values)
		const {data, error} = await supabase
        .from('health_form')
        .insert ({
				user_name: names.username,
				user_id: names.id,
                backpain: values.backpain,
				chestpain: values.chestpain,
				cough: values.cough,
				fever: values.cough,
				headache: values.headache,
				sorethroat: values.sorethroat,
				shortnessofbreath: values.shortnessofbreath,
				sneezing: values.sneezing,
				tiredness: values.tiredness,
				sleepduration: values.sleepduration,
				morningexerciseduration: values.morningexerciseduration,
				proof: values.proof
		})	
        if (error){
            toast.error(error.message, {
            position: "top-center"
        });
        }else {
            toast.success("Success", {
            position: "top-center"
        });
           resetForm();
           setActivities([...activities, values]);
		
	    };
	};

	return (
		<section className="px-10">
			<main className="py-10">
				<div className="p-8 rounded-xl bg-zinc-100 border">
				< ToastContainer />
					<p className="text-sm teer-emerald-300 mb-5">
						The information we collect helps discover ways of
						supporting teammates you and help you work effectively.{" "}
						<br /> This information will not be shared with anyone.
					</p>
					<Formik
						initialValues={{
							backpain: "",
							chestpain: "",
							cough: "",
							fever: "",
							headache: "",
							sorethroat: "",
							shortnessofbreath: "",
							sneezing: "",
							tiredness: "",
							sleepduration: "",
							morningexerciseduration: "",
						}}
						validationSchema={checkinSchema}
						onSubmit={handleSubmit}>
						{({ errors, touched, values,error}) => (
							<Form>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have backpain?
									</p>
									<div className="grid grid-cols-3 gap-x-5">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="backpain"
												id="backpain_yes"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border- border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="backpain_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="backpain"
												id="backpain_no"
											/>
											<label
                        						className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="backpain_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="backpain"
												id="backpain_notsure"
											/>
											<label
                       							 className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="backpain_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.backpain && touched.backpain && (
										<p className="text-red-500 text-xs italic">
											{errors.backpain}
										</p>
									)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have chestpain?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="chestpain"
												id="chestpain_yes"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="chestpain_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="chestpain"
												id="chestpain_no"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-emerald-300 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="chestpain_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="chestpain"
												id="chestpain_notsure"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="chestpain_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.chestpain && touched.chestpain && (
										<p className="text-red-500 text-xs italic">
											{errors.chestpain}
										</p>
									)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have a cough?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="cough"
												id="cough_yes"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="cough_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="cough"
												id="cough_no"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="cough_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="cough"
												id="cough_notsure"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="cough_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.cough && touched.cough && (
										<p className="text-red-500 text-xs italic">
											{errors.cough}
										</p>
									)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have a fever?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="fever"
												id="fever_yes"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="fever_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="fever"
												id="fever_no"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="fever_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="fever"
												id="fever_notsure"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="fever_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.fever && touched.fever && (
										<p className="text-red-500 text-xs italic">
											{errors.fever}
										</p>
									)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have a headache?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="headache"
												id="headache_yes"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="headache_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="headache"
												id="headache_no"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="headache_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="headache"
												id="headache_notsure"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="headache_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.headache && touched.headache && (
										<p className="text-red-500 text-xs italic">
											{errors.headache}
										</p>
									)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have a sore throat?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="sorethroat"
												id="sorethroat_yes"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="sorethroat_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="sorethroat"
												id="sorethroat_no"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="sorethroat_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="sorethroat"
												id="sorethroat_notsure"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="sorethroat_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.sorethroat &&
										touched.sorethroat && (
											<p className="text-red-500 text-xs italic">
												{errors.sorethroat}
											</p>
										)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have a shortness of breath?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="shortnessofbreath"
												id="shortnessofbreath_yes"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="shortnessofbreath_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="shortnessofbreath"
												id="shortnessofbreath_no"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="shortnessofbreath_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="shortnessofbreath"
												id="shortnessofbreath_notsure"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="shortnessofbreath_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.shortnessofbreath &&
										touched.shortnessofbreath && (
											<p className="text-red-500 text-xs italic">
												{errors.shortnessofbreath}
											</p>
										)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Are you sneezing?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="sneezing"
												id="sneezing_yes"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="sneezing_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="sneezing"
												id="sneezing_no"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="sneezing_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="sneezing"
												id="sneezing_notsure"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="sneezing_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.sneezing && touched.sneezing && (
										<p className="text-red-500 text-xs italic">
											{errors.sneezing}
										</p>
									)}
								</div>
								<div className="py-2">
									<label className="mb-2 text-sm font-semibold block">
										Do you feel tired?
									</label>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="tiredness"
												id="tiredness_yes"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="tiredness_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="tiredness"
												id="tiredness_no"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="tiredness_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="tiredness"
												id="tiredness_notsure"
											/>
											<label
                        className="flex p-2 bg-gray-100 dark:bg-emerald-300 dark:border-emerald-300 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-orange-600 dark:hover:border-orange-600"
												htmlFor="tiredness_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.sneezing && touched.sneezing && (
										<p className="text-red-500 text-xs italic">
											{errors.sneezing}
										</p>
									)}
								</div>
								<div className="py-2 ">
									<label
										className="mb-2 text-sm font-semibold block"
										htmlFor="sleepduration">
										How long do you sleep?
									</label>
									<Field
                    className="outline-0 p-3 bg-gray-100  border border-gray-300 w-full rounded-lg"
										type="text"
										name="sleepduration"
										id="sleepduration"
									/>
									{errors.sleepduration &&
										touched.sleepduration && (
											<p className="text-red-500 text-xs italic">
												{errors.sleepduration}
											</p>
										)}
								</div>
								<div className="py-2 ">
									<label
										className="block mb-2 text-sm font-semibold"
										htmlFor="morningexerciseduration">
										How long did you exercise?
									</label>
									<Field
                    					className="outline-0 p-3 bg-gray-100 border border-gray-300 w-full rounded-lg"
										type="text"
										name="morningexerciseduration"
										id="morningexerciseduration"
									/>
									{errors.morningexerciseduration &&
										touched.morningexerciseduration && (
											<p className="text-red-500 text-xs italic">
												{errors.morningexerciseduration}
											</p>
										)}
								</div>
								<div className="mb-3 flex flex-wrap gap-3">
									<div className="flex flex-col">
										<p className="block mb-2 text-sm font-semibold">Upload Medical Form </p>
										<div className="flex-grow flex">
											<input
												type="file"
												name="proof"
												id="proof"
												placeholder="proof"
												className="ring-1 ring-black rounded px-2 py-1"
												onChange={async (event) => {
													const file = event.target.files[0];
													const fileString = await toBase64(file);
													values.proof = fileString;
												}}
											/>
										</div>
									</div>
              					</div>
								<div className="pt-8">
									<button
										className="px-4 py-1 transition hover:-translate-y-1 hover:bg-orange-600  dark:bg-emerald-300 duration-300 mx-auto max-w-md rounded-full border border-orange-500 dark:border-emerald-300"
										// onClick={() => {
                                        //     console.log(values)
                                        //     console.log(errors)
                                        // }}
										type="submit">
										
										Submit
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				
			</main>
		</section>
	);
}
