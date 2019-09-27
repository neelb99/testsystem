import React,{useState, useEffect} from 'react';
import axios from 'axios';

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

    const viewStudent = id=>{
        window.location = '/students/'+id;
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
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Max Score</th>
                            <th>View</th>
                            <th>Delete</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student=>{
                            return(
                                <tr key={student._id}>
                                    <td>{student.username}</td>
                                    <td>{student.maxScore}</td>
                                    <td><button onClick = {()=>viewStudent(student._id)}>View</button></td>
                                    <td><button onClick = {()=>deleteStudent(student._id)}>Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        }
    }

    return(
        <React.Fragment>
            {generateTable()}
        </React.Fragment>
    );
}

export default ViewStudents;