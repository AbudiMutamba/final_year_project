
import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'


export default function MyTasks() {
    const [rowdata, setRowData] = useState([]);
    const [profile] = useOutletContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect( () =>{
        // let getData = async () => {
        //     let { data, error } = await supabase.from('my_tasks').select('createdat, title').eq('username', profile.id)
        //     setRowData (data)
        // }
        // getData()
    },[])
    
    const handleEdit = (value) => {
        console.log(value)
        const from = location.state?.from?.pathname || `/edittask/${value}`;
        navigate(from, { replace: true });
    }
    const handleDelete = () => {
        
    }
    
    const columns = [
    
        {
            Header: "Date",
            accessor: "createdat",
        },
        {
            Header: "Title",
            accessor: "title",
        },
        // {
        //     Header: "Audio",
        //     accessor: "audio",
        // },
        // {
        //     Header: "Status",
        //     accessor: "status",
        // },
        {
            Header: "Edit",
            accessor: "id",
            Cell: ({value}) => <button onClick={() => handleEdit(value)} className="text-black" >Edit</button>
        },
        {
            Header: "Delete",
            accessor: "delete",
            Cell: ({value}) => <button onClick={() => handleDelete(value)} className="text-black" >Delete</button>
        },
        
    ]

  return (
    <div className="container  mx-auto px-10">
        
        <h1 className='font-bold p-5'>MY TASKS</h1>

            <div>
                <Table columns={columns} data={rowdata} />
            </div>
    </div>
  );
};
