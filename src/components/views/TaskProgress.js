import React, {useState, useEffect} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Table from '../helpers/Table'
import {supabase} from "../helpers/supabase";
import moment from 'moment'
import { useOutletContext } from 'react-router-dom'
import { Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);




export default function TaskProgress() {
	const [ tasks, setTasks] = useState([]);
  const [ profile] = useOutletContext();
  const [ users, setUsers] = useState([])
  const [ selectedUser, setSelectedUser ] = useState("")
  const [dataObj, setDataObj] = useState({
    "Jan": 0,
    "Feb": 0,
    "Mar": 0,
    "Apr": 0,
    "May": 0,
    "Jun": 0,
    "Jul": 0, 
    "Aug": 0,
    "Sep": 0,
    "Oct": 0,
    "Nov": 0,
    "Dec": 0
  })
  

  useEffect( () => {
    let getData = async () => {
        let { data, error } = await supabase.from('tasks').select('*')
        if( error ) throw error
        // console.log("data: ", data)
        data.forEach(
          task => {
            if( (new Date(task.deadline).getTime()) > Date.now() &&  selectedUser === (task.assigned_person || task.new_assigned_person)) {
              // console.log(task)
              dataObj[moment(task.created_at).format("MMM")] ++
            }
          }
    
        )

        let { data: users, error: errors } = await supabase.from('profiles').select('username, id').eq('roles', 'member')
        if( errors ) throw errors
        setUsers(users)
         
    }
    getData()
}, [selectedUser]);
  
    const taskSchema = Yup.object().shape({
      name: Yup.string().required("Required"),
    });

    // console.log(dataObj)

    const data = {
        labels: Object.keys(dataObj),
        datasets: [
          {
            label: "Number of Tasks past the deadline",
            data: Object.values(dataObj),
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "#40B5AD"
          }
        ]
      };
      
      
      
	return (
		<section className="px-10">
			<header>
				<h1 className='font-bold p-5' >TASK PROGRESS</h1>
			</header>
			<main className="grid gap-4 grid-cols-2 py-10">
				<div className="py-8 rounded-xl bg-white border">
          <Formik
            initialValues={{
                name: "",
            }}
            validationSchema={taskSchema}
            >
            {({values}) => (
              <Form className="p-8 rounded-xl bg-zinc-100 border">
                <div className="py-2">
                  <label>Name</label>
                  <select
                    name="name"
                    className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
                    onChange={(event) => {
                      setSelectedUser(event.target.value)
                      // console.log(event.target.value)
                    }}
                    >
                    <option>- Select -</option>
                    {users && users.map((user, index) => 
                      <option key={index} value={user.id}>{user.username}</option>
                    )} 
                  </select>
                </div>
              </Form>
              )}
          </Formik>
				</div>
				<div>   
          <Doughnut data={data} responsive={true} />
				</div>
			</main>
		</section>
	);
}

