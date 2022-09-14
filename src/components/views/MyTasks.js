import React, {useState} from 'react'

import Table from '../helpers/Table'


export default function MyTasks() {
    const [rowdata, setRowData] = useState([]);

    
    
    const columns = [
    
        {
            Header: "Date",
            accessor: "date",
        },
        {
            Header: "Title",
            accessor: "title",
        },
        {
            Header: "Audio",
            accessor: "audio",
        },
        {
            Header: "Status",
            accessor: "status",
        },
        {
            Header: "Edit",
            accessor: "edit",
        },
        {
            Header: "Delete",
            accessor: "delete",
        },
        
    ]
    // setRowData(
    //     rowdata.details
    // )
    // const details = [
    //     { name:"Apollo", role:"Administrator", email:"apollo@gmail.com", telephone: +25670929732, address:"Nsambya",
    //     },
    // ]
  return (
    <div className="container  mx-auto px-10">
        
        <h1 className='font-bold p-5'>MY TASKS</h1>

            <div>
                <div className='rounded-xl bg-zinc-100 border'>
                    <Table columns={columns} data={rowdata} />
                </div>
            </div>
    </div>
  );
};
