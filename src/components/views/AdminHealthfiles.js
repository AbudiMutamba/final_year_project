import React, {useEffect, useState} from 'react'
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { triggerBase64Download } from 'common-base64-downloader-react';

export default function AdminHealthfiles() {
   const [rowdata, setRowData] = useState([]);

   useEffect ( () => {
    let getData = async () => {
        let { data, error } = await supabase.from('health_form').select('id, user_name, proof, created_at')
        // console.log(data) 
        setRowData (data)
    }
    getData()

    },[]) 

    const handleVeiw = async (value) => {
        // console.log(value)
        // const { data, error } = await supabase
        // .storage
        // .from('health-pdf')
        // .download(value)
        // if (error){
        //     toast.error(error.message, {
        //     position: "top-center"
        // });
        // }else{
        //     toast.success("Success", {
        //     position: "top-center"
        //     });
        // }
        // let base64ToString = Buffer.from(obj, "base64").toString();
        // base64ToString = JSON.parse(base64ToString);
        triggerBase64Download(value, 'my_download_name')
    }
    const columns = [
        {
            Header: "Date",
            accessor: "created_at",
        },

        {
            Header: "Name",
            accessor: "user_name",
        },
        
        {
            Header: "Action",
            accessor: "proof",
            Cell: ({value}) => {
                return(
                        <div>
                            <button onClick={() => handleVeiw(value)} className="text-black px-2 ">Download</button>
                        </div>
                )
            } 
        },
        
    ]
  return (
    <div className="container mx-auto px-2"> 
        <h1 className='font-bold p-5'>MEDICAL FORMS</h1>
            < ToastContainer />
                <div>
                    <Table columns={columns} data={rowdata} />
                </div>

    </div>
  );
};
