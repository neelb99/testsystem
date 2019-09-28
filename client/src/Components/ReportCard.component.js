import React from 'react';

const ReportCard = props=>{

    return(
        <div className="col-md-4 col-10 offset-1 offset-md-0 text-left  homecard">
            <div className="jumbotron">
                    <h3 className="text-center ">Result #{props.number}</h3>
                    <h4><b>Score: </b>{props.score}</h4>
                    <h4><b>Suggestion: </b>{props.suggestion}</h4>
                    <h4><b>Date: </b>{props.date}</h4>
            </div>
        </div>
    );
}

export default ReportCard;