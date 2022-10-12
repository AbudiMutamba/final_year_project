import React, {useEffect, useState} from 'react'
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export default function AdminHealthfiles() {
   const [rowdata, setRowData] = useState([]);

   useEffect ( () => {
    let getData = async () => {
        let { data, error } = await supabase.from('health_form').select('id, proof, created_at')
        console.log(data) 
        setRowData (data)
    }
    getData()
    // if (url) downloadImage(url)
},[]) 

    const handleVeiw = async (value) => {
        const { data, error } = await supabase
        .storage
        .from('health-pdf')
        .download(value)
        if (error){
            toast.error(error.message, {
            position: "top-center"
        });
        }else{
            toast.success("Success", {
            position: "top-center"
            });
        }
    }
    const columns = [
        {
            Header: "Date",
            accessor: "created_at",
        },

        {
            Header: "Name",
            accessor: "id",
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
