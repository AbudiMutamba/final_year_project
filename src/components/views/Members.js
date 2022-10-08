import React, { useState, useEffect} from 'react'
import Table from '../helpers/Table'
import { supabase } from "../helpers/supabase";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../auth/AuthContext";

export default function Members() {
    const [rowdata, setRowData] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const {Invite} = useAuth() 
   
	useEffect( () => {
        let getUser = async () => {
            let { data, error } = await supabase.from('profiles').select('username, email, roles, telephone, address').eq('roles', 'member')
            // console.log("data is", data)
             if(error) throw error
             setRowData(data)
        }
        getUser()
	}, []);
    



    const columns = [
    
        {
            Header: "Name",
            accessor: "username",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Role",
            accessor: "roles",
        },
        {
            Header: "Telephone",
            accessor: "telephone",
        },
        {
            Header: "Address",
            accessor: "address",
        },
        
    ]
  return (
    <div className="container  mx-auto px-10">
        
        <h1 className='font-bold p-5'>MEMBERS LIST</h1>  
            <div>
                    <Table columns={columns} data={rowdata} />
            </div>
    </div>
  );
};

