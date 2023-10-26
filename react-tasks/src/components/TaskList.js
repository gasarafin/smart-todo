// src/components/TaskList.js

import { useEffect, useState } from "react";
import Task from "./Task";

function TaskList() {
    const [tasks, setTasks] = useState([]);



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

    function updatePriority() {
        fetch(`http://localhost:8080/api/priority/list`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tasks),
        })
            .then(res => {
                if (res.ok) {
                } else if (res.status === 400) {
                    return res.json()
                } else if (res.status === 404) {
                } else {
                    return Promise.reject(
                        new Error(`Unexpected status code: ${res.status}`)
                    );
                }
            })
            .catch(console.error);
    }

    function handleSubmit() {
console.log(tasks)
        updatePriority();

    }

    return (
        <>
            <button onClick={handleSubmit} type="submit" class="btn btn-primary">Save List Order</button>
            {tasks.length === 0 ?
                <div className="alert alert-warning py-4">
                    You have not added any tasks.
                </div>
                : <Task functions={[tasks, setTasks]} />}
        </>
    );
};
export default TaskList;