import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './css/Test.css';
import Logout from './Logout.component';
import Back from './Back.component';

const Test = ()=>{
    // Check if loaded
    const [loaded,setLoaded] = useState(false);
    // List of questions with easy difficulty
    const [easyQuestions,setEasyQuestions] = useState([]);
    // List of questions with medium difficulty
    const [mediumQuestions,setMediumQuestions] = useState([]);
    // List of questions with hard difficulty
    const [hardQuestions,setHardQuestions] = useState([]);
    // holds current question number and current number of correct answers
    const [scoreArray, setScoreArray] = useState([0,0])
    // holds current score and a boolean to update state
    const [percentageArray,setPercentageArray] = useState([0],false);
    // checks if test has been started
    const [started,setStarted] = useState(false);
    // Holds the current question
    const[currentQuestion,setCurrentQuestion] = useState(null);
    // Holds the current answer
    const [currentAnswer,setCurrentAnswer] = useState('');
    // Holds the current options
    const [currentOptions,setCurrentOptions] = useState([]);
    // Array of categories of questions that have been answered wrong(Used for suggestions)
    const [wrongCategories, setWrongCategories] = useState([]);

    // Checks if user is logged in and populates questions
    useEffect(()=>{
        const username = sessionStorage.getItem('username');
        if(username===null)
            window.location='/';
        axios.get('/api/questions/view')
            .then(res=>{
                setEasyQuestions(res.data.filter(question=>question.difficulty==="Easy"));
                setMediumQuestions(res.data.filter(question=>question.difficulty==="Medium"));
                setHardQuestions(res.data.filter(question=>question.difficulty==="Hard"));
                setLoaded(true);
            })
    },[])

    // Starts the test
    const startTest = ()=>{
        setStarted(true);
    }

    // Checks the current score and gives the next question based on the score
    useEffect(()=>{
        if(loaded){
            if(percentageArray[0]<33){
                const random = Math.floor(Math.random()*easyQuestions.length);
                const question = easyQuestions[random];
                setCurrentQuestion(question);
                setEasyQuestions(easyQuestions.filter(thisquestion=>thisquestion!==question));
            }
            else if(percentageArray[0]>66){
                const random = Math.floor(Math.random()*hardQuestions.length);
                const question = hardQuestions[random];
                setCurrentQuestion(question);
                setHardQuestions(hardQuestions.filter(thisquestion=>thisquestion!==question));
            }
            else{
                const random = Math.floor(Math.random()*mediumQuestions.length);
                const question = mediumQuestions[random];
                setCurrentQuestion(question);
                setMediumQuestions(mediumQuestions.filter(thisquestion=>thisquestion!==question));
            }
        }
    },[percentageArray,loaded])

    // Gets the options of the current question and shuffles them
    useEffect(()=>{
        if(currentQuestion!==null){
            var currentOptions = currentQuestion.options;
            var options = []
            for(var i=4; i>=1; i--){
                const random = Math.floor(Math.random()*i);
                options[i-1]=currentOptions[random];
                currentOptions.splice(random,1)
            }
            setCurrentOptions(options);
        }
            
    },[currentQuestion])

    // updates answer
    const handleAnswerChange = e=>{setCurrentAnswer(e.target.value)}

    // Generates report if test is over otherwise checks if answer is correct
    const nextQuestion = e=>{
        e.preventDefault();
        if(scoreArray[0]===19){
            var percentage=0;
            var finalWrong = [];
            if(currentQuestion.answer===currentAnswer){
                percentage = (scoreArray[1]+1)*100/(scoreArray[0]+1);
                finalWrong = wrongCategories;
            }
            else{
                percentage = (scoreArray[1]*100)/scoreArray[0]+1;
                finalWrong = [...wrongCategories,currentQuestion.tag]
            }
            var suggestions="";
            if(finalWrong.length>0){
                finalWrong.map(category=>{
                    if(!suggestions.includes(category))
                        suggestions+=category+', ';
                })
            }
            else suggestions = "None!"
            const newReport = {
                user: sessionStorage.getItem('username'),
                score: Math.ceil(percentage),
                date: new Date(),
                suggestion: suggestions.substring(0,suggestions.length-2)
            }
            axios.post('/api/reports/create',newReport)
                .then(res=>{
                    if(res.data==="success"){
                        window.location = '/viewreports/'+sessionStorage.getItem('username');
                    }
                })
        }
        else{
            if(currentAnswer===currentQuestion.answer){
                setScoreArray([scoreArray[0]+1,scoreArray[1]+1])
                setCurrentAnswer('')
            }
            else{
                setScoreArray([scoreArray[0]+1,scoreArray[1]])
                setWrongCategories([...wrongCategories,currentQuestion.tag])
                setCurrentAnswer('')
            }
        }
    }

    // Gives the current score
    const getPercentage = ()=>{
        const ans =percentageArray[0].toFixed(2)
        if(scoreArray[0]==0)
            return 0
        else
            return ans
    }

    // Sets the Score 
    useEffect(()=>{
        setPercentageArray([scoreArray[1]/scoreArray[0]*100,!percentageArray[1]]);
    },[scoreArray])

    // Prints the questions/Introduction based on if the test has been started
    const loadPage = ()=>{
        if(loaded && !started){
            return(
                <React.Fragment>
                <Logout />
                <Back />
                <div className="jumbotron">
                    <h1 className="text-center">Welcome to the test!</h1>
                    <div>
                    <h2 className="text-center">Instructions</h2>
                    <ul>
                        <li>You must answer 20 Multiple Choice Questions.</li>
                        <li>Each question has a difficulty level associated with it.</li>
                        <li>The level of difficulty of the next question depends on your current score.</li>
                        <li>After submitting the test you will be redirected to a report page.</li>
                        <li>On this page you can view your score and suggestions generated by the system.</li>
                    </ul>
                    </div>
                    <button className="btn btn-primary" onClick={()=>startTest()}>Start Test</button>
                </div>
                </React.Fragment>
            );
        }

        else if(loaded && started){
            return(
                <React.Fragment>
                    <Logout />
                    <Back />
                    <div id="testjumbotron">
                        <div id="topdiv">
                        <h4>Difficulty: {currentQuestion.difficulty}</h4>
                        <h4>Score: {getPercentage()}</h4>
                        </div>
                        <div className="jumbotron">
                        <h4>Q.{scoreArray[0]+1}) {currentQuestion.text}</h4><br />
                    <form onSubmit={nextQuestion}>
                        {currentOptions.map((option,index)=>{
                            return (
                                <React.Fragment>
                                    {index+1}) <input required checked={currentAnswer===option} type="radio" name="ans" onChange={handleAnswerChange} value={option}/> {option}<br/><br />
                                </React.Fragment>
                            );
                            
                        })}
                        <input className= "btn btn-success" type="submit" ></input>
                    </form>
                    </div>
                </div>
                </React.Fragment>
            )
        }
    }

    return(
        <div id="test" >
            {loadPage()}
        </div>
    );
}

export default Test;