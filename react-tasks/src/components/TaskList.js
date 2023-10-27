// src/components/TaskList.js

import { useEffect, useState, useContext } from "react";
import Task from "./Task";
import AuthContext from "../contexts/AuthContext";


function TaskList() {
    const [tasks, setTasks] = useState([]);



   // const  auth  = useContext(AuthContext);
const {user} = useContext(AuthContext)

    console.log(user)

    const userName = 'john@smith.com'                                       // BUG Placeholder for JWT Token




    
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(`http://localhost:8080/api/usertask/${userName}`);
            if (response.ok) {
                setTasks(await response.json());
            } else {
                setTasks([]);
            }
        };
        fetchTasks();

    }, []);


    return (
        <>
            {tasks.length === 0 ?
                <div className="alert alert-warning py-4">
                    You have not added any tasks.
                </div>
                : <Task functions={[tasks, setTasks]} />}
        </>
    );
};
export default TaskList;