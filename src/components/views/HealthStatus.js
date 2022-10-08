import React, { useEffect, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import { supabase } from "../helpers/supabase";
import { Line} from "react-chartjs-2";
import mixedCharts from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
mixedCharts.register(CategoryScale);

export default function HealthStatus() {
  const [names, setNames] = useState([])
	const [profile] = useOutletContext();


  useEffect ( () => {
    let getData = async () => {
        let { data, error } = await supabase.from('health_form').select('*').eq('user_id', profile.id)
        // if(error) throw error
        console.log(data)
        setNames(data)
         
    }
    getData().catch(error => console.log(error))
    
},[])

  const data = {
    labels: [
      "backpain",
      "chestpain",
      "cough",
      "fever",
      "headache",
      "sorethroat",
      "shortnessofbreath",
      "sneezing",
      "tiredness",
      "sleepduration",
      "morningexerciseduration",
    ],
    datasets: [
      {
        label: "True or False",
        data: [ ],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#40B5AD"
      }
    ]
  };
  
  return (
    <div className='px-10 outline flex flex-col'>
        <section>
          <h1 className='text-center'>MY HEALTH</h1>
          <div className='flex justify-between my-5 w-full gap-5'>
            <div className='bg-gray-100 px-10 py-5 rounded-lg flex flex-col justify-center items-center w-full'>
              <Line data={data} responsive={true} />
            </div>
          </div>
        </section>
    </div>
  )
}
