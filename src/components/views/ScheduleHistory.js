import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'


export default function ScheduleHistory() {
    const [rowdata, setRowData] = useState([]);
    const [del , setDel] = useState();
    // const [profile] = useOutletContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect( () =>{
        let getData = async () => {
            let { data, error } = await supabase.from('assign_task').select('id, createdat, title, deadline')
            setRowData (data)
        }
        getData()
    },[])


    const handleEdit = (value) => {
        const from = location.state?.from?.pathname || `/edittask/${value}`;
        navigate(from, { replace: true });
        setDel(value)
    }
    const handleDelete = (value) => {
        console.log(del)
    }
    const columns = [
        {
            Header: "Date",
            accessor: "createdat",
        },
        {
            Header: "Name",
            accessor: "name",
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
            Header: "Edit", 
            id: "id",
            accessor: ({value}) => {
                return(
                        <div>
                            <button onClick={() => handleEdit(value)} className="text-black" >Edit</button>
                            <button onClick={() => handleDelete(value)} className="text-black" >Delete</button>
                        </div>
                )
            }            
        },
        // {
        //     Header: "Delete",
        //     accessor: "delete",
        //     Cell: ({value}) => <button onClick={() => handleDelete(value)} className="text-black" >Delete</button>
        // },
    ]
  return (
    <div className="container  mx-auto px-10">
        
        <h1 className='font-bold p-5'>SCHEDULE HISTORY</h1>

            <div>
                    <Table columns={columns} data={rowdata} />
            </div>
    </div>
  );
};
