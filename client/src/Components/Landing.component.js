import React,{useState,useEffect} from 'react';
import LandingForm from './LandingForm.component';
import './css/Landing.css'

const Landing = props=>{
    // Load the page only if this is true
    const [loaded,setLoaded] = useState(false);
    
    // Check if the user is already logged in, if not set loaded to true else redirect the user
    useEffect(()=>{
        const username = sessionStorage.getItem('username');
        if(username!==null)
            window.location = '/home';
        else{
            const email = props.location.pathname.substring(1);
            if(email==='')
                setLoaded(true);
            else{
                sessionStorage.setItem('username',email);
                sessionStorage.setItem('role','student');
                window.location='/home';
            }
        }  
    },[])

    // Load the page is loaded is true (if user is not logged in)
    const loadPage = ()=>{
        if(loaded){
            return(
                <React.Fragment>
                    <LandingForm />
                </React.Fragment>
            );
        }
    }

    return(
        <div id="landingPage" className="text-center">
            {loadPage()}
        </div>
    );
}

export default Landing;