import React,{useState,useEffect} from 'react';
import LandingForm from './LandingForm.component';

const Landing = ()=>{
    // Load the page only if this is true
    const [loaded,setLoaded] = useState(false);
    
    // Check if the user is already logged in, if not set loaded to true else redirect the user
    useEffect(()=>{
        const username = sessionStorage.getItem('username');
        if(username!==null)
            window.location = '/home';
        else
            setLoaded(true);  
    },[])

    // Load the page is loaded is true (if user is not logged in)
    const loadPage = ()=>{
        if(loaded){
            return(
                <React.Fragment>
                    <h1>Welcome</h1>
                    <LandingForm />
                </React.Fragment>
            );
        }
    }

    return(
        <React.Fragment>
            {loadPage()}
        </React.Fragment>
    );
}

export default Landing;