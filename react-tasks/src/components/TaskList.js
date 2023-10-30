// src/components/TaskList.js

import { useEffect, useState, useContext } from "react";

import Task from "./Task";
import AuthContext from "../contexts/AuthContext";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [renderTasks, setRenderTasks] = useState('initial');

    const { user: { username } } = useContext(AuthContext);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(`http://localhost:8080/api/usertask/${username}`);

            if (response.ok) {
                const taskResponse = await response.json()
                setTasks(taskResponse);
                taskResponse.length === 0 ? setRenderTasks('fetchEmpty') : setRenderTasks('fetchTasks');
            } else {
                setRenderTasks('fetchError')
            };
        };
        fetchTasks();

    }, [username]);


    return (
        <div className="container my-4">
            <h2 className="text-center mb-2">Task Lists</h2>
            {renderTasks === 'initial'
                ? <div className="alert alert-info py-4">
                    Fetching your tasks - Please wait.
                  </div>
            : renderTasks === 'fetchEmpty'
                ? <div className="alert alert-warning py-4">
                    You have not added any tasks.
                  </div>
            : renderTasks === 'fetchTasks'
                ? <Task functions={[tasks, setTasks]} />
            : renderTasks === 'fetchError'
                ? <div className="alert alert-danger py-4">
                    Fetch failed.
                  </div>
                : <div className="alert alert-danger py-4">
                    Error.
                  </div>
            }
        </div>
    );
};

export default TaskList;