import React, {useState} from 'react'

import Table from '../helpers/Table'

// import useGeoLocation from '../helpers/useGeoLocation'

export default function Attendence() {
    const [rowdata, setRowData] = useState([])
    const [checkin, setCheckIn] = useState([])
    // const location = useGeoLocation();
    const onCheckInClick = () => {
        let my_date = new Date();


        //  setRowData(

        // rowdata.concat({ date:"mydate", name:"", checkin:"", checkout:"", duration:"", location:""})
        // )
        console.log(my_date)
        // location.loaded ? JSON.stringify(location): "Location data not available yet"
    }

    const onCheckOutClick = () => {
        let my_date = new Date();
        console.log(my_date)
        // setRowData(

        // rowdata.concat({ date: "", name:"", checkin:"", checkout:"", duration:"", location:""})
        // )
    }
    const columns = [
        // {
        //     Header: "Date",
        //     accessor: "date",
        // },
        {
            Header: "Name",
            accessor: "name",
        },
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
        {
            Header: "Location",
            accessor: "location",
        },
    ]
  return (
    <div className="container mx-auto px-10">
        
        <h1 className='font-bold p-5'>ATTENDENCE</h1>

            <div className='p-8 rounded-xl bg-zinc-100 border'>
                <div className='flex justify-between my-5 '>
                    <button onClick={onCheckInClick} className="bg-emerald-300 hover:bg-orange-600 py-2 px-5 rounded-full">
                        Check In
                    </button>
                    <button onClick={onCheckOutClick} className="bg-emerald-300 hover:bg-orange-600 py-2 px-5 rounded-full">
                        Check Out
                    </button>
                </div>
                <div>
                    <Table columns={columns} data={rowdata} />
                </div>
            </div>
    </div>
  );
};
