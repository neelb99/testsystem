import React,{useState,useEffect} from 'react';

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
                        <a href='/test'>Take Test</a><br />
                        <a href='/leaderboard'>Leaderboard</a><br />
                        <a href={'/viewreports/'+username}>Previous Reports</a>
                    </React.Fragment>
                );
            }
        }
    }

    return(
        <React.Fragment>
            {loadPage()}
        </React.Fragment>
    );

}

export default Home;