import React,{ useEffect, useState} from 'react'
import { useOutletContext } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import { supabase } from '../helpers/supabase';
import moment from 'moment'
Chart.register(CategoryScale);

export default function Dashboard() {
  const [profile] = useOutletContext();
  const [rejected, setRejected] = useState([]);
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
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




  useEffect(() => {
	  let getData = async () => {
      let { data, error} = await supabase.from('tasks').select()
      if(error) throw error
      data.forEach(
          task => {
            if((new Date(task.deadline).getTime()) > Date.now()){
              // console.log(task)
              dataObj[moment(task.created_at).format("MMM")]++
            }
          }
        
      )
      setRejected(data.filter(task => task?.status === "rejected"))
      setApproved(data.filter(task => task?.status === "approved"))
      setPending(data.filter(task => task?.status === "pending"))
    }
     getData()
  },[]);
  // console.log(dataObj)
  const data = {
    labels: Object.keys(dataObj),
    datasets: [
      {
        label: "Number of Tasks past the deadline",
        data: Object.values(dataObj),
        fill: false,
        // backgroundColor: "rgba(75,192,192,0.2)",
        backgroundColor: "rgba(255,0,0)",
        borderColor: "#40B5AD"
      }
    ]
  };
  
  return (
    <div className='px-10 outline flex flex-col'>
        <section>
          <h1 className='text-center'>Overview</h1>
          <div className='flex justify-between my-5 w-full gap-5'>
            <div className='bg-gray-100 px-10 py-5 rounded-lg flex flex-col justify-center items-center w-4/12'>
              <h2 className='font-bold text-2xl'>{pending.length}</h2>
              <h1>Pending Tasks</h1>
            </div>
            <div className='bg-gray-100 px-10 py-5 rounded-lg flex flex-col justify-center items-center w-4/12'>
              <h2 className='font-bold text-2xl'>{approved.length}</h2>
              <h1>Approved Tasks</h1>
            </div>
            <div className='bg-gray-100 px-10 py-5 rounded-lg flex flex-col justify-center items-center w-4/12'>
              <h2 className='font-bold text-2xl'>{rejected.length}</h2>
              <h1>Rejected Tasks</h1>
            </div>
          </div>
        </section>
        <section>
          <h1 className='text-center'>Overall Performance</h1>
          <div className='flex justify-between my-5 w-full gap-5'>
            <div className='bg-gray-100 px-10 py-5 rounded-lg flex flex-col justify-center items-center w-full'>
              <Bar data={data} responsive={true} />
            </div>
          </div>
        </section>
    </div>
  )
}
