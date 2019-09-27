import React,{useState,useEffect} from 'react';
import axios from 'axios'

const AddQuestion = ()=>{
    const [loaded,setLoaded] = useState(false);
    const [questions,setQuestions] = useState([]);
    const[text,setText] = useState('');
    const[answer,setAnswer] = useState('');
    const [option2,setOption2] = useState('');
    const [option3,setOption3] = useState('');
    const [option4,setOption4] = useState('');
    const [difficulty,setDifficulty] = useState('Easy');
    const [tag,setTag] = useState('');
    const [display,setDisplay] = useState('none');
    const [check,setCheck] = useState(false);
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

    const onChangeText = e=>{setText(e.target.value)}
    const onChangeAnswer = e=>{setAnswer(e.target.value)}
    const onChangeOption2 = e=>{setOption2(e.target.value)}
    const onChangeOption3 = e=>{setOption3(e.target.value)}
    const onChangeOption4 = e=>{setOption4(e.target.value)}
    const onChangeTag = e=>{setTag(e.target.value)}
    const onChangeDifficulty = e=>{setDifficulty(e.target.value)}

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
        console.log(question);
        axios.post('/api/questions/add',question)
            .then(res=>{
                console.log(res.data);
                setCheck(!check);
                setDisplay('block')
            })
    }

    const addForm = ()=>{
        return(
            <form onSubmit={newQuestion}>
                Question: <textarea required value={text} onChange={onChangeText}></textarea>
                Answer: <input required type = "text" value={answer} onChange={onChangeAnswer}></input>
                Option 2: <input required type = "text" value={option2} onChange={onChangeOption2}></input>
                Option 3: <input required type = "text" value={option3} onChange={onChangeOption3}></input>
                Option 4: <input required type = "text" value={option4} onChange={onChangeOption4}></input>
                Tag: <input required type="text" value={tag} onChange={onChangeTag}></input>
                Difficulty: 
                <select onChange={onChangeDifficulty}>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
                <input type="submit"></input>
            </form>
        );
    }

    const deleteQuestion = id=>{
        axios.get('/api/questions/delete/'+id)
            .then(()=>{setCheck(!check)})
    }

    const loadPage = ()=>{
        if(loaded){
            return(
                <React.Fragment>
                    {addForm()}
                    <table>
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
                            {questions.map((question,key)=>{
                                return(
                                    <tr key={key}>
                                        <td>{question.text}</td>
                                        <td>{question.answer}</td>
                                        <td>{question.difficulty}</td>
                                        <td>{question.tag}</td>
                                        <td><button onClick={()=>deleteQuestion(question._id)}>Delete</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </React.Fragment>
            );
        }
    }

    const style={
        display: display,
        color:"green"
    }

    return(
        <React.Fragment>
            <p style={style}>Question Added</p>
            {loadPage()}
        </React.Fragment>
    );

}

export default AddQuestion;