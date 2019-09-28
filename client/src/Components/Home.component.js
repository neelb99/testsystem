import React,{useState,useEffect} from 'react';
import Card from './Card.component';
import './css/Dashboard.css';
import report from '../images/report.png';
import star from '../images/star.png';
import exam from '../images/exam.png';
import student from '../images/student.png';
import question from '../images/question.png';
import Logout from './Logout.component';

const Home = ()=>{
    // Checks if loaded
    const [loaded,setLoaded] = useState(false);
    // gets user's role
    const role = sessionStorage.getItem('role');
    // gets user's username
    const username = sessionStorage.getItem('username');

    // checks if user is logged in
    useEffect(()=>{
        
        if(username===null)
            window.location='/';
        else
            setLoaded(true);
        
    },[])

    // Loads dashboard based on if user is student or admin
    const loadPage = ()=>{
        if(loaded){
            if(role === "admin"){
                return(
                    <React.Fragment>
                        <Logout />
                        <Card img={student} link="/viewstudents" buttonText="Manage Students"/>
                        <Card img={star} link="/leaderboard" buttonText="Leaderboard"/>
                        <Card img={question} link= "/addquestion" buttonText="Add Question"/>
                    </React.Fragment>
                );
            }
            else{
                return(
                    <React.Fragment>
                        <Logout />
                        <Card img={exam} link="/test" buttonText="Take Test"/>
                        <Card img={star} link="/leaderboard" buttonText="Leaderboard"/>
                        <Card img={report} link= {"/viewreports/"+username} buttonText="Previous Reports"/>
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