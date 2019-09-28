import React from 'react';
import img from '../images/logout.png'
import './css/nav.css';

const Logout = ()=>{
    
    const handleClick = ()=>{
        sessionStorage.removeItem('username');
        window.location='/';
        sessionStorage.removeItem('role');
    }

    return(
        <a href="#" id="logout"><img width="34px" height="34px" onClick = {handleClick} src={img}></img></a>
    );
}

export default Logout;