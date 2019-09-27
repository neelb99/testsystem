import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Leaderboard = ()=>{
    const [students,setStudents] = useState([]);
    const [loaded,setLoaded] = useState(false);
    useEffect(()=>{
        const username = sessionStorage.getItem('username');
        if(username===null)
            window.location='/';
        axios.get('/api/users/view')
            .then(res=>{
                setStudents(res.data.filter(item=>item.role!=="admin"));
                setLoaded(true);
            })
    },[])

    const generateTable = ()=>{
        const sorted = students.sort((a,b)=>b.maxScore-a.maxScore);
        if(loaded){
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Max Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map(student=>{
                            return(
                                <tr key={student._id}>
                                    <td>{student.username}</td>
                                    <td>{student.maxScore}</td>
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

export default Leaderboard;