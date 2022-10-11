import React, {useEffect, useState} from 'react'
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import Moment from 'react-moment';

export default function AdminVerificationHistory() {
   const [rowdata, setRowData] = useState([]);
   useEffect ( () => {
    let getData = async () => {
        let { data, error } = await supabase.from('tasks').select('id, seen_by_employee, comments, title, created_at, status, remarks')
        console.log(data) 
        setRowData (data)
    }
    getData()
},[]) 

    // const columns = [
    //     {
    //         Header: "Date",
    //         accessor: "date",
    //     },
    //     // {
    //     //     Header: "Name",
    //     //     accessor: "id",
    //     // },
    //     {
    //         Header: "Title",
    //         accessor: "title",
    //     },
    //     {
    //         Header: "Description",
    //         accessor: "edit",
    //     },
    //     // {
    //     //     Header: "Delete",
    //     //     accessor: "delete",
    //     // },
    // ]
    const columns = [
        {
            Header: "Date",
            accessor: "created_at",
        },

        {
            Header: "Title",
            accessor: "title",
        },
        
        // {
        //     Header: "Action",
        //     accessor: "id",
        //     Cell: ({value}) => {
        //         return(
        //                 <div>
        //                     <button onClick={() => handleVeiw(value)} className="text-black px-2 ">Veiw</button>
        //                     <button onClick={() => handleEdit(value)} className="text-black" >Edit</button>
        //                 </div>
        //         )
        //     } 
        // },
        {
            Header: "Seen",
            id: "seen_by_employee",
            accessor: d => d.seen_by_employee.toString()
        },
        {
            Header: "Status",
            accessor: "status",
        },
        
    ]
  return (
    <div className="container mx-auto px-2"> 
        <h1 className='font-bold p-5'>VERIFICATION HISTORY</h1>
            < ToastContainer />
                <div>
                    <Table columns={columns} data={rowdata} />
                </div>

    </div>
  );
};
