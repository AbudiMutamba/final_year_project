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
            let { data, error } = await supabase.from('attendence').select('*')
             setRowData (data)
        }
        getData()
    },[])  

    const columns = [
        {
            Header: "Date",
            accessor: "date",
        },
        // {
        //     Header: "Name",
        //     accessor: "id",
        // },
        {
            Header: "Title",
            accessor: "title",
        },
        {
            Header: "Description",
            accessor: "edit",
        },
        // {
        //     Header: "Delete",
        //     accessor: "delete",
        // },
    ]
  return (
    <div className="container mx-auto px-10"> 
        <h1 className='font-bold p-5'>VERIFICATION HISTORY</h1>
            < ToastContainer />
                <div>
                    <Table columns={columns} data={rowdata} />
                </div>

    </div>
  );
};
