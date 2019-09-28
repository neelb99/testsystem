import React from 'react';
import img from '../images/back.png'
import './css/nav.css';

// Back button

const Back = ()=>{
    
    const handleClick = ()=>{
        window.location='/home'
    }

    return(
        <a href="#" id="back"><img idth="25px" height="25px" onClick = {handleClick} src={img}></img></a>
    );
}

export default Back;
