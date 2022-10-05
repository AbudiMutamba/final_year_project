import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from "../helpers/supabase";
import DatePicker from 'react-datepicker';
import { useOutletContext, useParams, Link} from 'react-router-dom'

export default function ScheduleVeiw() {
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


  return (
    
    <div className="container mx-auto px-10">
      <h1 className='font-bold p-5'> Veiw Task</h1>
        <div className='p-8 rounded-xl bg-zinc-100 border'>
          <div>
            <label className='font-bold p-5'>Title: </label>
            {names.title}
          </div>
          <div>
            <label className='font-bold p-5'>Description: </label>
            {names.description}
          </div>
          <div>
            <label className='font-bold p-5'>deadline: </label>
            {names.deadline}
          </div>
          <div className="m-5">
            <Link to="/schedule" >
              <button type="submit" className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">
                Back
              </button>
            </Link>
          </div>
            
            
        </div>
    </div>
  )
}
