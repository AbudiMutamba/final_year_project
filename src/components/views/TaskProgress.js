import React, {useState} from "react";
import Table from '../helpers/Table'
import { Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
// import supabase from "./helpers/supabase";
// import { useAuth } from "./hooks/useAuth";


export default function TaskProgress() {
	const [rowdata, setRowData] = useState([]);
	// const { user } = useAuth();
	// React.useEffect(() => {
	// 	document.title = `${document.title} - Dashboard`;
	// }, []);
  
    const columns = [
       
        {
            Header: "Name",
            accessor: "name",
        },
        
    ]

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "First dataset",
            data: [33, 53, 85, 41, 44, 65],
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "#40B5AD"
          }
        ]
      };
      
	return (
		<section className="px-10">
			<header>
				<h1 className='font-bold p-5' >TASK PROGRESS</h1>
			</header>
			<main className="grid gap-4 grid-cols-2 py-10">
				<div className="py-8 rounded-xl bg-white border">
                <Table columns={columns} data={rowdata} />
				</div>
				<div>
                    
                    <Doughnut data={data} responsive={true} />
				</div>
			</main>
		</section>
	);
}

