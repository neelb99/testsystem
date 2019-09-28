import React,{useState,useEffect} from 'react';
import axios from 'axios';
import ReportCard from './ReportCard.component';
import './css/Reports.css'

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
            axios.get('/api/reports/view/'+urlname)
                .then(res=>{
                    setReports(res.data.reverse())
                    setLoaded(true);
                })
        }
    },[])

    const loadPage = ()=>{
        if(loaded){
            return(
                <React.Fragment>
                    {reports.map((report,index)=>{
                        return(
                            <ReportCard key={report._id} number={reports.length-(index)} score={report.score} suggestion={report.suggestion} date={report.date.substring(0,10)}/>
                        );
                    })}
                </React.Fragment>
            );
        }
    }

    return(
        <div id="reports">
            {loadPage()}
        </div>
    )
}

export default ViewReports;