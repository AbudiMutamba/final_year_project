import React, {useState, useEffect} from 'react'

import Table from '../helpers/Table'

import useGeoLocation from '../helpers/useGeoLocation'



export default function AttendenceHistory() {
    const [rowdata, setRowData] = useState([])
    const [checkin, setCheckIn] = useState([])
    // const location = useGeoLocation();
    const onCheckInclick = () => {
        console.log("checkin")
        // location.loaded ? JSON.stringify(location): "Location data not available yet"
    }

    const onAddRowclick = () => {
        setRowData(

        rowdata.concat({ date: "", name:"", checkin:"", checkout:"", duration:"", location:""})
        )
    }
    const columns = [
        {
            Header: "Date",
            accessor: "date",
        },
        // {
        //     Header: "Name",
        //     accessor: "name",
        // },
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
    <div className="container mx-auto">
        {/* <button onClick={onAddRowclick} className="bg-blue-500 hover:bg-blur-700 text-white font-bold py-2 px-4 rounded">
            AddRow
        </button> */}
        <div className='flex justify-between my-5'>
            <button onClick={onCheckInclick} className="bg-blue-500 hover:bg-blur-700 text-white font-bold py-2 px-4 rounded">
                checkin
            </button>
            <button onClick={onAddRowclick} className="bg-blue-500 hover:bg-blur-700 text-white font-bold py-2 px-4 rounded">
                checkout
            </button>
        </div>
        <div>
            <Table columns={columns} data={rowdata} />
        </div>
    </div>
  );
};
