import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './css/Leaderboard.css';

const Leaderboard = ()=>{
    const [reports,setReports] = useState([]);
    const [loaded,setLoaded] = useState(false);
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

    const generateTable = ()=>{
        const sorted = reports.sort((a,b)=>b.score-a.score);
        if(loaded){
            return (
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