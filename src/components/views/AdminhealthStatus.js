import React, { useEffect, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import { supabase } from "../helpers/supabase";
import { Bar} from "react-chartjs-2";
import mixedCharts from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
mixedCharts.register(CategoryScale);

export default function AdminhealthStatus() {
  const [dataObj, setDataObj] = useState({
    "backpain": 0,
    "chestpain": 0,
    "cough": 0,
    "fever": 0,
    "headache": 0,
    "sorethroat": 0,
    "shortnessofbreath": 0,
    "sneezing": 0,
    "tiredness": 0,
    "sleepduration": 0,
    "morningexerciseduration": 0,

  })

  useEffect ( () => {
    let getData = async () => {
      let { data, error } = await supabase.from('health_form').select('*')
      if(error) throw error
      // console.log(data)
      // setNames(data)
      const back_pain = data.filter(form => {
        if(form.backpain === 'Yes'){
          return form
        }
      })
      dataObj["backpain"] = back_pain.length

      const chest_pain = data.filter(form => {
        if(form.chestpain === 'Yes'){
          return form
        }
      })
      dataObj["chestpain"] = chest_pain.length

      const cough = data.filter(form => {
        if(form.cough === 'Yes'){
          return form
        }
      })
      dataObj["cough"] = cough.length

      const fever = data.filter(form => {
        if(form.fever === 'Yes'){
          return form
        }
      })
      dataObj["fever"] = fever.length

      const headache = data.filter(form => {
        if(form.headache === 'Yes'){
          return form
        }
      })
      dataObj["headache"] = headache.length

      const shortnessofbreath = data.filter(form => {
        if(form.shortnessofbreath === 'Yes'){
          return form
        }
      })
      dataObj["shortnessofbreath"] = shortnessofbreath.length

      const sleepduration = data.filter(form => {
        if(form.sleepduration === 'Yes'){
          return form
        }
      })
      dataObj["sleepduration"] = sleepduration.length

      const sneezing = data.filter(form => {
        if(form.sneezing === 'Yes'){
          return form
        }
      })
      dataObj["sneezing"] = sneezing.length

      const sorethroat = data.filter(form => {
        if(form.sorethroat === 'Yes'){
          return form
        }
      })
      dataObj["sorethroat"] = sorethroat.length

      const tiredness = data.filter(form => {
        if(form.tiredness === 'Yes'){
          return form
        }
      })
      dataObj["tiredness"] = tiredness.length

      const morningexerciseduration = data.forEach(form => {
        if(form.morningexerciseduration){
          return form
        }
      })
      dataObj["morningexerciseduration"] = morningexerciseduration
       
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
        backgroundColor: "rgba(75,192,192)",
        borderColor: "#40B5AD"
      }
    ]
  };
  
  return (
    <div className='px-10 outline flex flex-col'>

          <h1 className='text-center'>HEALTH</h1>
          {/* <div className='flex justify-between my-5 w-full gap-5'> */}
            <div className='bg-gray-100 px-10 py-5 rounded-lg flex flex-col justify-center items-center w-full'>
              <Bar data={data} responsive={true} />
            </div>
          {/* </div> */}
        
    </div>
  )
}

