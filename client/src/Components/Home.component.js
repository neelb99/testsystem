import React,{useState,useEffect} from 'react';
import Card from './Card.component';
import './css/Dashboard.css';
import report from '../images/report.png';
import star from '../images/star.png';
import exam from '../images/exam.png'

const Home = ()=>{
    const [loaded,setLoaded] = useState(false);
    const role = sessionStorage.getItem('role');
    const username = sessionStorage.getItem('username');
    useEffect(()=>{
        
        if(username===null)
            window.location='/';
        else
            setLoaded(true);
        
    },[])

    const loadPage = ()=>{
        if(loaded){
            if(role === "admin"){
                return(
                    <React.Fragment>
                        <a href='/viewstudents'>View Students</a><br />
                        <a href='/leaderboard'>Leaderboard</a><br />
                        <a href='/addquestion'>Manage Questions</a>
                    </React.Fragment>
                );
            }
            else{
                return(
                    <React.Fragment>
                        <Card img={exam} link="/test" buttonText="Take Test"/>
                        <Card img={star} link="/leaderboard" buttonText="Leaderboard"/>
                        <Card img={report} link= {"/viewreports"+username} buttonText="Previous Reports"/>
                    </React.Fragment>
                );
            }
        }
    }

    return(
        <div id="dashboard">
            {loadPage()}
        </div>
    );

}

export default Home;