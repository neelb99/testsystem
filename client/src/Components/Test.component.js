import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Test = ()=>{
    const [loaded,setLoaded] = useState(false);
    const [easyQuestions,setEasyQuestions] = useState([]);
    const [mediumQuestions,setMediumQuestions] = useState([]);
    const [hardQuestions,setHardQuestions] = useState([]);
    const [scoreArray, setScoreArray] = useState([0,0])
    const [percentageArray,setPercentageArray] = useState([0],false);
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
    }

    useEffect(()=>{
        if(loaded){
            if(percentageArray[0]<35){
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


    const handleAnswerChange = e=>{setCurrentAnswer(e.target.value)}

    const nextQuestion = e=>{
        e.preventDefault();
        if(scoreArray[0]===19){
            var percentage=0;
            if(currentQuestion.answer===currentAnswer){
                percentage = (scoreArray[1]+1)*100/(scoreArray[0]+1);
            }
            else
                percentage = (scoreArray[1]*100)/scoreArray[0]+1;
            const newReport = {
                user: sessionStorage.getItem('username'),
                score: percentage,
                date: new Date(),
                suggestion: "abc"
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
            }
            else
                setScoreArray([scoreArray[0]+1,scoreArray[1]])
        }
    }

    

    useEffect(()=>{
        setPercentageArray([scoreArray[1]/scoreArray[0]*100,!percentageArray[1]]);
    },[scoreArray])

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
                    <h3>Question no:{scoreArray[0]+1}</h3>
                    <h3>Current Score: {scoreArray[1]}</h3>
                    <h3>percentage: {percentageArray[0]}</h3>
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