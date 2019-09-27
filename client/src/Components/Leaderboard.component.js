import React,{useState,useEffect} from 'react';
import axios from 'axios';

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
                <table>
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
        <React.Fragment>
            {generateTable()}
        </React.Fragment>
    );
}

export default Leaderboard;