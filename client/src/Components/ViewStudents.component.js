import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './css/ViewStudents.css';

const ViewStudents = ()=>{
    const [students,setStudents] = useState([]);
    const [loaded,setLoaded] = useState(false);
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

    const viewStudent = name=>{
        window.location = '/viewreports/'+name;
    }

    const deleteStudent = id=>{
        axios.get('/api/users/delete/'+id)
            .then(res=>{
                if(res.data==="deleted"){
                    setStudents(students.filter(student=>student._id!==id));
                }
            })
    }

    const generateTable = ()=>{
        if(loaded){
            return (
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