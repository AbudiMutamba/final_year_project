import React, {useState} from 'react'

import Table from '../helpers/Table'


export default function ScheduleHistory() {
    const [rowdata, setRowData] = useState([]);
    const [Checkin, setCheckIn] = useState([]);

    const edit_button = () => {
        let my_date = new Date();
        console.log(my_date)

        // setRowData(
        // rowdata.concat({ date: "", name:"", checkin:"", checkout:"", duration:"", location:""})
        // )
    }
    const columns = [
        {
            Header: "Date",
            accessor: "date",
        },
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Title",
            accessor: "title",
        },
        {
            Header: "type",
            accessor: "type",
        },
        {
            Header: "Deadline Day",
            accessor: "deadline",
        },
        {
            Header: "Assigned by",
            accessor: "assigned_by",
        },
        {
            Header: "Edit/Delete",
            accessor: "Edit/Delete",
        },
    ]
  return (
    <div className="container  mx-auto px-10">
        
        <h1 className='font-bold p-5'>SCHEDULE HISTORY</h1>

            <div>
                <div className='rounded-xl bg-zinc-100 border'>
                    <Table columns={columns} data={rowdata} />
                </div>
            </div>
    </div>
  );
};
