import React,{useState,useEffect} from 'react';
import axios from 'axios'
import './css/AddQuestion.css'
import Back from './Back.component';
import Logout from './Logout.component';

const AddQuestion = ()=>{
    // Checks if loaded
    const [loaded,setLoaded] = useState(false);
    // List of all questions
    const [questions,setQuestions] = useState([]);
    // State variables for form
    const[text,setText] = useState('');
    const[answer,setAnswer] = useState('');
    const [option2,setOption2] = useState('');
    const [option3,setOption3] = useState('');
    const [option4,setOption4] = useState('');
    const [difficulty,setDifficulty] = useState('Easy');
    const [tag,setTag] = useState('');
    // Displays if question has been added
    const [display,setDisplay] = useState('none');
    // To update the table if question is added or deleted
    const [check,setCheck] = useState(false);

    // Checks if user is logged in and admin, and populates questions
    useEffect(()=>{
        const username = sessionStorage.getItem('username');
        const role = sessionStorage.getItem('role');
        if(username===null)
            window.location='/';
        else if(role!=="admin")
            window.location = '/home';
        else{
            axios.get('/api/questions/view')
                .then(res=>{
                    setQuestions(res.data);
                    setLoaded(true);
                })
        }
    },[check])

    // Form state changes
    const onChangeText = e=>{setText(e.target.value)}
    const onChangeAnswer = e=>{setAnswer(e.target.value)}
    const onChangeOption2 = e=>{setOption2(e.target.value)}
    const onChangeOption3 = e=>{setOption3(e.target.value)}
    const onChangeOption4 = e=>{setOption4(e.target.value)}
    const onChangeTag = e=>{setTag(e.target.value)}
    const onChangeDifficulty = e=>{setDifficulty(e.target.value)}

    // Adds new question to database from form data
    const newQuestion = e=>{
        setDisplay('none');
        e.preventDefault();
        const question = {
            text: text,
            answer: answer,
            options : [answer,option2,option3,option4],
            tag: tag,
            difficulty: difficulty
        }
        axios.post('/api/questions/add',question)
            .then(res=>{
                console.log(res.data);
                setCheck(!check);
                setDisplay('block')
            })
    }

    // Form to add question
    const addForm = ()=>{
        return(
            <div className="jumbotron col-10 offset-1 col-md-6 offset-md-3">
                <h1 className="text-center">Add Question</h1>
                <p className="text-center" style={style}>Question Added</p>
                <form onSubmit={newQuestion} id="addform">
                    <div className="form-group">
                        <textarea className="form-control" placeholder="Question" required value={text} onChange={onChangeText}></textarea>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Answer" required type = "text" value={answer} onChange={onChangeAnswer}></input>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder= "Option 2" required type = "text" value={option2} onChange={onChangeOption2}></input>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Option 3" required type = "text" value={option3} onChange={onChangeOption3}></input>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder= "Option 4" required type = "text" value={option4} onChange={onChangeOption4}></input>
                    </div>
                    <div className="form-group">
                    <input className="form-control" required placeholder="Tag" type="text" value={tag} onChange={onChangeTag}></input>
                    </div>
                    <div className="form-group">
                    <select required className="form-control" onChange={onChangeDifficulty}>
                        <option value="" selected disabled hidden>Difficulty</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                    </div>
                    <div className="form-group">
                        <input className="form-control btn btn-success" type="submit"></input>
                    </div>
                </form>
            </div>
        );
    }

    // Deletes question from database
    const deleteQuestion = id=>{
        axios.get('/api/questions/delete/'+id)
            .then(()=>{setCheck(!check)})
    }

    // Displays the form and table of questions if page is loaded
    const loadPage = ()=>{
        if(loaded){
            return(
                <React.Fragment>
                    <Back />
                    <Logout />
                    {addForm()}
                    <div id="questiontable">
                        <table className="table table-dark text-center">
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th>Difficulty</th>
                                    <th>Tag</th> 
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{question.text}</td>
                                            <td>{question.answer}</td>
                                            <td>{question.difficulty}</td>
                                            <td>{question.tag}</td>
                                            <td><button className="btn btn-danger" onClick={()=>deleteQuestion(question._id)}>Delete</button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            );
        }
    }

    // Used to display if question is added successfully
    const style={
        display: display,
        color:"green"
    }

    return(
        <div id="addquestion">
            {loadPage()}
        </div>
    );

}

export default AddQuestion;