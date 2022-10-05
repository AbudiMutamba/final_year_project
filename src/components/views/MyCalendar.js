import React, {useState} from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from '../helpers/supabase';
import moment from 'moment'
import Moment from 'react-moment';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const locales = {
  "en-US": require("date-fns/locale/en-US")
}; 

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})
// const events = [
//   {
//     title: "Big Meeting",
//     allDay: true,
//     start: new Date(2022,8,0),
//     end: new Date(2022,8,0)
//   },
//   {
//     title: "Vacation",
//     start: new Date(2022,8,7),
//     end: new Date(2022,8,10)
//   },
//   {
//     title: "Conference",
//     start: new Date(2022,8,20),
//     end: new Date(2022,8,23)
//   },
// ]
export default function MyCalendar() {
  const [newEvent, setNewEvent] = useState({title:"", start:"", end:""});
  const [allEvents, setAllEvents] = useState([])

 const  handleAddEvent = async ()  => {
    const {data, error} = await supabase
            .from('events')
            .insert ({
                title: newEvent.title,
                start: newEvent.start,
                end: newEvent.end
            })
            .single()
            if (error){
              toast.error(error.message, {
                  position: "top-center"
                 });
          }else {
              toast.success("Added Event", {
              position: "top-center"
             });
          
          setAllEvents([...allEvents, newEvent])
         }
   
  }

  
  return (
    
    <div className="px-10"> 
      < ToastContainer />
      <h1 className='font-bold p-5'>CALENDAR</h1>
      <div className='p-8 rounded-xl bg-zinc-100 border'>
          
          <h2 className='flex justify-center'>Add New Event</h2>
          <div className='flex flex-row justify-center'>
            <input type="text" placeholder="Add Title"  value={newEvent.title}  onChange={(e) => setNewEvent({...newEvent, title:e.target.value})} />
            <DatePicker placeholderText="Start Date"  selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />
            <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} />
            <button className="px-4 py-1 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded border bg-emerald-300" onClick={handleAddEvent}> Add Event</button>
          </div>
      
          <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
    </div>
  )
}
