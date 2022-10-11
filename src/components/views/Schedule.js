import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';




export default function Schedule () {
    const [rowdata, setRowData] = useState([]);
    const [profile] = useOutletContext()
    const location = useLocation();
    const navigate = useNavigate();
    

    useEffect ( () => {
        let getData = async () => {
            let { data, error } = await supabase.from('tasks').select('id,created_at, title, deadline, status').eq('assigned_person', profile.id)
            setRowData (data)
        }
        getData()
    },[])  
   
    const handleVeiw = (value) => {
        const from = location.state?.from?.pathname || `/veiw/${value}`;
        navigate(from, { replace: true });

    }

    const handleAccept = async(value) => {
        const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', value)
        if (error){
            toast.error(error.message, {
            position: "top-center"
        });
        }else {
            toast.success("Deleted", {
            position: "top-center"
        });
        // setDel({...del, value})setRowData(
             setRowData([...rowdata], value)
    }
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
            Header: "Deadline",
            accessor: "deadline",
        },
        {
            Header: "Action", 
            accessor: "id",
            Cell: ({value}) => {
                return(
                        <div>
                            <button onClick={() => handleVeiw(value)} className="text-black px-2 ">Veiw</button>
                            <button onClick={() => handleAccept(value)} className="text-black" >Edit</button>
                        </div>
                )
            }            
        },
        {
            Header: "Status",
            accessor: "status",
        },
      
    ]
  return (
    <div className="container mx-auto px-2">
        <h1 className='font-bold p-5'>WORK SCHEDULE</h1>
            < ToastContainer />
                <div>
                    <Table columns={columns} data={rowdata}/>
                </div>
    </div>
  );
};
