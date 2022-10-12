// import React,{useEffect, useState} from 'react'
// import { Formik, Form, Field } from "formik";
// import { useAudioRecorder } from '@baxibaba/react-audio-recorder'
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// import { supabase } from "../helpers/supabase";
// import { useOutletContext } from 'react-router-dom'
// import DatePicker from 'react-datepicker';

// export default function VoiceNote() {
//   const [ profile] = useOutletContext();
//   const [ names, setNames] = useState([])
//   const [activities,setActivities] = useState([]);
//   const {
//     audioResult,
//     timer,
//     startRecording,
//     stopRecording,
//     pauseRecording,
//     resumeRecording,
//     status,
//     errorMessage,
    
//   } = useAudioRecorder()


//   useEffect( () => {
//     let getUser = async () => {
//         let { data, error } = await supabase.from('profiles').select('username, id').eq('roles', 'member')
//         // console.log("data is", data)
//          if(error) throw error
//          setNames(data)
//     }
//     getUser()
//   }, []);

//   const handleSubmit = async (values, { resetForm }) => {

//     const {data, error} = await supabase
//       .from('tasks')
//       .insert ({
//             voice_note: audioResult,
//             assigned_person: values.workwith,
//             title: values.workon,
//             deadline: values.date,
//             status: "pending"
//       })
//       if (error){
//         toast.error(error.message, {
//         position: "top-center"
//       });
//       }else {
//         toast.success("Assigned", {
//         position: "top-center"
//       });
//        resetForm();
//        setActivities([...activities, values]);
//     };
//   }
//   const handleDownload = () => {
//     const data = audioResult
//     // console.log(data)
//     const blob = new Blob( {data}, {type: 'audio/ogg'})
//     const href = URL.createObjectURL(blob)
//     // console.log(href)
//     const a = Object.assign(document.createElement("a"), {
//       href,
//       style:"display:none",
//       download: "Task"
//     })
//     document.body.appendChild(a)
//     a.click()
//   }
  


 

 
//   return (
//     <div className='px-10'>
//       <ToastContainer />
//       <h1 className='font-bold p-5'>VoiceNote</h1>
      
//       <div className='p-8 rounded-xl bg-zinc-100 border'>
//           <audio controls src={audioResult} type="audio/ogg"/>
//           {/* <audio controls src="blob:http://localhost:3000/8048f133-2829-4205-833d-134de4529660" /> */}
          
//           <p>
//             Status : <b>{status}</b>
//           </p>
//           <p>
//             Error Message : <b>{errorMessage}</b>
//           </p>
//           <div>
//             <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>
//             <div>
//               <button onClick={startRecording} className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">Start</button>
//               <button onClick={stopRecording} className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">Stop</button>
//               <button onClick={pauseRecording} className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">Pause</button>
//               <button onClick={resumeRecording} className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">Resume</button>
//               <button onClick={handleDownload} className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">download</button>
//             </div>
//             <div className='py-8'>
//               <Formik
//                 initialValues={{
//                     workwith: "",
//                     workon: "",
//                     deadline: "",
//                 }}
//                 onSubmit={ handleSubmit}
//               >
//                 {({ isSubmitting, isValid, values, setFieldValue}) => (
//                   <Form >
//                     <div className="py-2">
//                         <label>Title of Task</label>
//                         <Field
//                             placeholder="title"
//                             className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
//                             type="text"
//                             name="workon"
//                         />
//                     </div>
//                   <div className="py-2">
//                         <label>Who will do the task?</label>
//                         <Field
//                             as="select"
//                             name="workwith"
//                             className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline ">
//                             <option>- Select -</option>
//                             {names && names.map((name, index) => 
//                                 <option value={name.id}>{name.username}</option>
//                             )}
//                         </Field>
//                   </div>
//                   <div className="py-2">
//                       <label>Deadline</label>
//                       <DatePicker placeholderText="Select Date" name="date" selected={values.date } onChange={(date) => setFieldValue("date",date)}  className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"/>
//                   </div>
//                   <button type="submit" className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">
//                      Assign
//                   </button>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//       </div>
//     </div>
//   )
// }