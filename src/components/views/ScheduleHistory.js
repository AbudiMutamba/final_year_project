import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate, useOutletContext, Link } from "react-router-dom";
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function ScheduleHistory() {
    const [rowdata, setRowData] = useState([]);
    const [del , setDel] = useState({});
    // const [profile] = useOutletContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect( () =>{
        let getData = async () => {
            let { data, error } = await supabase.from('tasks').select('id, created_at, title, deadline, assigned_person')
            // console.log(data)
            setRowData (data)
        }
        getData()
        // let mySubscription = supabase
        // .from('tasks')
        // .on('DELETE', payload => {
        //     console.log('Change received!', payload)
        // })
        // .subscribe()
        // return () => mySubscription
    },[])
    

    const handleEdit = (value) => {
        const from = location.state?.from?.pathname || `/edittask/${value}`;
        navigate(from, { replace: true });

    }
    const handleDelete = async(value) => {
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
        // {
        //     Header: "Name",
        //     accessor: "name",
        // },
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
                            <button onClick={() => handleEdit(value)} className="text-black px-2" >Edit</button>
                            <button onClick={() => handleDelete(value)} className="text-black" >Delete</button>
                        </div>
                )
            }            
        },
        
    ]
  return (
    <div className="container  mx-auto px-10">
        
        <h1 className='font-bold p-5'>SCHEDULE HISTORY</h1>
            < ToastContainer />
            <div>
                    <Table columns={columns} data={rowdata} />
            </div>
    </div>
  );
};
