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
            let { data, error } = await supabase.from('assign_task').select('id,createdat, title, deadline').eq('assignedPerson', profile.id)
            setRowData (data)
            console.log(data);
        }
        getData()
    },[])  
   

    const handleView =  async (value) => {
        // console.log(values)
        const from = location.state?.from?.pathname || `/veiw/${value}`;
        navigate(from, { replace: true });
            // let { data, error } = await supabase
            // .from('attendence')
            // .select('location')
            // .match()
      
    }
    const handleFinished =  async () => {
        // console.log(values)
        const from = location.state?.from?.pathname || '';
        navigate(from, { replace: true });
            // let { data, error } = await supabase
            // .from('attendence')
            // .select('location')
            // .match()
      
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
        {
            Header: "Deadline",
            accessor: "deadline",
        },
        {
            Header: "Veiw",
            accessor: "id",
            Cell: ({value}) => <button onClick={() => handleView(value)} className="text-black" >Veiw</button>
            // Cell: ({value}) => (<button onClick={this.editRow({value})}>Edit</button>)
        },
        {
            Header: "Finished",
            accessor: "finished",
            Cell: ({value}) => <input type="checkbox"onClick={() => handleFinished(value)} className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
            // Cell: ({value}) => (<button onClick={this.editRow({value})}>Edit</button>)
        },
    ]
  return (
    <div className="container mx-auto px-10">
        <h1 className='font-bold p-5'>WORK SCHEDULE</h1>
            < ToastContainer />
                <div>
                    <Table columns={columns} data={rowdata}/>
                </div>
    </div>
  );
};
