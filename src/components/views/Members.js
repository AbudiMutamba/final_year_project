import React, {useState} from 'react'

import Table from '../helpers/Table'


export default function Members() {
    const [rowdata, setRowData] = useState([]);

    
    
    const columns = [
    
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Role",
            accessor: "role",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Telephone",
            accessor: "phone",
        },
        {
            Header: "Address",
            accessor: "address",
        },
        {
            Header: "Date Joined",
            accessor: "date_joined",
        },
        {
            Header: "Date Left",
            accessor: "date_left",
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
        
        <h1 className='font-bold p-5'>MEMBERS LIST</h1>

            <div>
                <div className='rounded-xl bg-zinc-100 border'>
                    <Table columns={columns} data={rowdata} />
                </div>
            </div>
    </div>
  );
};

