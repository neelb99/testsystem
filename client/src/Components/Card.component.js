import React from 'react';

const Card = props=>{

    // Returns cards for the dashboard

    const handleClick = ()=>{
        window.location = props.link;
    }
    return(
        <div className="col-md-4 col-12 text-center homecard">
            <div className="jumbotron" >
                    <img alt={props.buttonText} width = '150px' height = '150px' src={props.img}></img>
                    <button onClick={handleClick} className="btn btn-dark">{props.buttonText}</button>
            </div>
        </div>
    );
}

export default Card;