import React,{useState,useEffect} from 'react';
import axios from 'axios';

const ViewReports = props=>{
    const [loaded,setLoaded] = useState(false);
    const [reports,setReports] = useState([]);

    useEffect(()=>{
        const username = sessionStorage.getItem('username');
        const urlname = props.location.pathname.substring(13);
        const role = sessionStorage.getItem('role');
        if(username===null)
            window.location='/';
        else if(username!==urlname && role!=="admin")
            window.location='/';
        else{
            axios.get('/api/reports/view/'+username)
                .then(res=>{
                    setReports(res.data)
                    setLoaded(true);
                })
        }
    },[])

    const loadPage = ()=>{
        if(loaded){
            return(
                <React.Fragment>
                    {reports.map(report=>{
                        return(
                            <div key={report._id}>
                                <h4>Score:{report.score}</h4>
                                <h4>Suggestion:{report.suggestion}</h4>
                                <h4>Date: {report.date}</h4>
                            </div>
                        );
                    })}
                </React.Fragment>
            );
        }
    }

    return(
        <React.Fragment>
            {loadPage()}
        </React.Fragment>
    )
}

export default ViewReports;