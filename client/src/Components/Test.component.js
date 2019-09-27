import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Test = ()=>{
    const [loaded,setLoaded] = useState(false);
    const [easyQuestions,setEasyQuestions] = useState([]);
    const [mediumQuestions,setMediumQuestions] = useState([]);
    const [hardQuestions,setHardQuestions] = useState([]);
    const [totalQuestions,setTotalQuestions] = useState(0);
    const [rightQuestions,setRightQuestions] = useState(0);
    const [percentage,setPercentage] = useState(0);
    const [started,setStarted] = useState(false);
    const[currentQuestion,setCurrentQuestion] = useState(null);
    const [currentAnswer,setCurrentAnswer] = useState('');
    const [currentOptions,setCurrentOptions] = useState([]);
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

    const startTest = ()=>{
        setStarted(true);
        getQuestion()
    }

    const getQuestion = ()=>{
        setTotalQuestions(totalQuestions+1)
    }

    useEffect(()=>{
        if(loaded){
            if(percentage<35){
                const random = Math.floor(Math.random()*easyQuestions.length);
                const question = easyQuestions[random];
                setCurrentQuestion(question);
                setEasyQuestions(easyQuestions.filter(thisquestion=>thisquestion!==question));
            }
            else if(percentage>66){
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
    },[percentage,loaded])

    useEffect(()=>{
        if(currentQuestion!==null){
            var currentOptions = currentQuestion.options;
            var options = []
            for(var i=4; i>=1; i--){
                const random = Math.floor(Math.random()*i);
                options[i-1]=currentOptions[random];
                currentOptions.splice(random,1)
            }
            setCurrentAnswer(options[0]);
            setCurrentOptions(options);
        }
            
    },[currentQuestion])


    const handleAnswerChange = e=>{setCurrentAnswer(e.target.value); console.log(currentAnswer)}

    const nextQuestion = e=>{
        e.preventDefault();
        if(currentAnswer===currentQuestion.answer){
            setRightQuestions(rightQuestions+1);
            getQuestion();
        }
        else
            getQuestion();
    }
    

    useEffect(()=>{
        setPercentage(rightQuestions/(totalQuestions-1)*100);
    },[rightQuestions,totalQuestions])

    const loadPage = ()=>{
        if(loaded && !started){
            return(
                <React.Fragment>
                    <h1>Press button to start</h1>
                    <button onClick={()=>startTest()}>Start Test</button>
                </React.Fragment>
            );
        }
        else if(loaded && started){
            return(
                <React.Fragment>
                    <h3>Question no:{totalQuestions}</h3>
                    <h3>Current Score: {rightQuestions}</h3>
                    <h3>percentage: {percentage}</h3>
                    <h3>difficulty: {currentQuestion.difficulty}</h3>
                    {currentQuestion.text}
                    <form onSubmit={nextQuestion}>
                        {currentOptions.map(option=>{
                            return (<React.Fragment>
                                <input type="radio" name="ans" onChange={handleAnswerChange} value={option}/>{option}
                                </React.Fragment>
                                );
                        })}
                        <input type="submit" ></input>
                    </form>
                </React.Fragment>
            )
        }
    }

    return(
        <React.Fragment>
            {loadPage()}
        </React.Fragment>
    );
}

export default Test;