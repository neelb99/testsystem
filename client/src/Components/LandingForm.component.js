import React,{useState} from 'react';
import axios from 'axios';

const Landingform = ()=>{
    // To switch between login and register forms
    const [formType, setFormType] = useState('login');
    // To get the current value of username and password from the form
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    // To display errors based on the response from the server
    const [error,setError] = useState('');
    const [displayError, setDisplayError] = useState('none');

    // Update username and password on change
    const onChangeUsername = e=>{
        setUsername(e.target.value);
    }

    const onChangePassword = e=>{
        setPassword(e.target.value);
    }

    // Method to be executed when the user tries to login, sends a post request to server and performs actions based on response (check userRouter)
    const login = e=>{
        e.preventDefault();
        setError('');
        setDisplayError('none');
        const user = {
            username: username,
            password : password
        }
        axios.post('/api/users/login',user)
            .then(res=>{
                // if the user does not exist
                if(res.data===null){
                    setDisplayError('block');
                    setError("User not found!");
                }
                // if the password is wrong
                else if(res.data==="wrong"){
                    setDisplayError('block');
                    setError("Incorrect Password")
                }
                // if there is another error
                else if(res.data==="error"){
                    setDisplayError('block');
                    setError("Error");
                }
                // if username and password match
                else{
                    sessionStorage.setItem('username',res.data.username);
                    window.location = '/home';
                }
            })
            .catch(()=>console.log("error"));
    }

    // Method to be executed when the user tries to register, sends a post request to server and performs actions based on response (check userRouter)
    const register = e=>{
        e.preventDefault();
        setError('');
        setDisplayError('none');
        const user = {
            username: username,
            password : password
        }
        axios.post('/api/users/register',user)
            .then(res=>{
                // if username already exists
                if(res.data==="found"){
                    setDisplayError('block');
                    setError("User Already Exists!");
                }
                // if any other error 
                else if(res.data==="error"){
                    setDisplayError('block');
                    setError("Error");
                }
                // if registration is successful
                else{
                    sessionStorage.setItem('username',res.data.username);
                    window.location = '/home';
                }
            })
            .catch(()=>console.log("error"));
    }
    
    // Method to generate either login or register form based on formType
    const getForm = ()=>{
        if(formType==='login'){
            return(
                <form onSubmit={login}>
                    <h1>Login</h1>
                    Username: <input type="text" value={username} onChange={onChangeUsername}></input>
                    Password: <input type="password" value={password} onChange={onChangePassword}></input>
                    <input type="submit"></input>
                </form>
            );
        }
        else
            return(
                <form onSubmit={register}>
                    <h1>Register</h1>
                    Username: <input type="text" value={username} onChange={onChangeUsername}></input>
                    Password: <input type="password" value={password} onChange={onChangePassword}></input>
                    <input type="submit"></input>
                </form>
            );
    }

    // Styling for error 
    const errorStyle = {
        display: displayError,
        color: 'red'
    }

    return(
        <React.Fragment>
            <button onClick={()=>{setFormType('login'); setDisplayError('none')}}>Login</button>
            <button onClick={()=>{setFormType('Register'); setDisplayError('none')}}>Register</button>
            <p style={errorStyle}>{error}</p>
            {getForm()}
        </React.Fragment>
    );
}

export default Landingform;