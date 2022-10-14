import React, { useEffect, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import { supabase } from "../helpers/supabase";
import { Line} from "react-chartjs-2";
import mixedCharts from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import { boolean } from 'yup';
mixedCharts.register(CategoryScale);

export default function AdminhealthStatus() {
  const [rowdata, setRowData] = useState([])
	const [profile] = useOutletContext();
  const [dataObj, setDataObj] = useState({
      "backpain": 0,
      "chestpain": {
        yes:0,
        no:0
      },
      "cough": {
        yes:0,
        no:0
      },
      "fever": {
        yes:0,
        no:0
      },
      "headache": {
        yes:0,
        no:0
      },
      "sorethroat": {
        yes:0,
        no:0
      },
      "shortnessofbreath": {
        yes:0,
        no:0
      },
      "sneezing": {
        yes:0,
        no:0
      },
      "tiredness": {
        yes:0,
        no:0
      },
      "sleepduration":0,
      "morningexerciseduration":0,
  })

  useEffect ( () => {
    let getData = async () => {
        let { data, error } = await supabase.from('health_form').select('*')
        if(error) throw error
        data.forEach(health => {
          // if(health.)
          if(health.backpain === "Yes"){
            dataObj['backpain']['yes'] ++
            console.log(dataObj)
          }else if((health.backpain === 'no')){
            dataObj['backpain']['no'] ++
          }
          //   health_form.chestpain,
          //   health_form.cough,
          //   health_form.fever,
          //   health_form.headache,
          //   health_form.sorethroat,
          //   health_form.shortnessofbreath,
          //   health_form.sneezing,
          //   health_form.tiredness,
          //   health_form.sleepduration,
          //   health_form.morningexerciseduration
          // console.log(health)
          

          // dataObj[
          //   health_form.backpain,
          //   health_form.chestpain,
          //   health_form.cough,
          //   health_form.fever,
          //   health_form.headache,
          //   health_form.sorethroat,
          //   health_form.shortnessofbreath,
          //   health_form.sneezing,
          //   health_form.tiredness,
          //   health_form.sleepduration,
          //   health_form.morningexerciseduration
          // ]
        }
         
          // dataObj[]
        )
        setRowData(data)   
    }
    getData().catch(error => console.log(error))
    
},[])
  // console.log(dataObj)
  const data = {
    labels: Object.keys(dataObj),
    datasets: [
      {
        label: "Count",
        data:Object.values(dataObj),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#40B5AD"
      }
    ]
  };
  
  return (
    <div className='px-10 outline flex flex-col'>

          <h1 className='text-center'>HEALTH</h1>
          {/* <div className='flex justify-between my-5 w-full gap-5'> */}
            <div className='bg-gray-100 px-10 py-5 rounded-lg flex flex-col justify-center items-center w-full'>
              <Line data={data} responsive={true} />
            </div>
          {/* </div> */}
        
    </div>
  )
}

