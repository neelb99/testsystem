import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './css/Leaderboard.css';
import Logout from './Logout.component';
import Back from './Back.component';

const Leaderboard = ()=>{
    // List fo reports
    const [reports,setReports] = useState([]);
    // Checks if loaded
    const [loaded,setLoaded] = useState(false);
    // Checks if user is logged in and gets reports
    useEffect(()=>{
        const username = sessionStorage.getItem('username');
        if(username===null)
            window.location='/';
        axios.get('/api/reports/viewall')
            .then(res=>{
                setReports(res.data);
                setLoaded(true);
            })
    },[])

    // Generates leaderboard table
    const generateTable = ()=>{
        const sorted = reports.sort((a,b)=>b.score-a.score);
        if(loaded){
            return (
                <React.Fragment>
                <Logout />
                <Back />
                <table className="table table-dark text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map(report=>{
                            return(
                                <tr key={report._id}>
                                    <td>{report.user}</td>
                                    <td>{report.score.toFixed(2)}</td>
                                    <td>{report.date.substring(0,10)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </React.Fragment>
            );
        }
    }

    return(
        <div id="leaderboard">
            {generateTable()}
        </div>
    );
}

export default Leaderboard;