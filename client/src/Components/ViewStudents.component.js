import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './css/ViewStudents.css';
import Logout from './Logout.component';
import Back from './Back.component';

const ViewStudents = ()=>{
    // List of students
    const [students,setStudents] = useState([]);
    // Check if loaded
    const [loaded,setLoaded] = useState(false);

    // Checks if user is logged in and if user is admin
    useEffect(()=>{
        const username = sessionStorage.getItem('username');
        const role = sessionStorage.getItem('role');
        if(username===null)
            window.location='/';
        else if(role!=="admin")
            window.location = '/home';
        axios.get('/api/users/view')
            .then(res=>{
                setStudents(res.data);
                setLoaded(true);
            })
    },[])

    // Redirects to page to view that user's reports
    const viewStudent = name=>{
        window.location = '/viewreports/'+name;
    }

    // Deletes student from the database
    const deleteStudent = id=>{
        axios.get('/api/users/delete/'+id)
            .then(res=>{
                if(res.data==="deleted"){
                    setStudents(students.filter(student=>student._id!==id));
                }
            })
    }

    // Generates the table of users from DB
    const generateTable = ()=>{
        if(loaded){
            return (
                <React.Fragment>
                <Logout />
                <Back />
                <table className="table table-dark text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>View</th>
                            <th>Delete</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student=>{
                            return(
                                <tr key={student._id}>
                                    <td>{student.username}</td>
                                    <td><button className="btn btn-primary" onClick = {()=>viewStudent(student.username)}>View</button></td>
                                    <td><button className= "btn btn-danger" onClick = {()=>deleteStudent(student._id)}>Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </React.Fragment>
            );
        }
    }

    return(
        <div id="viewstudents">
            {generateTable()}
        </div>
    );
}

export default ViewStudents;