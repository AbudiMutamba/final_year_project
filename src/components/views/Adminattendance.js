import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Table from '../helpers/Table'
import { supabase } from '../helpers/supabase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export default function Adminattendance() {
    const [rowdata, setRowData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    

    useEffect ( () => {
        let getData = async () => {
            let { data, error } = await supabase.from('attendence').select('username, checkin, checkout, duration, location')
            setRowData (data)
        
        }
        getData()
    },[])  
    const handleSubmit =  async ({lat, lng}) => {
        // console.log(values)
        const from = location.state?.from?.pathname || `/map/${lat}/${lng}`;
        navigate(from, { replace: true });
            // let { data, error } = await supabase
            // .from('attendence')
            // .select('location')
            // .match()
    }
    

    const columns = [
        // {
        //     Header: "Date",
        //     accessor: "date",
        // },
        {
            Header: "Name",
            accessor: "username",
        },
        {
            Header: "Check in",
            accessor: "checkin",
        },
        {
            Header: "Check out",
            accessor: "checkout",
        },
        {
            Header: "Duration",
            accessor: "duration",
        },
        {
            Header: "Location",
            accessor: "location",
            Cell: ({value}) => <button onClick={() => handleSubmit(value)} className="text-black" >Veiw</button>
            // Cell: ({value}) => (<button onClick={this.editRow({value})}>Edit</button>)
        },
    ]
  return (
    <div className="container mx-auto px-10">
        <h1 className='font-bold p-5'>ATTENDANCE</h1>
            < ToastContainer />
                <div>
                    <Table columns={columns} data={rowdata}/>
                </div>
    </div>
  );
};
