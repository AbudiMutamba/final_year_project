import React, {useEffect, useState} from 'react'
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'
import { useOutletContext } from 'react-router-dom'
import useGeoLocation from '../helpers/useGeoLocation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
// import Moment from 'react-moment';



export default function Attendance() {
    const [rowdata, setRowData] = useState([])
    // const [show, setShow] = useState(true)
    const [ user, profile] = useOutletContext();
    const [max_date_attendence, setMax_date_attendence] = useState({})
    const location = useGeoLocation()
    const currentDateTime = moment().format();

    // console.log(currentDateTime)
    useEffect ( () => {
        let getData = async () => {
            let { data, error } = await supabase.from('attendence').select('*').eq('user_id', user.id)
            if(error) throw error
            let max_date_attendence = data[0]
            data.forEach((attendence) => {
                if (new Date(attendence.checkin) > new Date(max_date_attendence.checkin)) {
                    max_date_attendence = attendence
                }
            })
            setMax_date_attendence(max_date_attendence)
            // console.log(console.log(max_date_attendence))
            
                // if (max_date_attendence.checkout === null) {
                //   setShow(false);
                //   alert("true")
                // } else 
                // if (max_date_attendence.checkout === currentDateTime) {
                //   setShow(true)
                //   alert('false')
                // }
              
            setRowData (data)
             
        }
        getData().catch(error => console.log(error))
        // console.log(user)
    },[]) 



    const onCheckInClick =  async () => {
        // console.log(location.coordinates)
        const {data, error} = await supabase
            .from('attendence')
            .insert ({
                user_id: profile.id,
                username: profile.username,
                checkin: currentDateTime,
                location: location.coordinates
            })
            .eq('id', profile.id)
            .single()
            if (error){
                toast.error(error.message, {
                    position: "top-center"
                   });
            }else {
                toast.success("Checked In", {
                position: "top-center"
               });

            setRowData(
                [...rowdata], 
                {
                checkin: currentDateTime,
            })
        }
        
        setRowData(
            [...rowdata],
            { 
                checkin:currentDateTime,
                location: location.coordinates
            })
        // setShow(false)
    }

              
    const onCheckOutClick = async() => {
            const currentDateTime1 = moment().format();
            console.log(currentDateTime1)
            const { data, error } = await supabase.rpc('total_working_duration_1', { attendence_id: max_date_attendence.id, check_out_time: currentDateTime1} )
            console.log(data)
            if (error){
                console.log(error)
                toast.error(error.message, {
                    position: "top-center"
                });
            }else {
                toast.success("Checked out", {
                position: "top-center"
            });
            setRowData(
             [...rowdata],
                {
                    checkout: currentDateTime1,
                })
            // setShow(true)
        }
        setRowData(
            [...rowdata],
               {
                   checkout: currentDateTime1,
               })
    }

    const columns = [
        {
            Header: "Check in",
            accessor: "checkin",
        },
        {
            Header: "Check out",
            accessor: "checkout",
        },
        {
            Header: "Duration",
            accessor: "duration",
        },

    ]
  return (
    <div className="container mx-auto px-10">
        
        <h1 className='font-bold p-5'>ATTENDANCE</h1>
            < ToastContainer />
            {/* <div className='p-8 rounded-xl bg-zinc-100 border'> */}
        
                <div className='flex justify-between m-7'>
                    
                    <button onClick={onCheckInClick}  className="bg-emerald-300 hover:bg-orange-600 py-2 px-4 rounded-full">
                                    CheckIn
                    </button>
                    <button onClick={onCheckOutClick} className="bg-emerald-300 hover:bg-orange-600 py-2 px-4 rounded-full">
                                    CheckOut
                    </button>
                    {/* {
                        show?<button onClick={onCheckInClick} className="bg-emerald-300 hover:bg-orange-600 py-2 px-5 rounded-full">
                                CheckIn
                        </button>: <button
                        onClick={onCheckOutClick} className="bg-emerald-300 hover:bg-orange-600 py-2 px-5 rounded-full">
                                CheckOut
                        </button>
                    }  */}
                    {/* <div className='flex justify-start  my-5'>
                        <button onClick={onCheckInClick} className="bg-emerald-300 hover:bg-orange-600 py-2 px-5 rounded-full">
                                    CheckIn
                        </button>
                    </div>
                    <div className='flex justify-start  my-5'>
                        <button onClick={onCheckOutClick} className="bg-emerald-300 hover:bg-orange-600 py-2 px-5 rounded-full">
                                    CheckOut
                        </button>
                    </div> */}
                </div> 
                <div>
                    <Table columns={columns} data={rowdata} defaultPageSize = {2}/>
                </div>
            {/* </div> */}
    </div>
  );
};
