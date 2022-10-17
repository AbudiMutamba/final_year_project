import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useOutletContext } from 'react-router-dom'
import { triggerBase64Download } from 'common-base64-downloader-react';

export default function MyAudio() {
    const [rowdata, setRowData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [ profile] = useOutletContext();
    

    useEffect ( () => {
        let getData = async () => {
            let { data, error } = await supabase.from('tasks').select('created_at, title, voice_note,  assigned_person, id').eq('assigned_person', profile.id)
            // console.log(data)
            setRowData (data)
        
        }
        getData()
    },[])  
    const handleSubmit =  async (value) => {
        console.log(value)
        const from = location.state?.from?.pathname || `/listen/${value}`;
        navigate(from, { replace: true });
        //     // let { data, error } = await supabase
        //     // .from('attendence')
        //     // .select('location')
        //     // .match()
        // triggerBase64Download(value, 'my_download_name')
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
            Header: "Listen",
            accessor: "voice_note",
            Cell: ({value}) => <button onClick={() => handleSubmit(value)} className="text-black" >Listen</button>
        },
    ]
  return (
    <div className="container mx-auto px-10">
        <h1 className='font-bold p-5'>AUDIO TASKS</h1>
            < ToastContainer />
                <div>
                    <Table columns={columns} data={rowdata}/>
                </div>
    </div>
  );
};
