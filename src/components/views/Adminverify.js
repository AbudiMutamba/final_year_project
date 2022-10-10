import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



export default function Adminverify() {
   const [rowdata, setRowData] = useState([]);
   const [profile] = useOutletContext()
   const location = useLocation();
    const navigate = useNavigate();
    useEffect ( () => {
        let getData = async () => {
            let { data, error } = await supabase.from('tasks').select('comments, created_at, status, remarks')
             setRowData (data)
        }
        getData()
    },[])  

    const handleVeiw =  async (value) => {
        // console.log(values)
        const from = location.state?.from?.pathname || `/veiw/${value}`;
        navigate(from, { replace: true });
            // let { data, error } = await supabase
            // .from('attendence')
            // .select('location')
            // .match()
      
    }
    const handleAccept =  async (value) => {
        // console.log(values)
        const from = location.state?.from?.pathname || `/veiw/${value}`;
        navigate(from, { replace: true });
            // let { data, error } = await supabase
            // .from('attendence')
            // .select('location')
            // .match()
      
    }
    const handleReject =  async (value) => {
        // console.log(values)
        const from = location.state?.from?.pathname || `/veiw/${value}`;
        navigate(from, { replace: true });
            // let { data, error } = await supabase
            // .from('attendence')
            // .select('location')
            // .match()
      
    }

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
            Header: "Veiw",
            accessor: "veiw",
            Cell: ({value}) => <button onClick={() => handleVeiw(value)} className="text-black" >Veiw</button>
        },
        {
            Header: "Accept",
            accessor: "accept",
            Cell: ({value}) => <input type="checkbox"onClick={() => handleAccept(value)} className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />

        },
        {
            Header: "Reject",
            accessor: "reject",
            Cell: ({value}) => <input type="checkbox"onClick={() => handleReject(value)} className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />

        },
    ]
  return (
    <div className="container mx-auto px-10">
        
        <h1 className='font-bold p-5'>VERIFICATION</h1>
            < ToastContainer />
            <div>
                <Table columns={columns} data={rowdata}  pageSizeOptions = {[1,2,4, 6]}  />
            </div>
           
    </div>
  );
};
