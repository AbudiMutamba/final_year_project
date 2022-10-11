
import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'
import { toast, ToastContainer } from 'react-toastify';


export default function MyTasks() {
    const [rowdata, setRowData] = useState([]);
    const [profile] = useOutletContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect( () =>{
        let getData = async () => {
            let { data, error } = await supabase.from('my_tasks').select('id, created_at, title, description').eq('username', profile.id)
            setRowData (data)
        }
        getData()
    },[])
    
    const handleEdit = (value) => {
        const from = location.state?.from?.pathname || `/task/${value}`;
        navigate(from, { replace: true });
    }
    const handleDelete = async (value) => {
        const { data, error } = await supabase
        .from('my_tasks')
        .delete()
        .eq('id', value)
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
            Header: "Title",
            accessor: "title",
        },
        {
            Header: "Action",
            accessor: "id",
            Cell: ({value}) => {
                return(
                        <div>
                            <button onClick={() => handleEdit(value)} className="text-black px-2" >Edit</button>
                            <button onClick={() => handleDelete(value)} className="text-black" >Delete</button>
                        </div>
                )
            }  
        },

        
    ]

  return (
    <div className="container  mx-auto px-10">

        <ToastContainer/>
        <h1 className='font-bold p-5'>MY TASKS</h1>
            <div>
                <Table columns={columns} data={rowdata} />
            </div>
        
    </div>
  );
};
