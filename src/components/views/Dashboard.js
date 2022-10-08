import React,{ useEffect, useState} from 'react'
import { useOutletContext } from "react-router-dom";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

export default function Dashboard() {
  const [profile] = useOutletContext();
   
  useEffect(() => {
	document.title = "M&E - Login"
  },[]);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
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
              <h2 className='font-bold text-2xl'>0</h2>
              <h1>Pending Tasks</h1>
            </div>
            <div className='bg-gray-100 px-10 py-5 rounded-lg flex flex-col justify-center items-center w-4/12'>
              <h2 className='font-bold text-2xl'>0</h2>
              <h1>Approved Tasks</h1>
            </div>
            <div className='bg-gray-100 px-10 py-5 rounded-lg flex flex-col justify-center items-center w-4/12'>
              <h2 className='font-bold text-2xl'>0</h2>
              <h1>Assigned Tasks</h1>
            </div>
          </div>
        </section>
        <section>
          <h1 className='text-center'>Overall Performance</h1>
          <div className='flex justify-between my-5 w-full gap-5'>
            <div className='bg-gray-100 px-10 py-5 rounded-lg flex flex-col justify-center items-center w-full'>
              <Line data={data} responsive={true} />
            </div>
          </div>
        </section>
    </div>
  )
}
