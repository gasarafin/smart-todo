// src/components/TaskList.js

import { useEffect, useState, useContext } from "react";
import Task from "./Task";
import AuthContext from "../contexts/AuthContext";


function TaskList() {
    const [tasks, setTasks] = useState([]);



   // const  auth  = useContext(AuthContext);
const {user:{username}} = useContext(AuthContext)



   // const userName = username                                      // BUG Placeholder for JWT Token




    
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(`http://localhost:8080/api/usertask/${username}`);
            if (response.ok) {
                setTasks(await response.json());
            } else {
                setTasks([]);
            }
        };
        fetchTasks();

    });


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