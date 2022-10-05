import React, {useEffect, useState} from 'react'
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import Moment from 'react-moment';

export default function Adminverify() {
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
        {
            Header: "Name",
            accessor: "id",
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
            Header: "Accept",
            accessor: "accept",
        },
        {
            Header: "Reject",
            accessor: "reject",
        },
        {
            Header: "Comment",
            accessor: "comment",
        },
    ]
  return (
    <div className="container mx-auto px-10">
        
        <h1 className='font-bold p-5'>VERIFICATION</h1>
            < ToastContainer />
            <div className='p-8 rounded-xl bg-zinc-100 border'>
                <div>
                    <Table columns={columns} data={rowdata}  pageSizeOptions = {[1,2,4, 6]}  />
                </div>
            </div>
    </div>
  );
};
