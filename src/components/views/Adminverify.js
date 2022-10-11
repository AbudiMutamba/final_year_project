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
            let { data, error } = await supabase.from('tasks').select('id, seen_by_employee, comments, title, created_at, status, remarks')
             setRowData (data)
        }
        getData()
    },[])  

    const handleVeiw =  async (value) => {
        // console.log(values)
        const from = location.state?.from?.pathname || `/verify/${value}`;
        navigate(from, { replace: true });
            
      
    }
    const handleEdit =  async (value) => {
        // console.log(values)
        const from = location.state?.from?.pathname || `/verify/${value}`;
        navigate(from, { replace: true });
            
      
    }

    const columns = [
        {
            Header: "Date",
            accessor: "created_at",
        },

        {
            Header: "Title",
            accessor: "title",
        },
        
        {
            Header: "Action",
            accessor: "id",
            Cell: ({value}) => {
                return(
                        <div>
                            <button onClick={() => handleVeiw(value)} className="text-black px-2 ">Veiw</button>
                            <button onClick={() => handleEdit(value)} className="text-black" >Edit</button>
                        </div>
                )
            } 
        },
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
        
        <h1 className='font-bold p-5'>VERIFICATION</h1>
            < ToastContainer />
            <div>
                <Table columns={columns} data={rowdata}/>
            </div>
           
    </div>
  );
};
